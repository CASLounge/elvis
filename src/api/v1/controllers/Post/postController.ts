import { NextFunction, Request, Response, Router } from 'express'
import { useJWT } from '../../utilities/useJWT'
export const postController: Router = Router()

// Middleware for protecting APIs with Bearer Token pattern
const { verify } = useJWT()

// TODO:
// Like Post
postController.put('/like', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})

// New Post
postController.post('/new', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})

// Delete Post
postController.delete('/delete', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})

// Edit Post
postController.patch('/edit', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})

// Unpublish Post
postController.put('/unpublish', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})
