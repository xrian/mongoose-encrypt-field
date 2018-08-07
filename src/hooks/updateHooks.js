"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/3.
 */
const baseHooks_1 = require("./baseHooks");
class UpdateHooks extends baseHooks_1.default {
    constructor(prop) {
        super(prop);
    }
    run(plainTextValue, obj) {
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
                }
                else if (columnObj === 1) {
                    if (typeof plainTextValue[item] === 'string') {
                        plainTextValue[item] = this.encrypt(plainTextValue[item]);
                    }
                    else {
                        plainTextValue[item] = this.encrypt(JSON.stringify(plainTextValue[item]));
                    }
                }
            });
        }
        return plainTextValue;
    }
}
exports.default = UpdateHooks;
//# sourceMappingURL=updateHooks.js.map