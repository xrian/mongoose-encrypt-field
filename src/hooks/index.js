"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/6.
 */
const findHooks_1 = require("./findHooks");
const findOneAndUpdateHooks_1 = require("./findOneAndUpdateHooks");
const findOneHooks_1 = require("./findOneHooks");
const initHooks_1 = require("./initHooks");
const saveHooks_1 = require("./saveHooks");
const updateHooks_1 = require("./updateHooks");
function generateHooks({ encrypt, decrypt }) {
    const find = new findHooks_1.default({ encrypt, decrypt });
    const findOneAndUpdate = new findOneAndUpdateHooks_1.default({ encrypt, decrypt });
    const findOne = new findOneHooks_1.default({ encrypt, decrypt });
    const init = new initHooks_1.default({ encrypt, decrypt });
    const save = new saveHooks_1.default({ encrypt, decrypt });
    const update = new updateHooks_1.default({ encrypt, decrypt });
    return {
        find,
        findOne,
        save,
        update,
        init,
        findOneAndUpdate,
    };
}
exports.default = generateHooks;
//# sourceMappingURL=index.js.map