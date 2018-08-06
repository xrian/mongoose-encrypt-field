/**
 * Created by zhangsong on 2018/8/3.
 */
import BaseHooks from './baseHooks';

export default class UpdateHooks extends BaseHooks {
  constructor(prop){
    super(prop);
  }

  public run (schema, obj){
    const _doc = this.encryptField(schema, obj);
    return schema._doc = _doc;

  }
}
