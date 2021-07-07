const register = require('./register');
const coreHelpers = require('../../../helpers');
const registerThemeHelper = register.registerThemeHelper;
const registerAsyncThemeHelper = register.registerAsyncThemeHelper;

const registerAllCoreHelpers = function registerAllCoreHelpers() {

    let asyncThemeHelpers = ['ghost_head', 'next_post', 'prev_post', 'get'];

    // Register theme helpers
    Object.keys(coreHelpers)
        .filter(k => !asyncThemeHelpers.includes(k))
        .forEach((helper) => {
            registerThemeHelper(helper, coreHelpers[helper]);
        });

    // Async theme helpers
    registerAsyncThemeHelper('ghost_head', coreHelpers.ghost_head);
    registerAsyncThemeHelper('next_post', coreHelpers.prev_post);
    registerAsyncThemeHelper('prev_post', coreHelpers.prev_post);
    registerAsyncThemeHelper('get', coreHelpers.get);
};

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerAllCoreHelpers;
