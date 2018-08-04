/**
 * 默认下划线开头的字段不进行加密(_StartExclude: false).
 *
 * Created by zhangsong on 2018/8/3.
 */
import strToObj from './utils/stringToObject';

function setting(schema, option: IOption) {


  let encryptFields = {};
  // 如果 fields 为 false,直接返回
  if (!option.fields) {
    return;
  }
  if (typeof option.fields === 'string') { // 如果 field 为字符串类型
    encryptFields = strToObj(option.fields, encryptFields);
  } else if (Array.isArray(option.fields)) { // 如果是数组
    encryptFields = option.fields.reduce((obj, current) => {
      return strToObj(current, obj);
    }, encryptFields);
  } else if (typeof option.fields === 'object') { // 如果是对象
    encryptFields = option.fields;
  }

}
