import { NextFunction, Request, Response, Router } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { prisma, Prisma } from '../../config/prisma'
import { useHash } from '../../utilities/useHash'
import { useValidation } from '../../utilities/useValidation'

export const authController: Router = Router()

const { signInValidation } = useValidation()

/*
  ? AuthController - Sign In endpoint
  * Allows registered user to access their account by receiving an access token
  *
  *
*/
authController.post('/signin', signInValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ? Validates the received payload from the request
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).send({ data: { error: true, message: errors.array() } })
    }

    const { email, password } = req.body

    const { comparePassword } = useHash()

    // ? The ORM then proceeds to query a search to find the user through the inputted email
    // ? If the ORM finds a user with the passed email it will return:
    // ? The user's id, username, and password
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
    // ? If the ORM does not finds an existing user by the passed email it will return
    // ? a 400 status error with a message saying user with that email is not found
    if (!getUserByEmail) {
      res.status(400).send({ data: { error: true, message: `${email} is not found.` } })
      return
    } else {
      // ? It will then proceed to validate the password by comparing the passed password
      // ? and the returned password from the ORM query
      const validate = await comparePassword(password, getUserByEmail.password)

      // ? If the validation fails it will return a 401 status with JSON response saying wrong password,
      if (!validate) {
        res.status(401).send({ data: { error: true, message: 'Wrong password!' } })
        return
      } else {
        // ? If the validation succeeds it will generate 2 tokens:
        // ? 1. Access token that will expire within 6 hour and
        // ? 2. a Refresh token that will expire within a day
        const accessToken = jwt.sign(
          { userName: getUserByEmail.userName },
          `${process.env.ACCESS_TOKEN}`,
          { expiresIn: '1h' }
        )
        const refreshToken = jwt.sign(
          { userName: getUserByEmail.userName },
          // @ts-ignore
          `${process.env.REFRESH_TOKEN}`,
          { expiresIn: '1d' }
        )
        // ? The ORM then proceeds to update the tokens table inserting the following:
        // ? 1. userId from the ORM search query
        // ? 2. accessToken
        // ? 3. refreshToken
        const updateUserTokens = await prisma.tokens.update({
          where: { userId: getUserByEmail.id },
          data: { accessToken: accessToken, refreshToken: refreshToken }
        })
        if (!updateUserTokens) {
          return res.sendStatus(401)
        }
        // ? Then the controller finally will send a JSON response containing the following:
        // ? 1. error status
        // ? 2. response message
        // ? 3. accessToken
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: process.env.APP_ENV !== 'Development', maxAge: 24 * 60 * 60 * 1000 })
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

/*
  ? AuthController - Sign Out endpoint
  * Allows signed in users to sign out from their account
*/
authController.get('/signout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: any = req.query.userId
    const cookies = req.cookies

    if (!cookies.jwt) {
      console.log('Error no cookie found')
      return res.sendStatus(403)
    }

    const tokenToInvalidate = cookies.jwt
    const verifyToken = await prisma.tokens.findUnique({
      where: {
        userId: userId
      },
      select: {
        refreshToken: true
      }
    })

    if (!verifyToken) {
      return res.sendStatus(403)
    }

    if (!verifyToken?.refreshToken === tokenToInvalidate) {
      res.clearCookie('jwt', { httpOnly: true })
      return res.sendStatus(204)
    }

    const updateToken = await prisma.tokens.update({
      where: {
        userId: userId
      },
      data: {
        refreshToken: null,
        accessToken: null
      }
    })

    if (updateToken) {
      res.clearCookie('jwt', { httpOnly: true })
      return res.sendStatus(204)
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
