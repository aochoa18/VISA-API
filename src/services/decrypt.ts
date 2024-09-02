import fs from 'fs';
import path from 'path';
import nodeJose from 'node-jose';
import { KEY_ID } from '@config';

export async function fetchDecryptedPayload(
  encryptedPayloadString: any,
): Promise<string> {
  console.log('Encrypted payload:', encryptedPayloadString);

  const encryptedPayload =
    typeof encryptedPayloadString === 'string'
      ? JSON.parse(encryptedPayloadString)
      : encryptedPayloadString;

  // Cargar la clave privada desde el archivo
  console.log(path.resolve(__dirname, '../../mle_key.pem'))
  const mle_key = fs.readFileSync(
    path.resolve(__dirname, '../../mle_key.pem'),
    'utf8'
  );

  try {
    // Crear la clave JWK directamente con asKey usando la clave privada
    const key = await nodeJose.JWK.asKey(mle_key, 'pem', {
      kid: KEY_ID, // Este debe coincidir con el kid en el JWE Header
      alg: 'RSA-OAEP-256',
      use: 'enc',
    });
    console.log('Key created:', key);

    // Verificar el encabezado JWE
    const jweHeader = JSON.parse(
      nodeJose.util.base64url.decode(encryptedPayload.encData.split('.')[0]).toString()
    );
    console.log('JWE Header:', jweHeader);

    if (jweHeader.kid && key.kid !== jweHeader.kid) {
      console.error(`Kid mismatch: Expected ${jweHeader.kid}, got ${key.kid}`);
      throw new Error('Kid mismatch');
    }

    // Desencriptar el payload
    const decryptedResult = await nodeJose.JWE.createDecrypt(key).decrypt(encryptedPayload.encData);

    console.log('### Información desencriptada de manera satisfactoria');
    console.log(String(decryptedResult.plaintext)); // Esta es la info desencriptada

    return String(decryptedResult.plaintext); // Devuelve el resultado desencriptado como string
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to decrypt data:', error.message);
    } else {
      console.error('Failed to decrypt data:', error);
    }
    throw new Error('Decryption failed');
  }
}