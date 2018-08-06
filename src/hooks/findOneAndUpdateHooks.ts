/**
 * Created by zhangsong on 2018/8/3.
 */
import BaseHooks from './baseHooks.js';

export default class FindOneAndUpdateHooks extends BaseHooks {
  constructor(prop){
    super(prop);
  }

  public run (schema, obj){
    return this.decryptField(schema, obj);
  }
}
