
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response, Router } from 'express'

import { prisma, Prisma } from '../../config/prisma'
import { useHash } from '../../utilities/useHash'
import { useValidation } from '../../utilities/useValidation'

export const userController: Router = Router()

const { signUpValidation } = useValidation()

userController.post('/signup', signUpValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send({ data: { error: true, message: errors.mapped() } })
      // Terminates prematurely
      return
    }

    const {
      userName,
      emailAddress,
      password,
      firstName,
      lastName,
      branch,
      address,
      course,
      gender
    } = req.body

    const { hashPassword } = useHash()

    const encryptedPassword: any = await hashPassword(password)

    const createUser = await prisma.user.create({
      data: {
        userName: userName,
        emailAddress: emailAddress,
        password: encryptedPassword,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        branch: branch,
        address: address,
        course: course,
        profile: {
          create: {}
        },
        tokens: {
          create: {}
        }
      }
    })

    if (createUser) {
      res.status(200).send({ data: { error: false, message: 'Account created!' } })
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          // @ts-ignore
          res.status(400).send({ data: { error: true, message: `Sorry but ${error.meta.target} is already taken.` } })
          break

        default:
          res.status(500).send({ data: { error: true, message: 'Something went horribly wrong!' } })
          next(error)
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({ data: { error: true, message: 'Missing fields, please check again!' } })
      console.log(error.message)
    }
  }
})
