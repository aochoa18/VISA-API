import fs from 'fs'
import nodeJose from 'node-jose'
import request from 'request'
import { KEY_ID } from '@config'

//let fs = require('fs')
//let nodeJose = require('node-jose')
//let request = require('request')

export function createEncryptedPayload(payload:any) {
  let payloadString =
    typeof payload === 'string' ? payload : JSON.stringify(payload)
  let keystore = nodeJose.JWK.createKeyStore()
  let encProps = {
    kid: KEY_ID,
    alg: 'RSA-OAEP-256',
    enc: 'A128GCM',
  }
  let encryptionCert = fs.readFileSync('/key_78ba9dd5-aac4-4c9b-86f3-7d0a10613c68.pem')
  return keystore.add(encryptionCert, 'pem', encProps).then((key:any) => {
    return nodeJose.JWE.createEncrypt(
      {
        format: 'compact',
        fields: {
          enc: 'A128GCM',
          iat: Date.now(),
        },
      },
      key,
    )
      .update(payloadString)
      .final()
      .then((result:any) => {
        return { encData: result }
      })
  })
}
