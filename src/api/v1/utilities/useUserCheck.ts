import { NextFunction, Request, Response } from 'express'

export const useUserCheck = () => {
  const userCheck = async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (req?.skip) {
      console.log('Middleware bypassed, user is an admin/mod!')
      return next()
    }
    const userId: string = String(req.query.userId)
    // @ts-ignore
    console.log(req?.id)
    // @ts-ignore
    if (!req?.id) return res.sendStatus(401)
    // @ts-ignore
    if (req?.id !== userId) return res.sendStatus(401)
    next()
  }

  return {
    userCheck
  }
}
