import {
    deletePaymentCredential,
  getAllPaymentCredentials,
  getPaymentCredential,
  postPaymentCredential,
  putPaymentCredential,
} from '@controllers/paymentCredentialsController'
import { Router } from 'express'
import { encryptMiddleware } from 'src/middleware/encryptMiddleware'

const paymentCredentialsRouter = Router()

paymentCredentialsRouter.get('/:paymentCredentialId', getPaymentCredential)

paymentCredentialsRouter.get('/:aliasId', getAllPaymentCredentials)

paymentCredentialsRouter.post('/:aliasId', encryptMiddleware(), postPaymentCredential)

paymentCredentialsRouter.put('/:paymentCredentialId', encryptMiddleware(), putPaymentCredential)

paymentCredentialsRouter.delete('/:paymentCredentialId', encryptMiddleware(), deletePaymentCredential)

export { paymentCredentialsRouter }
