import { NextFunction, Request, Response, Router } from 'express'
export const postController: Router = Router()

postController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})
