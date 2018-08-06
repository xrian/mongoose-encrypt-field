/**
 *
 * schema.paths
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
    decrypt: options.encrypt,
  });

  // schema.pre('init', function(data) {
  //   return hooks.find.run(data, options.encryptFields);
  // });
  // find
  schema.post('find', function(next, data) {
    try {
      return hooks.find.run(data, options.encryptFields);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
  // findOne
  schema.post('findOne', function(data) {
    try {
      return hooks.findOne.run(data, options.encryptFields);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  schema.pre('save', function(next) {
    hooks.save.run(this, options.encryptFields);
    return next();
  });
  schema.pre('update', function(next) {
    hooks.update.run(this, options.encryptFields);
    return next();
  });

  schema.pre('findOneAndUpdate', function(next) {
    const plainTextValue = this._update.$set;
    if (plainTextValue) {
      const updateObj = { $set: hooks.save.run(plainTextValue, options.encryptFields) };
      this.update({}, updateObj);
    }
    return next();
  });

  schema.method.encryption = () => {

  };

}

export default plugin;

