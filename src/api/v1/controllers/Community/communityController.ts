import { NextFunction, Request, Response, Router } from 'express'
export const communityController: Router = Router()

communityController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'community is working 🥳' })
  } catch (error) {
    next(error)
  }
})
