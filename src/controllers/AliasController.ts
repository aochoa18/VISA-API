import { API_URL_BASE } from "@config"
import axios from "axios"
import { Request, Response } from "express"


export const getAlias = async (req:Request<{aliasId:string}>, res:Response) => {
  try {
    const resp = await axios.get(
      `${API_URL_BASE}/aliases/${req.params.aliasId}`,
    )
    res.status(resp.status).send(resp.data)
    res.send('ok')
  } catch {
    res.status(500).send('Internal error')
  }
}
