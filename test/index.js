/**
 * Created by zhangsong on 2018/8/20.
 */
require('mocha');

const mongoose = require('mongoose');
const assert = require('assert');
const db = require('./db.js');
const mongoosePlugin = require('../src/plugin').default;

const { Schema } = mongoose;

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

describe('测试保存数据库是否会加密', () => {
  it('保存新记录', () => {
    const obj = {
      title: '哦呢啊手机打开拉丝机老地方',
      message: new Date().toString(),
      references: {
        author: 'zhangsan',
        date: new Date(),
      },
      tips: ['1111'],
      updateTime: [
        {
          author: '234523453455354252345',
          date: new Date(),
        },
      ],
    };
    model.create(obj).then((result) => {
      console.log(JSON.stringify(result));
      assert.deepStrictEqual(model.decryption(result.message), obj.message, 'message字段未加密');
      // TODO: references字段未加密
      assert.deepStrictEqual(model.decryption(result.references.author), obj.references.author, 'references.author字段未加密');
      assert.deepStrictEqual(String(model.decryption(result.references.date)), String(obj.references.date), 'references.date字段未加密');
    }).catch((e) => {
      console.error(e);
      assert.AssertionError(e);
    });
  });
});

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

// model.findOneAndUpdate({}, { $set: { 'references.author': 'wangwu' } }).
//   then((result) => {
//     console.log(JSON.stringify(result));
//   }).
//   catch((e) => {
//     console.error(e);
//   });

// model.update({"_id" : "5b68a447010c9224107a265f"},
// {$set: {  "message": '1231231233452345345' }}).then((result)=> {
//   console.log(JSON.stringify(result));
// }).catch((e)=> {
//   console.error(e);
// });

// model.find({}).then((result)=> {
//   console.log(JSON.stringify(result));
// }).catch((e)=> {
//   console.error(e);
// });
