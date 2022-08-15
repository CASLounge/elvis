
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response, Router } from 'express'

import { prisma, Prisma } from '../../config/prisma'
import { useHash } from '../../utilities/useHash'
import { useValidation } from '../../utilities/useValidation'
import { useJWT } from '../../utilities/useJWT'
import { useRoles } from '../../utilities/useRoles'

export const userController: Router = Router()

const { signUpValidation } = useValidation()
const { verify } = useJWT()
const { roles } = useRoles()

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
          res.status(400).send({ data: { error: true, message: `Sorry but ${error?.meta?.target!} is already taken.` } })
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

// ? User signup follow up after Social sign-in
// ? To update missing information of student after social signin
// ? Users should be able to complete this follow-up after 30 minutes
userController.post('/signup/social/complete', [verify, roles('TEMP')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = String(req.query.userId!)
    const { userName, branch, address, course, gender } = req.body

    const updateUser = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        userName: userName,
        branch: branch,
        address: address,
        course: course,
        gender: gender
      }
    })
    if (!updateUser) return res.sendStatus(500)
    const updateRole = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        userType: 'STUDENT'
      }
    })
    if (!updateRole) return res.sendStatus(500)
    res.status(200).send({ data: { error: false, message: 'Account creation completed!' } })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          res.status(400).send({ data: { error: true, message: `Sorry but ${error?.meta?.target!} is already taken.` } })
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
