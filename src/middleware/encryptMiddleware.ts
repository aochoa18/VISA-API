import { createEncryptedPayload } from '@services/encrypt'
import { NextFunction, Request, Response } from 'express'

export const encryptMiddleware =
  () => 
    async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = await createEncryptedPayload(req.body)
    } catch (error) {
      return next(error)
    }
    next()
  }
