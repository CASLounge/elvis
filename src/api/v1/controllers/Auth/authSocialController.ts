import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook'

import { prisma, Prisma } from '../../config/prisma'
import { useHash } from '../../utilities/useHash'

export const authSocialController: Router = Router()

// ? GOOGLE SOCIAL PROVIDER VERIFIER
const verifyGoogleAccount = async (accessToken: string, refreshToken: string, profile: GoogleProfile, callback: VerifyCallback): Promise<void> => {
  try {
    // Checks if the
    const checkSocial = await prisma.socialCredentials.findFirst({
      where: {
        provider: profile?.provider,
        providerId: profile?.id
      },
      select: {
        userId: true
      }
    })
    if (!checkSocial) {
      const { generatePassword, hashPassword } = useHash()

      const encryptedPassword: any = await hashPassword(generatePassword())

      const newUser = await prisma.user.create({
        data: {
          userName: profile?.username || null,
          password: encryptedPassword,
          emailAddress: profile?._json?.email!,
          firstName: profile?._json?.given_name,
          lastName: profile?._json?.family_name,
          profileImageUrl: profile?._json?.picture,
          userType: 'TEMP',
          profile: {
            create: {
              avatarRef: profile?._json?.picture
            }
          },
          tokens: {
            create: {}
          },
          social: {
            create: {
              provider: profile?.provider,
              providerId: profile?.id
            }
          }
        }
      })
      callback(null, newUser)
    } else {
      const getUserById = await prisma.user.findUnique({
        where: {
          id: checkSocial?.userId
        }
      })
      if (!getUserById) {
        callback(null, false)
      }
      console.log(getUserById)
      callback(null, getUserById!)
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          callback(null, false)
          break

        default:
          callback(null, false)
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      callback(null, false)
      console.error(error.message)
    } else {
      callback(null, false)
      console.error(error)
    }
  }
}

// ? FACEBOOK SOCIAL PROVIDER VERIFIER
const verifyFacebookAccount = async (accessToken: string, refreshToken: string, profile: FacebookProfile, callback: VerifyCallback): Promise<void> => {
  try {
    if (!profile?._json?.email) {
      callback(null, false)
    }
    const checkSocial = await prisma.socialCredentials.findFirst({
      where: {
        provider: profile?.provider,
        providerId: profile?.id
      },
      select: {
        userId: true
      }
    })
    if (!checkSocial) {
      const { generatePassword, hashPassword } = useHash()

      const encryptedPassword: any = await hashPassword(generatePassword())

      const newUser = await prisma.user.create({
        data: {
          userName: profile?.username || null,
          password: encryptedPassword,
          emailAddress: profile?._json?.email!,
          firstName: profile?._json?.first_name,
          lastName: profile?._json?.last_name,
          profileImageUrl: profile?._json?.picture,
          userType: 'TEMP',
          profile: {
            create: {
              avatarRef: profile?._json?.picture
            }
          },
          tokens: {
            create: {}
          },
          social: {
            create: {
              provider: profile?.provider,
              providerId: profile?.id
            }
          }
        }
      })
      callback(null, newUser)
    } else {
      const getUserById = await prisma.user.findUnique({
        where: {
          id: checkSocial?.userId
        }
      })
      if (!getUserById) {
        callback(null, false)
      }
      console.log(getUserById)
      callback(null, getUserById!)
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          callback(null, false)
          break

        default:
          callback(null, false)
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      callback(null, false)
      console.error(error.message)
    } else {
      callback(null, false)
      console.error(error)
    }
  }
}

// ? SOCIAL PROVIDER PASSPORTJS STRATEGIES
// * GOOGLE
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: `${process.env.BASE_URI_DEV}/auth/social/redirect/google`,
  scope: ['profile', 'email']
}, verifyGoogleAccount))
// * FACEBOOK
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID || '',
  clientSecret: process.env.FACEBOOK_APP_SECRET || '',
  callbackURL: `${process.env.BASE_URI_DEV}/auth/social/redirect/facebook`,
  profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name']
}, verifyFacebookAccount))

// ? SOCIAL PROVIDER ROUTES
// * GOOGLE
authSocialController.get('/signin/google', passport.authenticate('google', { session: false }))
authSocialController.get('/redirect/google',
  passport.authenticate('google',
    {
      failureRedirect: `${process.env.BASE_URI_DEV}/auth/social/error`,
      failureMessage: true,
      session: false
    }),
  async (req, res) => {
    // @ts-ignore
    if (req?.user?.userType === 'TEMP') {
      const tempAccessToken = jwt.sign(
        {
          UserInfo: {
            // @ts-ignore
            userName: req?.user?.userName || req?.user?.emailAddress,
            // @ts-ignore
            userType: req?.user?.userType
          }
        },
        `${process.env.ACCESS_TOKEN}`,
        { expiresIn: '30m' }
      )
      return res.status(200).send({ data: { error: false, message: 'Sign in via Google is successful, please complete the signup within 30 minutes!', accessToken: tempAccessToken } })
    }
    const accessToken = jwt.sign(
      {
        UserInfo: {
          // @ts-ignore
          userName: req?.user?.userName || req?.user?.emailAddress,
          // @ts-ignore
          userType: req?.user?.userType
        }
      },
      `${process.env.ACCESS_TOKEN}`,
      { expiresIn: '1h' }
    )
    const refreshToken = jwt.sign(
      // @ts-ignore
      { userName: req?.user?.userName || req?.user?.emailAddress },
      `${process.env.REFRESH_TOKEN!}`,
      { expiresIn: '1d' }
    )
    // ? The ORM then proceeds to update the tokens table inserting the following:
    // ? 1. userId from the ORM search query
    // ? 2. accessToken
    // ? 3. refreshToken
    const updateUserTokens = await prisma.tokens.update({
      // @ts-ignore
      where: { userId: req?.user?.id },
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
    res.status(200).send({ data: { error: false, message: 'Sign up via Google is successful', accessToken: accessToken } })
  })

// * FACEBOOK
authSocialController.get('/signin/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }))
authSocialController.get('/redirect/facebook',
  passport.authenticate('facebook',
    {
      failureRedirect: `${process.env.BASE_URI_DEV}/auth/social/error`,
      failureMessage: true,
      session: false
    }),
  async (req, res) => {
    // @ts-ignore
    if (req?.user?.userType === 'TEMP') {
      const tempAccessToken = jwt.sign(
        {
          UserInfo: {
            // @ts-ignore
            userName: req?.user?.userName || req?.user?.emailAddress,
            // @ts-ignore
            userType: req?.user?.userType
          }
        },
        `${process.env.ACCESS_TOKEN}`,
        { expiresIn: '30m' }
      )
      return res.status(200).send({ data: { error: false, message: 'Sign up via Facebook is successful, please complete the signup within 30 minutes!', accessToken: tempAccessToken } })
    }
    // @ts-ignore
    const accessToken = jwt.sign(
      {
        UserInfo: {
          // @ts-ignore
          userName: req?.user?.userName || req?.user?.emailAddress,
          // @ts-ignore
          userType: req?.user?.userType
        }
      },
      `${process.env.ACCESS_TOKEN}`,
      { expiresIn: '1h' }
    )
    const refreshToken = jwt.sign(
      // @ts-ignore
      { userName: req?.user?.userName || req?.user?.emailAddress },
      `${process.env.REFRESH_TOKEN!}`,
      { expiresIn: '1d' }
    )
    // ? The ORM then proceeds to update the tokens table inserting the following:
    // ? 1. userId from the ORM search query
    // ? 2. accessToken
    // ? 3. refreshToken
    const updateUserTokens = await prisma.tokens.update({
      // @ts-ignore
      where: { userId: req?.user?.id },
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
    res.status(200).send({ data: { error: false, message: 'Sign in via Facebook is successful', accessToken: accessToken } })
  })

authSocialController.get('/error', (req: Request, res: Response) => {
  // TODO: Improve the error message, too vague for users to figure out what's wrong
  res.status(500).send({ data: { error: true, message: 'Something went wrong while verifying, we\'re sorry this happened...' } })
})
