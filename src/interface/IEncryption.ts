/**
 * Created by zhangsong on 2018/8/3.
 */

export default interface IEncryption {
  // 加密
  encrypt(str, secret): string;

  // 解密
  decrypt(str, secret): string;

}
