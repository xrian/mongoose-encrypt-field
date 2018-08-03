"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/3.
 */
require("mocha");
const user_1 = require("../models/user");
suite('测试加密', () => {
    test('create', () => {
        user_1.default.create({}).then(() => {
        });
    });
});
suite('测试解密', () => {
});
//# sourceMappingURL=test.js.map