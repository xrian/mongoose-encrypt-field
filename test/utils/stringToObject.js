/**
 * Created by zhangsong on 2018/8/4.
 */
require('mocha');
const assert = require('assert');
const stringToObject = require('../../src/utils/stringToObject').default;

describe('传入string,转换为相应的object格式', () => {
  it('值存在,并且等于1', () => {
    const o = stringToObject('a.b.c.d.e.f.g', { c: 1 });
    assert.strictEqual(o.a.b.c.d.e.f.g, 1);
  });
});
