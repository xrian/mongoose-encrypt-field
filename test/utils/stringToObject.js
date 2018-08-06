"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/4.
 */
const assert = require("assert");
require("mocha");
const stringToObject_1 = require("../../src/utils/stringToObject");
describe('传入string,转换为相应的object格式', () => {
    it('值存在,并且等于1', () => {
        const o = stringToObject_1.default('a.b.c.d.e.f.g', { c: 1 });
        // @ts-ignore
        assert.strictEqual(o.a.b.c.d.e.f.g, 1);
    });
});
//# sourceMappingURL=stringToObject.js.map