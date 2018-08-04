/**
 * Created by zhangsong on 2018/8/4.
 */
var mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

var userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // whatever else
});
