import db from '../db';
import {Schema} from 'mongoose';
const encipher = require('mongoose-encipher').default
// or import encipher from 'mongoose-encipher'

const UserSchema = new Schema({ username: String, email: String })
UserSchema.plugin(encipher, { fields: ['username', 'email'], secret: 'mysecret-key' })

const User = db.model('useraaaa', UserSchema)
const john = new User({username: 'John', email: 'John@dummy.com'})
john.save()
