/**
 * Created by zhangsong on 2018/8/6.
 */
export default abstract class BaseHooks {
  constructor({
    encrypt,
    decrypt,
  }: {
    encrypt: (str: string) => string,
    decrypt: (str: string) => string,
  }) {
    this.encrypt = encrypt;
    this.decrypt = decrypt;
  }
  public encrypt: (str: string) => string;
  public decrypt: (str: string) => string;

  /**
   * 加密字段
   * @param model de model
   * @param fields 需要加密的属性对象
   */
  public encryptField(model, fields) {
    Object.keys(fields)
      .forEach((item) => {
        if(model[item]===undefined){
          return;
        }
        if (typeof fields[item] === 'object') {
          model[item] = this.encryptField(model[item], fields[item]);
        } else {
          let field = model[item];
          if (Array.isArray(field)) {
            model[item] = field.map((column) => this.encrypt(column));
          } else if (typeof field === 'string') {
            model[item] = this.encrypt(field);
          } else {
            field = JSON.stringify(field);
            model[item] = this.encrypt(field);
          }
        }
      });
    return model;
  }

  /**
   * 解密字段
   * @param model db model
   * @param fields 需要解密的属性对象
   */
  public decryptField(model, fields) {
    Object.keys(fields)
      .forEach((item) => {
        if(model[item]===undefined){
          return;
        }
        if (typeof fields[item] === 'object') {
          if (Array.isArray(model[item])) {
            model[item] = model[item].map((column) => {
              return this.decryptField(model[column], fields[item]);
            });
          } else {
            model[item] = this.decryptField(model[item], fields[item]);
          }
        } else {
          let field = model[item];
          if (Array.isArray(field)) {
            model[item] = field.map((column) => this.decrypt(column));
          } else if (typeof field === 'string') {
            model[item] = this.decrypt(field);
          } else {
            field = this.decrypt(field);
            model[item] = JSON.parse(field);
          }
        }
      });
    return model;
  }

}
