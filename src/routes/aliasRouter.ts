
import { getAlias } from '@controllers/AliasController'
import axios, { Axios } from 'axios'
import { Router } from 'express'
import { encryptMiddleware } from 'src/middleware/encryptMiddleware'
const aliasRouter = Router()

aliasRouter.get('/:aliasId', getAlias)

aliasRouter.post('/', encryptMiddleware(), async (req, res) => {
  try {
    const resp = await axios.post(
      'https://sandbox.api.visa.com/aliasdirectory/v1/aliases',
      req.body,
    )
    res.status(resp.status).send(resp.data)
  } catch {
    res.status(500).send('Internal error')
  }
})

aliasRouter.put('/:aliasId', encryptMiddleware(), async (req, res) => {
  try {
    const resp = await axios.put(
      `https://sandbox.api.visa.com/aliasdirectory/v1/aliases/${req.params.aliasId}`,
    )
    res.status(resp.status).send(resp.data)
  } catch {
    res.status(500).send('Internal error')
  }
})

aliasRouter.delete('/:aliasId', encryptMiddleware(), async (req, res) => {
  try {
    const resp = await axios.delete(
      `https://sandbox.api.visa.com/aliasdirectory/v1/aliases/${req.params.aliasId}`,
    )
    res.status(resp.status).send(resp.data)
  } catch {
    res.status(500).send('Internal error')
  }
})

export { aliasRouter }
