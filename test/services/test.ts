/**
 * Created by zhangsong on 2018/8/3.
 */
import 'mocha';
import UserModel from '../models/user';

suite('测试加密', () => {
  test('create', () => {
    UserModel.create({}).then(() => {

    });
  });
});

suite('测试解密', () => {

});
