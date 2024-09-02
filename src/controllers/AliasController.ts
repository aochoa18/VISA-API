import { API_URL_BASE } from '@config'
import axios from 'axios'
import { Request, Response } from 'express'

export const getAlias = async (req: Request<{ aliasId: string }>,res: Response,) => {
  try {
    const resp = await axios.get(
      `${API_URL_BASE}/aliases/${req.params.aliasId}`,)
    res.status(resp.status).send(resp.data)
    res.send('ok')
  } catch {
    res.status(500).send('Internal error')
  }
}

export const postAlias = async (req: Request, res: Response) => {
  try {
    console.log('test alias post');
    console.log(req.body);
    res.send(req.body);
    // const resp = await axios.post(`${API_URL_BASE}/aliases`, req.body)
    // res.status(resp.status).send(resp.data)
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal error')
  }
}

export const putAlias = async (req: Request<{ aliasId: string }>, res: Response,) => {
  try {
    const resp = await axios.put(
      `${API_URL_BASE}/aliases/${req.params.aliasId}`,
    )
    res.status(resp.status).send(resp.data)
  } catch {
    res.status(500).send('Internal error')
  }
}

export const deleteAlias = async (req: Request<{ aliasId: string }>,res: Response,) => {
  try {
    const resp = await axios.delete(
      `${API_URL_BASE}/aliases/${req.params.aliasId}`,
    )
    res.status(resp.status).send(resp.data)
  } catch {
    res.status(500).send('Internal error')
  }
}
