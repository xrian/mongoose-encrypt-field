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
   * @param data de model
   * @param fields 需要加密的属性对象
   */
  public encryptField(schema, fields) {
    let data = schema;
    if (schema._doc) {
      data = schema._doc;
    }
    Object.keys(fields)
      .forEach((item) => {
        if (data[item] === undefined) {
          return;
        }
        if (typeof fields[item] === 'object') {
          if (Array.isArray(data[item])) {
            data[item].map((column) => this.encryptField(column, fields[item]));
          } else {
            data[item] = this.encryptField(data[item], fields[item]);
          }
        } else {
          let field = data[item];
          if (Array.isArray(field)) {
            data[item] = field.map((column) => this.encrypt(column));
          } else if (typeof field === 'string') {
            data[item] = this.encrypt(field);
          } else {
            field = JSON.stringify(field);
            data[item] = this.encrypt(field);
          }
        }
      });
    return data;
  }

  /**
   * 解密字段
   * @param schema db data
   * @param fields 需要解密的属性对象
   */
  public decryptField(schema, fields) {
    let data = schema;
    if (schema._doc) {
      data = schema._doc;
    }
    Object.keys(fields)
      .forEach((item) => {
        if (data[item] === undefined) {
          return;
        }
        // TODO: 当字段是数组对象时,会报错
        if (typeof fields[item] === 'object') {
          if (Array.isArray(data[item])) {
            data[item] = data[item].map((column) => {
              return this.decryptField(column, fields[item]);
            });
          } else {
            data[item] = this.decryptField(data[item], fields[item]);
          }
        } else {
          let field = data[item];
          if (Array.isArray(field)) {
            data[item] = field.map((column) => this.decrypt(column));
          } else if (typeof field === 'string') {
            data[item] = this.decrypt(field);
          } else {
            field = this.decrypt(field);
            data[item] = JSON.parse(field);
          }
        }
      });
    return data;
  }

}
