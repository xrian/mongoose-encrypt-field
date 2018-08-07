
## 安装
```
npm i mongoose-encrypt-field --save
```

## 已实现
- model.find() 对查询结果解密
- model.create() 对插入记录加密
- model.update() 对修改内容加密
- model.findOne() 对查询结果解密
- model.findOneAndUpdate() 对修改内容加密，对查询结果解密

## 使用
```
// 导入
const encryptField = require(mongoose-encrypt-field).default;
or
import encryptField from 'mongoose-encrypt-field';
// use
UserSchema.plugin(encryptField, { fields: ['username', 'email'], crypt: {secret: 'this is secret'}, })


Model.find()
// or
Model.update()
// 手动加密某个字符串
const result = Model.encryption(str);
// 手动解密某个字符串
const result = Model.decryption(str);
```

## 注意
1. 因为MongoDB查询语句很灵活,**所以对于Mongoose的查询条件,没有做加密处理**,如果需要查询加密字段,请调用model.encryption()方法手动加密查询字段,将返回值作为查询条件
2. 如果需要加密全部字段,fields传[]或者{}
3. ***如果某个字段需要加密，请在定义schema的时候，将该字段类型设置为string。如果设置为其他类型，可能会出现类型不匹配，查询结果不显示的情况*** \
  我并未对全部数据类型做测试，但是，如果对date类型的字段加密，查询结果是不会显示该字段的。

## future
- 更新操作时的加密 v1.0.1
- 全面测试
- 实现内嵌schema加密解密
- 补全文档
- 数据迁移demo
- 加密算法的安全性,时间复杂度和空间复杂度比较

## 说明
想要对mongodb中的字段进行加密,保存到数据库中是不可识别状态,查询出来后是正常状态
找了几个已有的库,发现都不能满足需求,于是就花两天时间写了一个,还只是初步状态,有bug发email到778811xxx@163.com或者提issue \
具体实现参考了以下几个库 \
[mongoose-encryption](https://github.com/joegoldbeck/mongoose-encryption) \
[mongoose-field-encryption](https://github.com/victorparmar/mongoose-field-encryption) \
截止目前为止(2018-08-07),这几个库并不能实现我想要的效果,于是就自己实现了一个(造轮子:D)
