"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/3.
 */
const mongoose_1 = require("mongoose");
const db_1 = require("../db");
const schema = new mongoose_1.Schema({
    user: { type: String },
    username: { type: String },
    password: { type: String },
    role: { type: Number },
    rolesId: { type: String },
    createTime: { type: Date, default: Date.now },
});
const model = db_1.default.model('admin', schema, 'admin');
exports.default = model;
//# sourceMappingURL=user.js.map