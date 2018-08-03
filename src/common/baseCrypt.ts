/**
 * Created by zhangsong on 2018/8/3.
 */
export default abstract class BaseCrypt {
  protected secret: string;

  // 设置密钥
  public setSecret(secret: string): void {
    this.secret = secret;
  }
  // 加密
  public abstract encrypt(str, secret): string;
  // 解密
  public abstract decrypt(str, secret): string;

}
