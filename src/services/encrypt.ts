import fs from 'fs';
import nodeJose from 'node-jose';
import path from 'path';
var https = require('https');
import { API_URL_BASE, KEY_ID, PASSWORD, USER_ID } from '@config';

export async function createEncryptedPayload(payload: any): Promise<any> {
  const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const keystore = nodeJose.JWK.createKeyStore();
  const encProps = {
    kid: KEY_ID,
    alg: 'RSA-OAEP-256',
    enc: 'A128GCM',
  };

  const userId = USER_ID
  const password = PASSWORD

  const mtls_cert = fs.readFileSync(path.resolve(__dirname, '../../mtls_cert.pem'), 'utf8');
  const mtls_key_path = fs.readFileSync(path.resolve(__dirname, '../../mtls_key.pem'), 'utf8');
  const mle_key_path = fs.readFileSync(path.resolve(__dirname, '../../mle_key.pem'), 'utf8')

  let options: any = {
    hostname: API_URL_BASE,//'sandbox.api.visa.com',
    port: 443,
    key: mtls_key_path,
    cert: mtls_cert,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(userId + ':' + password).toString('base64'),
      'keyId': KEY_ID
    },
    json: true
  };

  options.uri = 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions';
  options.method = 'POST';
  options.agent = new https.Agent(options);

  try {
    const key = await keystore.add(mle_key_path, 'pem', encProps);
    const result = await nodeJose.JWE.createEncrypt(
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
      .then((data) => {
        return data;
      })

    console.log('Encrypted data:', result);
    return { encData: result };
  } catch (error) {
    console.error('Failed to encrypt data:', error);
    throw new Error('Encryption failed');
  }
}