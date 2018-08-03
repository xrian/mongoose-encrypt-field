/**
 * Created by zhangsong on 2018/8/3.
 */
import * as Crypt from 'crypto';

const encrypt = () => {
  const cipher = Crypt.createCipher('aes192', 'a password');
};
