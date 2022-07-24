import { NextFunction, Request, Response, Router } from 'express'
import { useJWT } from '../../utilities/useJWT'
export const postController: Router = Router()

const { verify } = useJWT()

// TODO:
// Like Post
postController.get('/like', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})
// New Post
postController.get('/new', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})
// Delete Post
postController.get('/delete', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})
// Edit Post
postController.get('/edit', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})
// unpublish Post
postController.get('/unpublish', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})
