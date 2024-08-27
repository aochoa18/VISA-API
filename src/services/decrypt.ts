import fs from 'fs'
import nodeJose from 'node-jose'
import request from 'request'
import { KEY_ID } from '@config'

//let fs = require('fs');
//let nodeJose = require('node-jose');
//let request = require('request');
 
export function fetchDecryptedPayload(encryptedPayloadString:any) {
    let encryptedPayload = typeof encryptedPayloadString == 'string' ? JSON.parse(encryptedPayloadString) : encryptedPayloadString;
    let keystore = nodeJose.JWK.createKeyStore();
    let decProps = {
        kid: KEY_ID,
        alg: 'RSA-OAEP-256',
        enc: 'A128GCM'
    };
    let decryptionKey = fs.readFileSync('/key_78ba9dd5-aac4-4c9b-86f3-7d0a10613c68.pem');
    return keystore.add(decryptionKey, 'pem', decProps)
        .then((key) => {
            return nodeJose.JWE.createDecrypt(key)
                .decrypt(encryptedPayload.encData)
                .then((result) => {
                    return result;
                });
        });
}