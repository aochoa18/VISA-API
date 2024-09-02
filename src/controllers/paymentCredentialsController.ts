import { API_URL_BASE } from '@config'
import axios from 'axios'
import { Request, Response } from 'express'


export const getPaymentCredential = async ( req: Request<{ paymentCredentialId: string }>, res: Response,) => {
  try {
    const resp = await axios.get(
      `${API_URL_BASE}/paymentCredentials/${req.params.paymentCredentialId}`,
    )
    res.status(resp.status).send(resp.data)
    res.send('ok')
  } catch {
    res.status(500).send('Internal error')
  }
}

export const getAllPaymentCredentials = async (req: Request<{ aliasId: string }>, res: Response) => {
    try {
      const resp = await axios.get(`${API_URL_BASE}/aliases${req.params.aliasId}/paymentCredentials`)
      res.status(resp.status).send(resp.data)
    } catch {
      res.status(500).send('Internal error')
    }
  }

  export const postPaymentCredential = async (req: Request<{ aliasId: string }>, res: Response) => {
    try {
      const resp = await axios.post(`${API_URL_BASE}/aliases${req.params.aliasId}/paymentCredentials`, req.body)
      res.status(resp.status).send(resp.data)
    } catch {
      res.status(500).send('Internal error')
    }
  }

  export const putPaymentCredential = async (req: Request<{ paymentCredentialId: string }>, res: Response,) => {
    try {
      const resp = await axios.put(
        `${API_URL_BASE}/paymentCredentials/${req.params.paymentCredentialId}`,
      )
      res.status(resp.status).send(resp.data)
    } catch {
      res.status(500).send('Internal error')
    }
  }

  export const deletePaymentCredential = async (req: Request<{ paymentCredentialId: string }>,res: Response,) => {
    try {
      const resp = await axios.delete(
        `${API_URL_BASE}/paymentCredentials/${req.params.paymentCredentialId}`,
      )
      res.status(resp.status).send(resp.data)
    } catch {
      res.status(500).send('Internal error')
    }
  }
