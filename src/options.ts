/**
 * Created by zhangsong on 2018/8/4.
 */
import Aes192 from './crypt/aes192';
import IEncryption from './interface/IEncryption';
import IOptions from './interface/IOptions';

let encryption: IEncryption = Aes192;

export default class Options {
  // 必填
  public fields: string | string[] | object;

  // 具有初始值的属性
  public encryptFields = {}; // 需要加密的字段
  public encryption = {
    secret: null,
    encrypt(str): string { // 加密方法
      return encryption.encrypt(str, this.secret);
    },
    decrypt(str): string {  // 解密方法
      return encryption.decrypt(str, this.secret);
    },
  };

  constructor(option: IOptions) {
    if (!option.crypt.secret && !option.crypt.encrypt || !option.crypt.decrypt) {
      throw new Error('Either the secret exists or the encrypt function exists');
    }
    if (option.crypt.secret) {
      this.encryption.secret = option.crypt.secret;
    } else {
      this.encryption.encrypt = option.crypt.encrypt;
      this.encryption.decrypt = option.crypt.decrypt;
    }
    if (option.crypt.encryption) { // 可以通过传入 IEncryption
      encryption = option.crypt.encryption;
    }
  }
}

export {
  IOptions,
};
