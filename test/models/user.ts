/**
 * Created by zhangsong on 2018/8/3.
 */
import {Schema} from 'mongoose';
import db from '../db';

const schema = new Schema({
  user: { type: String },
  username: { type: String },
  password: { type: String },
  role: { type: Number },
  rolesId: { type: String },
  createTime: { type: Date, default: Date.now },      
});

const model = db.model('admin', schema, 'admin');

export default model;
