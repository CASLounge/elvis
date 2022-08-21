import { NextFunction, Request, Response, Router } from 'express'
import { useJWT } from '../../utilities/useJWT'
import { useUserCheck } from '../../utilities/useUserCheck'
import { useRoles } from '../../utilities/useRoles'
import { prisma } from '../../config/prisma'
// import { supabase } from '../../config/supabase'
export const postController: Router = Router()

// Middleware for protecting APIs with Bearer Token pattern
const { verify } = useJWT()
const { userCheck } = useUserCheck()
const { roles } = useRoles()

// TODO:
// View Post
postController.get('/', [verify, roles('ADMIN', 'STUDENT', 'MOD'), userCheck], async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const id: string = String(req.query.commentId)
    res.status(200).send({ data: 'heres a post 🥳' })
  } catch (error) {
    next(error)
  }
})

// Like Post
postController.put('/like', verify, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'posts are working 🥳' })
  } catch (error) {
    next(error)
  }
})

// New Post
postController.post('/new', [verify, userCheck], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { files, body, query } = req
    const { title, content } = body
    const userId: string = String(query.userId)

    if (Number(files?.length) > 1) return res.status(500).send({ data: { error: true, message: 'Exceed amount of allowed files to upload per post!' } })

    const uploadNewPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: {
            id: userId
          }
        }
      }
    })

    if (!uploadNewPost) return res.status(500).send({ data: { error: true, message: 'Something went wrong!' } })
    res.status(200).send({ data: { error: false, message: 'Post successfully uploaded!' } })
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
