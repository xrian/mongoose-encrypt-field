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
            else if (schemaObj[item].constructor.name === 'Object') {
                encryptFieldsObj[item] = f(schemaObj[item], {});
            }
            else if (schemaObj[item].constructor.name === '‌Schema') {
                encryptFieldsObj[item] = f(schemaObj[item].obj, {});
            }
            else if (schemaObj[item].constructor.name === 'Function') {
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
            if (!schemaObj[item]) { // 如果为false,跳过
                return;
            }
            /**
             * 如果 obj[item]不等于1,那么说明 schema 中对应的类型是内嵌,或者数组,或者对象
             */
            if (Array.isArray(schemaObj[item])) {
                const schemaField = schemaObj[item][0];
                if (schemaField.constructor.name === 'Function') { // 可能的情况[{type: String}]
                    encryptFieldsObj[item] = 1;
                }
                else if (schemaField.constructor.name === 'Object') {
                    encryptFieldsObj[item] = f(schemaField, isNumberOne(obj[item]));
                }
            }
            else if (schemaObj[item].constructor.name === 'Object') {
                encryptFieldsObj[item] = f(schemaObj[item], isNumberOne(obj[item]));
            }
            else { // TODO: 这里没有处理内嵌schema
                if (obj[item] === 1) {
                    encryptFieldsObj[item] = 1;
                }
                else {
                    encryptFieldsObj[item] = f(obj[item], {});
                }
            }
        });
    }
    return encryptFieldsObj;
}
exports.default = f;
/**
 * 判断参数是否为1,如果是1则返回空对象,否则返回原值
 * @param item
 * @returns {any}
 */
function isNumberOne(item) {
    let obj = item;
    if (item === 1) {
        obj = {};
    }
    return obj;
}
//# sourceMappingURL=handleEncryptFields.js.map