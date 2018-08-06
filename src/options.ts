/**
 * Created by zhangsong on 2018/8/4.
 */
import Aes192 from './crypt/aes192';
import IEncryption from './interface/IEncryption';
import IOptions from './interface/IOptions';
import strToObj from './utils/stringToObject';
import handleDifferFields from './utils/handleDifferFields';

let encryption: IEncryption = Aes192;

export default class Options {
  // 具有初始值的属性
  public encryptFields = {}; // 需要加密的字段
  public excludeFields = {}; // 不需要加密的字段

  // 加密方法
  public encrypt: (str) => string;
  // 解密方法
  public decrypt: (str) => string;

  constructor(option: IOptions) {
    if (!option.fields) {
      throw new Error('Boolean(option.fields) === false');
    }
    if (!option.crypt.secret && (!option.crypt.encrypt || !option.crypt.decrypt)) {
      throw new Error('Either the secret exists or the encrypt function exists');
    }
    if (option.crypt.secret) {
      this.encrypt = function(str) {
        return encryption.encrypt(str, option.crypt.secret);
      };
      this.decrypt = function(str) {
        return encryption.decrypt(str, option.crypt.secret);
      };
    } else {
      this.encrypt = option.crypt.encrypt;
      this.decrypt = option.crypt.decrypt;
    }
    // 也可以通过传入 IEncryption 类型的 object 实现自定义加密
    if (option.crypt.encryption) {
      encryption = option.crypt.encryption;
    }
    // 处理不同的 excludeFields 类型
    if (option.excludeFields) {
      if (typeof option.excludeFields === 'string') {
        this.excludeFields = strToObj(option.excludeFields, {});
      } else if (Array.isArray(option.excludeFields)) {
        this.excludeFields = option.excludeFields.reduce((obj, current) => {
          return strToObj(current, obj);
        }, {});
      } else if (typeof option.excludeFields === 'object') {
        this.excludeFields = option.excludeFields;
      }
    }
    // 处理不同的 fields 类型
    if (typeof option.fields === 'string') { // 如果 field 为字符串类型
      this.encryptFields = strToObj(option.fields, {});
    } else if (Array.isArray(option.fields)) { // 如果是数组
      this.encryptFields = option.fields.reduce((obj, current) => {
        return strToObj(current, obj);
      }, {});
    } else if (typeof option.fields === 'object') { // 如果是对象
      this.encryptFields = option.fields;
    } else {
      throw new Error('option.fields type is unknown');
    }
    // 去重
    this.encryptFields = handleDifferFields(this.encryptFields, this.excludeFields);

  }
}
