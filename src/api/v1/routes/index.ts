import { Application, Router } from 'express'
import {
  authController,
  tokenController,
  userController,
  communityController,
  postController,
  commentController
} from '../controllers'

const _routes: [string, Router][] = [
  ['/auth', authController],
  ['/token', tokenController],
  ['/user', userController],
  ['/community', communityController],
  ['/posts', postController],
  ['/comment', commentController]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route
    app.use(('/api/v1' + url), controller)
  })
}
