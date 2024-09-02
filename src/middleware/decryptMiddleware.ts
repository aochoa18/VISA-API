import { fetchDecryptedPayload } from '@services/decrypt'
import { NextFunction, Request, Response } from 'express'

export const descyptMiddleware =
  () => async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = await fetchDecryptedPayload(req.body)
    } catch (error) {
      return next(error)
    }
    next()
  }
