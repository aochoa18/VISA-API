import express from 'express'
import cors from 'cors'
import { aliasRouter, paymentCredentialsRouter } from './routes'
import { PORT } from '@config'
import { descyptMiddleware } from './middleware/decryptMiddleware'

const app = express()

app.use(express.json())
app.use(cors())


app.use('/alias', descyptMiddleware(), aliasRouter)
app.use('/paymentCredentials', descyptMiddleware(), paymentCredentialsRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
