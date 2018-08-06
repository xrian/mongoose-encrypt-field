"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/3.
 */
const baseHooks_1 = require("./baseHooks");
class SaveHooks extends baseHooks_1.default {
    constructor(prop) {
        super(prop);
    }
    run(schema, obj) {
        const _doc = this.encryptField(schema, obj);
        return schema._doc = _doc;
    }
}
exports.default = SaveHooks;
//# sourceMappingURL=saveHooks.js.map