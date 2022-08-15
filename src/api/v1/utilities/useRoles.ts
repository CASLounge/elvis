import { NextFunction, Request, Response } from 'express'

export const useRoles = () => {
  // Middleware for role-based access
  const roles = (...roles: Array<string>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      // @ts-ignore
      if (!req?.userType) return res.sendStatus(401)
      // @ts-ignore
      const verifyUserType = roles.includes(req?.userType)
      if (!verifyUserType) return res.status(401).send({ data: { error: true, message: `Available only to ${roles}S` } })
      next()
    }
  }

  return {
    roles
  }
}
