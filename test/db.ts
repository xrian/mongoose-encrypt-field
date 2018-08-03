/**
 * Created by zhangsong on 2018/8/3.
 */
import { createConnection } from 'mongoose';

const uri = 'mongodb://127.0.0.1:27017/data';

const db = createConnection(uri);

export default db;
