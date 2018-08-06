"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/3.
 */
const baseHooks_js_1 = require("./baseHooks.js");
class FindOneAndUpdateHooks extends baseHooks_js_1.default {
    constructor(prop) {
        super(prop);
    }
    run(schema, obj) {
        const _doc = this.decryptField(schema, obj);
        return schema._doc = _doc;
    }
}
exports.default = FindOneAndUpdateHooks;
//# sourceMappingURL=findOneAndUpdateHooks.js.map