/**
 * Created by zhangsong on 2018/8/5.
 */
import * as moment from 'moment';
import { Schema } from 'mongoose';
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
    date: Date,
  },
  updateTime: [
    {
      author: String,
      date: Date,
    },
  ],
  user: User,
});

Post.plugin(mongoosePlugin, { fields: ['message', 'references', 'tips', 'updateTime.author'], crypt: {secret: 'this is secret'} });

const model = db.model('post', Post, 'post');

/*model.create({
    title: '哦呢啊手机打开拉丝机老地方',
    message: moment()
      .format('YYYY_MM_DD HH:mm:ss:SSS'),
    references: {
      author: 'zhangsan',
      date: new Date(),
    },
    updateTime: [{
      author: '234523453455354252345',
      date: new Date(),
    }]
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((e) => {
    console.error(e);
  });*/
model.find({}).then((result)=> {
  console.log(JSON.stringify(result));
}).catch((e)=> {
  console.error(e);
});
