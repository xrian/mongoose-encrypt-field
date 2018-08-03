import {createCipher, createDecipher} from 'crypto';
import BaseCrypt from '../common/baseCrypt';

const ENCRYPT_TYPE = 'aes192';
const INPUT_ENCODING_TYPE = 'utf8';
const OUTPUT_ENCODING_TYPE = 'hex';

class Aes192 extends BaseCrypt {
    // 加密
    public encrypt(str: string, secret: string): string {
        // FIXME: node v10.0.0 建议使用 createCipheriv
        const cipher = createCipher(ENCRYPT_TYPE, secret);
        return cipher.update(str, INPUT_ENCODING_TYPE, OUTPUT_ENCODING_TYPE) + cipher.final(OUTPUT_ENCODING_TYPE);
    }

    // 解密
    public decrypt(str, secret): string {
        const decipher = createDecipher(ENCRYPT_TYPE, secret);
        return decipher.update(str, OUTPUT_ENCODING_TYPE, INPUT_ENCODING_TYPE) + decipher.final(INPUT_ENCODING_TYPE);
    }

}
