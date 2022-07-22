import { Application, Router, Request, Response, NextFunction } from 'express'
import {
  authController,
  tokenController,
  userController,
  communityController,
  postController,
  commentController,
  documentationController
} from '../controllers'

const _routes: [string, Router][] = [
  ['/auth', authController],
  ['/token', tokenController],
  ['/user', userController],
  ['/community', communityController],
  ['/posts', postController],
  ['/comment', commentController],
  ['/', documentationController]
]

export const routes = (app: Application) => {
  // Redirects the root route to the /api/v1/ route
  app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.redirect('/api/v1')
    } catch (error) {
      next(error)
    }
  })

  _routes.forEach((route) => {
    const [url, controller] = route
    app.use(('/api/v1' + url), controller)
  })
}
