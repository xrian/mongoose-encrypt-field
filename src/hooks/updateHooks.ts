/**
 * Created by zhangsong on 2018/8/3.
 */
import BaseHooks from './baseHooks';

export default class UpdateHooks extends BaseHooks {
  constructor(prop) {
    super(prop);
  }

  public run(plainTextValue, obj) {
    if (plainTextValue) {
      Object.keys(plainTextValue).forEach((item) => {
        const columnObj = item.split('.').reduce((parent, column) => {
          if (column === '$') {
            return parent;
          }
          return parent[column];
        }, obj);
        if (typeof columnObj === "object" && typeof plainTextValue[item] === 'object') {
          plainTextValue[item] = this.encryptField(plainTextValue[item], columnObj);
        } else if (columnObj === 1) {
          if (typeof plainTextValue[item] === 'string') {
            plainTextValue[item] = this.encrypt(plainTextValue[item]);
          } else {
            plainTextValue[item] = this.encrypt(JSON.stringify(plainTextValue[item]));
          }
        }
      });
    }
    return plainTextValue;
  }
}
