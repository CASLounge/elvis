import { NextFunction, Request, Response } from 'express'

export const useRoles = () => {
  // Middleware for role-based access
  const roles = () => {
    return (req: Request, res: Response, next: NextFunction) => {
    }
  }

  return {
    roles
  }
}
