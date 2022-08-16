
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
      return res.status(400).send({ data: { error: true, message: errors.mapped() } })
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
userController.patch('/signup/social/complete', [verify, roles('TEMP')], async (req: Request, res: Response, next: NextFunction) => {
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

// ? Protected view profile route
// ? You can view your personal profile using this route
userController.get('/profile', [verify, roles('ADMIN', 'MOD', 'STUDENT')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = String(req.query.userId!)
    const getUserProfileById = await prisma.userProfile.findUnique({
      where: {
        userId: id
      }
    })
    if (!getUserProfileById) {
      return res.status(404).send({ data: { error: true, message: 'User not found!' } })
    }
    res.status(200).send({ data: { error: false, profile: getUserProfileById } })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// ? Unprotected view profile route
// ? You can view your other's personal profile
// ? However if the profile is private, you wont be able to see it...
userController.get('/profile/public', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userName: string = String(req.query.userName!)

    const getUserByUserName = await prisma.user.findFirst({
      where: {
        userName: userName
      },
      select: {
        profile: true
      }
    })

    if (!getUserByUserName) {
      return res.status(404).send({ data: { error: true, message: 'User not found!' } })
    }
    if (getUserByUserName?.profile?.private) {
      return res.status(200).send({ data: { error: false, message: 'User profile is private!' } })
    }
    res.status(200).send({ data: { error: false, profile: getUserByUserName.profile } })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// ? Enables user to update their profile
// ? By sending a json payload containing
// ? Updated value and corresponding field
userController.patch('/profile/update', [verify, roles('ADMIN', 'MOD', 'STUDENT')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = String(req.query.userId)
    const fieldsToUpdate: object = req.body

    if (typeof fieldsToUpdate !== 'object') {
      return res.status(500).send({ data: { error: true, message: 'Invalid payload! Must be type object with relevant fields!' } })
    }

    const updateUserProfile = await prisma.userProfile.update({
      where: {
        userId: id
      },
      data: fieldsToUpdate
    })

    if (!updateUserProfile) {
      return res.status(500).send({ data: { error: true, message: 'Invalid payload! Must be type object with relevant fields!' } })
    }
    res.status(200).send({ data: { error: false, message: 'Profile updated!' } })
  } catch (error) {
    next(error)
  }
})
