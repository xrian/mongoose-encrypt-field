/**
 * Created by zhangsong on 2018/8/4.
 */
import * as assert from 'assert';
import 'mocha';
import strToObj from '../../src/utils/stringToObject';

describe('传入string,转换为相应的object格式', () => {
  it('值存在,并且等于1', () => {
    const o = strToObj('a.b.c.d.e.f.g', { c: 1 });
    // @ts-ignore
    assert.strictEqual(o.a.b.c.d.e.f.g, 1);
  });
});
