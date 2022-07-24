import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const useJWT = () => {
  // Middleware for verifying JWT's
  const verify = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) { return res.sendStatus(401) }

    const jwtToken = authorizationHeader.split(' ')[1]

    jwt.verify(
      jwtToken,
      `${process.env.ACCESS_TOKEN}`,
      (error, decoded) => {
        if (error) { return res.sendStatus(403) }
        // @ts-ignore
        req.user = decoded.userName
        next()
      }
    )
  }

  return {
    verify
  }
}
