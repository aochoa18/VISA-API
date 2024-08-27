import {Router} from 'express'
const aliasRouter = Router()

aliasRouter.get('/', (_req, res)=>{
    res.send('ok')
})

export {aliasRouter}