"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 比较 a,b 对象,如果 a 中包含 b 的 key,将 a 中对应的值改为0
 * @param a
 * @param b
 */
function handleDifferFields(a, b) {
    // 去重
    Object.keys(b)
        .forEach((item) => {
        if (typeof b[item] === 'object' && a[item]) {
            if (a[item] === 1) {
                a[item] = {};
            }
            if (typeof a[item] === 'object') {
                a[item] = handleDifferFields(a[item], b[item]); // 递归
            }
        }
        else if (b[item] === 1) {
            a[item] = 0;
        }
    });
    return a;
}
exports.default = handleDifferFields;
//# sourceMappingURL=handleDifferFields.js.map