import { NextFunction, Request, Response, Router } from 'express'
import { useJWT } from '../../utilities/useJWT'
export const commentController: Router = Router()

// Middleware for protecting APIs with Bearer Token pattern
const { verify } = useJWT()

// TODO:
// Like comment
commentController.get('/like', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})
// New comment
commentController.get('/new', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})
// Delete comment
commentController.get('/delete', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})
// Edit comment
commentController.get('/edit', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})
