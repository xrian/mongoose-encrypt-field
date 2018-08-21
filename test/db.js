const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/data';
const db = mongoose.createConnection(uri);

module.exports = db;
