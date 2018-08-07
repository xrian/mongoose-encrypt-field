/**
 * 将 string 转换为 object
 * Created by zhangsong on 2018/8/4.
 */
export default function (str: string, obj: {} = {}): object {
  if (!str) {
    return obj;
  }
  const arr = str.split('.');
  let parent = obj;
  arr.forEach((item, index) => {
    const value = parent[item];
    if (typeof value === 'object') {
      if (index === arr.length - 1) {
        return;
      }
      parent = value;
    } else if (index === arr.length - 1) {
      parent[item] = 1;
    } else {
      const o = {};
      parent[item] = o;
      parent = o;
    }
  });
  return obj;
}
