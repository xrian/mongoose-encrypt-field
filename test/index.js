"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/5.
 */
const mongoose_1 = require("mongoose");
const plugin_1 = require("../src/plugin");
const db_js_1 = require("./db.js");
const User = new mongoose_1.Schema({
    username: String,
    password: String,
});
const Post = new mongoose_1.Schema({
    title: String,
    message: String,
    tips: [String],
    references: {
        link: String,
        author: String,
        date: String,
    },
    updateTime: [
        {
            author: String,
            date: Date,
        },
    ],
    user: User,
});
Post.plugin(plugin_1.default, {
    fields: ['message', 'references', 'tips', 'updateTime.author'],
    secret: 'this is secret',
});
const model = db_js_1.default.model('post', Post, 'post');
// model.create({
//     title: '哦呢啊手机打开拉丝机老地方',
//     message: new Date().toString(),
//     references: {
//         author: 'zhangsan',
//         date: new Date(),
//     },
//     tips: ['1111'],
//     updateTime: [{
//         author: '234523453455354252345',
//         date: new Date(),
//     }],
// })
//     .then((result) => {
//         console.log(JSON.stringify(result));
//     })
//     .catch((e) => {
//         console.error(e);
//     });
model.findOneAndUpdate({}, { $set: { 'references.author': 'wangwu' } }).then((result) => {
    console.log(JSON.stringify(result));
}).catch((e) => {
    console.error(e);
});
// model.update({"_id" : "5b68a447010c9224107a265f"}, {$set: {  "message": '1231231233452345345' }}).then((result)=> {
//   console.log(JSON.stringify(result));
// }).catch((e)=> {
//   console.error(e);
// });
// model.find({}).then((result)=> {
//   console.log(JSON.stringify(result));
// }).catch((e)=> {
//   console.error(e);
// });
//# sourceMappingURL=index.js.map