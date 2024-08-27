import express from 'express'
import {aliasRouter} from '@routes/aliasRoute'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors())

const PORT = 4000
app.use('/alias', aliasRouter)



  app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
