"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/3.
 */
const baseHooks_1 = require("./baseHooks");
class InitHooks extends baseHooks_1.default {
    constructor(prop) {
        super(prop);
    }
    run(schema, obj) {
        return this.decryptField(schema, obj);
    }
}
exports.default = InitHooks;
//# sourceMappingURL=initHooks.js.map