"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/4.
 */
const aes192_1 = require("./crypt/aes192");
const stringToObject_1 = require("./utils/stringToObject");
const handleDifferFields_1 = require("./utils/handleDifferFields");
let encryption = aes192_1.default;
class Options {
    constructor(option) {
        // 具有初始值的属性
        this.encryptFields = {}; // 需要加密的字段
        this.excludeFields = {}; // 不需要加密的字段
        if (!option.fields) {
            throw new Error('Boolean(option.fields) === false');
        }
        if (!option.crypt.secret && (!option.crypt.encrypt || !option.crypt.decrypt)) {
            throw new Error('Either the secret exists or the encrypt function exists');
        }
        if (option.crypt.secret) {
            this.encrypt = function (str) {
                return encryption.encrypt(str, option.crypt.secret);
            };
            this.decrypt = function (str) {
                return encryption.decrypt(str, option.crypt.secret);
            };
        }
        else {
            this.encrypt = option.crypt.encrypt;
            this.decrypt = option.crypt.decrypt;
        }
        // 也可以通过传入 IEncryption 类型的 object 实现自定义加密
        if (option.crypt.encryption) {
            encryption = option.crypt.encryption;
        }
        // 处理不同的 excludeFields 类型
        if (option.excludeFields) {
            if (typeof option.excludeFields === 'string') {
                this.excludeFields = stringToObject_1.default(option.excludeFields, {});
            }
            else if (Array.isArray(option.excludeFields)) {
                this.excludeFields = option.excludeFields.reduce((obj, current) => {
                    return stringToObject_1.default(current, obj);
                }, {});
            }
            else if (typeof option.excludeFields === 'object') {
                this.excludeFields = option.excludeFields;
            }
        }
        // 处理不同的 fields 类型
        if (typeof option.fields === 'string') { // 如果 field 为字符串类型
            this.encryptFields = stringToObject_1.default(option.fields, {});
        }
        else if (Array.isArray(option.fields)) { // 如果是数组
            this.encryptFields = option.fields.reduce((obj, current) => {
                return stringToObject_1.default(current, obj);
            }, {});
        }
        else if (typeof option.fields === 'object') { // 如果是对象
            this.encryptFields = option.fields;
        }
        else {
            throw new Error('option.fields type is unknown');
        }
        // 去重
        this.encryptFields = handleDifferFields_1.default(this.encryptFields, this.excludeFields);
    }
}
exports.default = Options;
//# sourceMappingURL=options.js.map