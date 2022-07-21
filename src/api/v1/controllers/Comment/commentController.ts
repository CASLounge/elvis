import { NextFunction, Request, Response, Router } from 'express'
export const commentController: Router = Router()

commentController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})
