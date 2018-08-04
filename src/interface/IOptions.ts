/**
 * 用户定义 plugin 时 options 数据格式
 * Created by zhangsong on 2018/8/4.
 */
import IEncryption from './IEncryption.js';

export default interface IOptions {

  fields: string | string[] | object;
  _StartExclude?: boolean;

  crypt: {
    secret?: string; // 密钥
    encrypt?: (str) => string; // 加密函数
    decrypt?: (str) => string; // 解密函数
    encryption?: IEncryption;
  };

}
