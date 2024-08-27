import { createEncryptedPayload } from '@services/encrypt'
import { NextFunction, Request, Response } from 'express'

export const encryptMiddleware =
  () => (req: Request, _res: Response, next: NextFunction) => {
    req.body = createEncryptedPayload(req.body)
    next()
  }
