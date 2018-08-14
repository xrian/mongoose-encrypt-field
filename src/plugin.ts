/**
 *
 * Created by zhangsong on 2018/8/3.
 */

import IOptions from './interface/IOptions';
import Options from './options';
import generateHooks from './hooks/index';
import handleEncryptFields from './utils/handleEncryptFields';

function plugin(schema, opt: IOptions) {

  const options = new Options(opt);

  // 删除无效字段,如果是加密全部,使用 schema 中的字段填充
  options.encryptFields = handleEncryptFields(schema.obj, options.encryptFields);

  const hooks = generateHooks({
    encrypt: options.encrypt,
    decrypt: options.decrypt,
  });

  // find
  schema.post('find', function (data, next) {
    try {
      const array = data.map((doc) => hooks.find.run(doc, options.encryptFields));
      next();
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
  // findOne
  schema.post('findOne', function (data) {
    try {
      return hooks.find.run(data, options.encryptFields);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
  // create
  schema.pre('save', function (next) {
    hooks.save.run(this, options.encryptFields);
    return next();
  });
  // update
  schema.pre('update', function (next) {
    const plainTextValue = this._update.$set;
    hooks.update.run(plainTextValue, options.encryptFields);
    return next();
  });

  // 保存到数据库前加密
  schema.pre('findOneAndUpdate', function (next) {
    const plainTextValue = this._update.$set;
    hooks.update.run(plainTextValue, options.encryptFields);
    return next();
  });
  // 查询出结果后解密
  schema.post('findOneAndUpdate', function (data) {
    try {
      return hooks.find.run(data, options.encryptFields);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  schema.method.encryption = options.encrypt;
  schema.method.decryption = options.decrypt;

}

export default plugin;

