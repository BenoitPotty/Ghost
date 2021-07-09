const register = require('./register');
const coreHelpers = require('../../../helpers');
const registerThemeHelper = register.registerThemeHelper;
const registerAsyncThemeHelper = register.registerAsyncThemeHelper;
const handlebarsHelpers = require('handlebars-helpers')();

const registerAllCoreHelpers = function registerAllCoreHelpers() {
    const allHelpers = Object.keys(coreHelpers).filter(h => h !== 'prev_post');
    const asyncHelpers = allHelpers.filter(h => h.startsWith('async_'));
    const syncHelpers = allHelpers.filter(h => !h.startsWith('async_'));

    // Async theme helpers
    asyncHelpers.forEach((h) => {
        registerAsyncThemeHelper(h.replace('async_', ''), coreHelpers[h]);
    });

    // Register theme helpers
    syncHelpers.forEach((h) => {
        registerThemeHelper(h, coreHelpers[h]);
    });

    // Register helpers from handlebars-helpers (https://github.com/helpers/handlebars-helpers)
    Object.keys(handlebarsHelpers).forEach((h) => {
        registerThemeHelper(h, handlebarsHelpers[h]);
    });

    // Specific case for next_post and prev_post as the same helper is registered twice
    registerAsyncThemeHelper('next_post', coreHelpers.prev_post);
    registerAsyncThemeHelper('prev_post', coreHelpers.prev_post);
};

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerAllCoreHelpers;
