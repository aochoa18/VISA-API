import {
  deleteAlias,
  getAlias,
  postAlias,
  putAlias,
} from '@controllers/aliasController'
import { Router } from 'express'
//import { encryptMiddleware } from 'src/middleware/encryptMiddleware'

const aliasRouter = Router()

aliasRouter.get('/:aliasId', getAlias)

aliasRouter.post('/', postAlias)

aliasRouter.put('/:aliasId', putAlias)

aliasRouter.delete('/:aliasId', deleteAlias)

export { aliasRouter }
