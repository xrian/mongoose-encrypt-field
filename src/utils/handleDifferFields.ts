import IFieldObj from '../interface/IFieldObject';

/**
 * 比较 a,b 对象,如果 a 中包含 b 的 key,将 a 中对应的值改为0
 * @param a
 * @param b
 */
export default function handleDifferFields(a: IFieldObj|number, b: IFieldObj|number): IFieldObj|number{
  // 去重
  Object.keys(b)
    .forEach((item) => {
      if (typeof b[item] === 'object' && a[item]) {
        if (a[item] === 1) {
          a[item] = {};
        }else if (typeof a[item] === 'object') {
          a[item] = handleDifferFields(<IFieldObj>a[item], <IFieldObj>b[item]); // 递归
        }else {
          a[item] = 0;
        }
      } else if (b[item] === 1) {
        a[item] = 0;
      }
    });
  return a;
}
export {

}
