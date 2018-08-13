/**
 * Created by zhangsong on 2018/8/5.
 */
import {Schema} from 'mongoose';
import mongoosePlugin from '../src/plugin';
import db from './db.js';

const User = new Schema({
    username: String,
    password: String,
});

const Post = new Schema({
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

Post.plugin(mongoosePlugin, {
    fields: ['message', 'references', 'tips', 'updateTime.author'],
    secret: 'this is secret',
});

const model = db.model('post', Post, 'post');

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

model.findOneAndUpdate({}, {$set: {'references.author': 'wangwu'}}).then((result)=> {
  console.log(JSON.stringify(result));
}).catch((e)=> {
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
