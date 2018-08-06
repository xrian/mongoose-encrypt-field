"use strict";
/**
 * 整理需要加密的字段（删除schema中没有的字段，）
 * Created by zhangsong on 2018/8/6.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function f(schemaObj, obj) {
    const fieldsArr = Object.keys(obj); // obj中的全部字段
    const encryptFieldsObj = {};
    // 判断是否全部为0
    const encryptFields = fieldsArr.filter((item) => {
        return obj[item] !== 0;
    });
    if (encryptFields.length === 0) { // 如果没有填,则加密全部
        Object.keys(schemaObj)
            .forEach((item) => {
            if (item === '_id' || item === '__v') {
                return;
            }
            if (schemaObj[item].constructor.name === 'Array') {
                encryptFieldsObj[item] = f(schemaObj[item][0], {});
            }
            else if (schemaObj[item].constructor.name === '‌Object') {
                encryptFieldsObj[item] = f(schemaObj[item], {});
            }
            else if (schemaObj[item].constructor.name === '‌Schema') {
                encryptFieldsObj[item] = f(schemaObj[item].obj, {});
            }
            else {
                encryptFieldsObj[item] = 1;
            }
        });
    }
    else {
        // TODO: 数组处理
        fieldsArr.forEach((item) => {
            if (item === '_id' || item === '__v') {
                return;
            }
            /**
             * 如果 obj[item]不等于1,那么说明 schema 中对应的类型是内嵌,或者数组,或者对象
             */
            if (obj[item] === 1) {
                if (schemaObj[item].constructor.name === 'Object') { // 加密该字段下面的全部字段
                    encryptFieldsObj[item] = f(schemaObj[item], {});
                }
                else {
                    encryptFieldsObj[item] = 1;
                }
            }
            else if (Array.isArray(schemaObj[item])) {
                const schemaField = schemaObj[item][0];
                if (schemaObj[item].constructor.name === 'Function') {
                    encryptFieldsObj[item] = 1;
                }
                else {
                    encryptFieldsObj[item] = f(schemaField, obj[item]);
                }
            }
            else if (schemaObj[item].constructor.name === '‌Object' && schemaObj[item]) {
                encryptFieldsObj[item] = f(schemaObj[item], obj[item]);
            }
            else {
                // 如果是其他的类型,不加密
            }
        });
    }
    return encryptFieldsObj;
}
exports.default = f;
//# sourceMappingURL=handleEncryptFields.js.map