"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/3.
 */
const mongoose_1 = require("mongoose");
const uri = 'mongodb://127.0.0.1:27017/data';
const db = mongoose_1.createConnection(uri);
exports.default = db;
//# sourceMappingURL=db.js.map