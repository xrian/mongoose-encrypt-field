/**
 * Created by zhangsong on 2018-08-14.
 */
require('mocha');
const assert = require('assert');
const handleEncryptFields = require('../../src/utils/handleEncryptFields').default;

describe('对比两个object,只保留需要加密的字段', () => {
  it('b为空对象', () => {
    const a = {
      x: 1,
      y: 0,
      z: {
        i: 1,
        j: 0,
      },
    };
    const b = {};
    const c = handleEncryptFields(a, b);
    assert.deepStrictEqual(c, {
      x: 1,
      z: {
        i: 1,
      },
    });
  });
  it('对象中的数组,也应该删除不为1的键', () => {
    const a = {
      w: [{ i: 1, j: 0 }],
      x: 1,
      y: 0,
      z: {
        i: 1,
        j: 0,
      },
    };
    const b = {};
    const c = handleEncryptFields(a, b);
    assert.deepStrictEqual(c, {
      w: {
        i: 1,
      },
      x: 1,
      z: {
        i: 1,
      },
    });
  });
  it('删除b中为1的键', () => {
    const a = {
      w: [{ i: 1, j: 0 }],
      x: 1,
      y: 0,
      z: {
        i: 1,
        j: 0,
      },
    };
    const b = {
      x: 1,
      z: {
        i: 1,
        j: 1,
        k: 1,
      },
    };
    const c = handleEncryptFields(a, b);
    assert.deepStrictEqual(c, {
      w: {
        i: 1,
      },
      x: 1,
    });
  });

});
