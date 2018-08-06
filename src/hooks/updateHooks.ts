/**
 * Created by zhangsong on 2018/8/3.
 */
import BaseHooks from './baseHooks';

export default class UpdateHooks extends BaseHooks {
  constructor(prop){
    super(prop);
  }

  public run (schema, obj){
    return this.encryptField(schema, obj);
  }
}
