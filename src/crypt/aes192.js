"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const ENCRYPT_TYPE = 'aes192';
const INPUT_ENCODING_TYPE = 'utf8';
const OUTPUT_ENCODING_TYPE = 'hex';
const Aes192 = {
    // 加密
    encrypt(str, secret) {
        // FIXME: node v10.0.0 建议使用 createCipheriv
        const cipher = crypto_1.createCipher(ENCRYPT_TYPE, secret);
        return cipher.update(str, INPUT_ENCODING_TYPE, OUTPUT_ENCODING_TYPE) + cipher.final(OUTPUT_ENCODING_TYPE);
    },
    // 解密
    decrypt(str, secret) {
        // FIXME: node v10.0.0 建议使用 createDecipheriv
        const decipher = crypto_1.createDecipher(ENCRYPT_TYPE, secret);
        return decipher.update(str, OUTPUT_ENCODING_TYPE, INPUT_ENCODING_TYPE) + decipher.final(INPUT_ENCODING_TYPE);
    },
};
exports.default = Aes192;
//# sourceMappingURL=aes192.js.map