import { NextFunction, Request, Response, Router } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { prisma, Prisma } from '../../config/prisma'
import { useHash } from '../../utilities/useHash'
import { useValidation } from '../../utilities/useValidation'

export const authController: Router = Router()

const { signInValidation } = useValidation()

/*
 * ? Signin
 */
authController.post('/signin', signInValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).send({ data: { error: true, message: errors.array() } })
    }

    const { email, password } = req.body

    const { comparePassword } = useHash()

    const getUserByEmail = await prisma.user.findUnique({
      where: {
        emailAddress: email
      },
      select: {
        id: true,
        userName: true,
        password: true
      }
    })

    if (!getUserByEmail) {
      res.status(400).send({ data: { error: true, message: `${email} is not found.` } })
      return
    } else {
      const validate = await comparePassword(password, getUserByEmail.password)
      if (!validate) {
        res.status(401).send({ data: { error: true, message: 'Wrong password!' } })
        return
      } else {
        const accessToken = jwt.sign(
          { userName: getUserByEmail.userName },
          `${process.env.ACCESS_TOKEN}`,
          { expiresIn: '6h' }
        )
        const refreshToken = jwt.sign(
          { userName: getUserByEmail.userName },
          // @ts-ignore
          `${process.env.REFRESH_TOKEN}`,
          { expiresIn: '1d' }
        )

        const updateUserTokens = await prisma.tokens.update({
          where: { userId: getUserByEmail.id },
          data: { accessToken: accessToken, refreshToken: refreshToken }
        })
        if (!updateUserTokens) {
          return res.sendStatus(401)
        }
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).send({ data: { error: false, message: 'Sign in via email and password is successful', accessToken: accessToken } })
      }
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          res.status(500).send({ data: { error: true, message: 'Something went horribly wrong!' } })
          next(error)
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({ data: { error: true, message: 'Missing fields, please check again!' } })
    }
  }
})
