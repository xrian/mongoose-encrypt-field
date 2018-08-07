/**
 * Created by zhangsong on 2018/8/6.
 */
import FindHooks from './findHooks';
import FindOneHooks from './findOneHooks';
import InitHooks from './initHooks';
import SaveHooks from './saveHooks';
import UpdateHooks from './updateHooks';

export default function generateHooks({encrypt, decrypt}: {
  encrypt: (str: string) => string,
  decrypt: (str: string) => string
}) {
  const find = new FindHooks({encrypt, decrypt});
  const findOne = new FindOneHooks({encrypt, decrypt});
  const init = new InitHooks({encrypt, decrypt});
  const save = new SaveHooks({encrypt, decrypt});
  const update = new UpdateHooks({encrypt, decrypt});
  return {
    find,
    findOne,
    save,
    update,
    init,
  };
}
