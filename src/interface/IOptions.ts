/**
 * 用户定义 plugin 时 options 数据格式
 * 如果设置了 excludeFieldEncryption,即使在 field 中添加了,也不会进行加密(excludeFieldEncryption的优先级高)
 * Created by zhangsong on 2018/8/4.
 */
import IEncryption from './IEncryption.js';

export default interface IOptions {

  fields: string | string[] | object; // 需要加密的字段,如果需要全部加密,传[]或者{}
  excludeFields?: string | string[] | object; // 不需要加密的字段
  _StartExclude?: boolean;
  secret?: string; // 密钥
  encrypt?: (str) => string; // 加密函数
  decrypt?: (str) => string; // 解密函数
  encryption?: IEncryption;
}
