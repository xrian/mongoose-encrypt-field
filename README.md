
## 安装
```
npm i mongoose-encrypt-field --save
```
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

## future
- 全面测试
- 实现内嵌schema,和更新操作时的加密解密
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
