import * as moment from 'moment';
import { Schema } from 'mongoose';
import { fieldEncryption } from 'mongoose-field-encryption';
import db from '../db.js';

const Post = new Schema({
  title: String,
  message: String,
  references: {
    author: String,
    date: Date,
  },
});

Post.plugin(fieldEncryption, { fields: ['message', 'references'], secret: 'some secret key' });

const model = db.model('admin', Post, 'admin');

model.create({
    title: '哦呢啊手机打开拉丝机老地方',
    message: moment().format('YYYY_MM_DD HH:mm:ss:SSS'),
    references: {
      author: 'zhangsan',
      date: new Date(),
    },
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((e) => {
    console.error(e);
  });
