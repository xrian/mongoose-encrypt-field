import * as moment from 'moment';
import { Schema } from 'mongoose';
import { fieldEncryption } from 'mongoose-field-encryption';
import db from '../db.js';

const User = new Schema({
  username: String,
  password: String,
});

const Post = new Schema({
  title: String,
  message: String,
  references: [
    {
      author: String,
      date: Date,
    },
  ],
  content: {
    text: String,
    time: Date,
  },
  updateTime: [String],
  user: User,
});

Post.plugin(fieldEncryption, { fields: ['message', 'references'], secret: 'some secret key' });

const model = db.model('admin', Post, 'admin');

model.create({
    title: '哦呢啊手机打开拉丝机老地方',
    message: moment()
      .format('YYYY_MM_DD HH:mm:ss:SSS'),
    references: {
      author: 'zhangsan',
      date: new Date(),
    },
    content: {
      text: 'zheg s sadaslkdn 阿圣诞节啦开始',
      time: new Date(),
    },
    user: {
      username: 'zhangsong',
      password: '12312345',
    },
    updateTime: [{
      type: String,
    }],
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((e) => {
    console.error(e);
  });
