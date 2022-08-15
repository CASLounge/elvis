import { NextFunction, Request, Response, Router } from 'express'
import { useJWT } from '../../utilities/useJWT'
import { useRoles } from '../../utilities/useRoles'
export const commentController: Router = Router()

// Middleware for protecting APIs with Bearer Token pattern
const { verify } = useJWT()
const { roles } = useRoles()

// TODO:
commentController.get('/view', [verify, roles('ADMIN', 'STUDENT', 'MOD')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { id } = req.query
    res.status(200).send({ data: 'An admin, student and, mods should be able to see this! 🥳' })
  } catch (error) {
    next(error)
  }
})

// Like comment
commentController.get('/reply', [verify, roles('ADMIN', 'STUDENT', 'MOD')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})

// Like comment
commentController.get('/like', [verify, roles('ADMIN', 'STUDENT', 'MOD')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})

// New comment
commentController.get('/new', [verify, roles('ADMIN', 'STUDENT', 'MOD')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})

// Delete comment
commentController.get('/delete', [verify, roles('ADMIN', 'MOD')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'Only the admin should be able to receive this! 🥳' })
  } catch (error) {
    next(error)
  }
})

// Edit comment
commentController.get('/edit', [verify, roles('ADMIN', 'STUDENT', 'MOD')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'comments working 🥳' })
  } catch (error) {
    next(error)
  }
})
