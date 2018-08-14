require("mocha");
const assert = require("assert");
const handleDifferFields = require("../../src/utils/handleDifferFields").default;

describe('对比a和b,如果b的属性在a中存在,将值设置为0', () => {
  it('a对象应该不变', function () {
    const a = {
      x: 1,
      y: 0,
      z: {
        i: 1,
        j: 0,
      }
    };
    const b = {};
    const c = handleDifferFields(a, b);
    assert.deepStrictEqual(a, c);
  });
  it('b对象中值为0,对比后a中值不应该修改. c.z.i===1', function () {
    const a = {
      x: 1,
      y: 0,
      z: {
        i: 1,
        j: 0,
      }
    };
    const b = {
      z: {
        i: 0,
      }
    };
    const c = handleDifferFields(a, b);
    assert.ok(c.z.i === 1);
  });
  it('b对象中值为1,对比后a中值应该修改. c.z.i===0', function () {
    const a = {
      x: 1,
      y: 0,
      z: {
        i: 1,
        j: 0,
      }
    };
    const b = {
      z: {
        i: 1,
      }
    };
    const c = handleDifferFields(a, b);
    assert.ok(c.z.i === 0);
  });
  it('b对象中值为1,对比后a中值应该修改. a.z.j===0', function () {
    const a = {
      x: 1,
      y: 0,
      z: {
        i: 1,
        j: 0,
      }
    };
    const b = {
      z: 1
    };
    const c = handleDifferFields(a, b);
    if (typeof c.z === 'object') {
      const flag = Object.keys(c.z).every((item) => {
        return !item;
      });
      assert.ok(flag === false);
    }
    else {
      assert.ok(!a.z);
    }
  });
});
