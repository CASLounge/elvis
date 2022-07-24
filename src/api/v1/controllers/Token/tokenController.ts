import { NextFunction, Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../../config/prisma'

export const tokenController: Router = Router()

tokenController.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies
    if (!cookies.jwt) {
      console.log('Error no cookie found')
      return res.sendStatus(401)
    }
    const refreshToken = cookies.jwt
    console.log('Heres your refreshToken', refreshToken)

    const getUserByRefreshToken = await prisma.tokens.findUnique(
      {
        where: { refreshToken: refreshToken },
        select: { refreshToken: true, user: true }
      }
    )
    if (!getUserByRefreshToken) return res.sendStatus(403)
    jwt.verify(
      `${getUserByRefreshToken.refreshToken}`,
      `${process.env.REFRESH_TOKEN}`,
      (error, decoded) => {
        // @ts-ignore
        if (error || getUserByRefreshToken.user.userName !== decoded.userName) {
          console.log('Error on verifying the token')
          return res.sendStatus(401)
        }
        const accessToken = jwt.sign(
          // @ts-ignore
          { userName: decoded.userName },
          `${process.env.ACCESS_TOKEN}`,
          { expiresIn: '8h' }
        )
        res.status(200).send({ data: { error: false, message: 'RefreshToken is verified 🎉', accessToken: accessToken } })
      }
    )
  } catch (error) {
    // TODO: write Error handling with Prisma here
    next(error)
  }
})
