import { createCipher, createDecipher } from 'crypto';
import IEncryption from '../interface/IEncryption';

const ENCRYPT_TYPE = 'aes192';
const INPUT_ENCODING_TYPE = 'utf8';
const OUTPUT_ENCODING_TYPE = 'hex';

const Aes192: IEncryption = {
  // 加密
  encrypt(str: string, secret: string): string {
    // FIXME: node v10.0.0 建议使用 createCipheriv
    const cipher = createCipher(ENCRYPT_TYPE, secret);
    return cipher.update(str, INPUT_ENCODING_TYPE, OUTPUT_ENCODING_TYPE) + cipher.final(OUTPUT_ENCODING_TYPE);
  },

  // 解密
  decrypt(str: string, secret: string): string {
    // FIXME: node v10.0.0 建议使用 createDecipheriv
    const decipher = createDecipher(ENCRYPT_TYPE, secret);
    return decipher.update(str, OUTPUT_ENCODING_TYPE, INPUT_ENCODING_TYPE) + decipher.final(INPUT_ENCODING_TYPE);
  },

};

export default Aes192;
