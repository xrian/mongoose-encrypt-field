## 简介
Mongoose的插件,在保存数据库前(before save)对所需字段进行加密,在查询出数据后(query after)对数据进行解密.

- 对聚合查询(Aggregate)结果不会进行解密
- 对查询条件不会进行加密(deleteMany,deleteOne,find,findOne,findOneAndDelete,findOneAndRemove,findOneAndUpdate,remove第一个参数不会加密)
- 对populate()方法的参数也不会进行加密
- 需要加密的字段最好为字符串类型,如果为其他类型,会调用JSON.stringify()方法再加密.
- 加密后字段不能进行模糊查询(只能精确查询)
- 如果需要对查询条件加密,请调用model.encryption()将字段加密后再查询
- 如果需要对聚合查询结果解密,请调用model.decryption()方法

## 已实现
- model.find() 对查询结果解密
- model.create() 对插入记录加密
- model.update() 对修改内容加密
- model.findOne() 对查询结果解密
- model.findOneAndUpdate() 对修改内容加密，对查询结果解密

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

## future
- 更新操作时的加密 
- 全面测试
- 实现内嵌schema加密解密,以及
- 数据迁移demo
- 加密算法的安全性,时间复杂度和空间复杂度比较

## 说明
想要对mongodb中的字段进行加密,保存到数据库中是不可识别状态,查询出来后是正常状态
找了几个已有的库,发现都不能满足需求,于是就花两天时间写了一个,有bug发email到778811xxx@163.com或者提issue \
具体实现参考了以下几个库 \
[mongoose-encryption](https://github.com/joegoldbeck/mongoose-encryption) \
[mongoose-field-encryption](https://github.com/victorparmar/mongoose-field-encryption) \
截止目前为止(2018-08-07),这几个库并不能实现我想要的效果,于是就自己实现了一个(造轮子:D)
