const register = require('./register');
const coreHelpers = require('../../../helpers');
const registerThemeHelper = register.registerThemeHelper;
const registerAsyncThemeHelper = register.registerAsyncThemeHelper;
const handlebarsHelpers = require('handlebars-helpers')();

const registerAllCoreHelpers = function registerAllCoreHelpers() {
    const allHelpers = Object.keys(coreHelpers);
    const asyncHelpers = ['prev_post', 'get', 'ghost_head'];
    const syncHelpers = allHelpers.filter(h => !asyncHelpers.includes(h));

    // Register theme helpers
    syncHelpers.forEach((h) => {
        registerThemeHelper(h, coreHelpers[h]);
    });

    // Register helpers from handlebars-helpers (https://github.com/helpers/handlebars-helpers)
    Object.keys(handlebarsHelpers).forEach((h) => {
        registerThemeHelper(h, handlebarsHelpers[h]);
    });

    // Register specific async helpers. Issue when making it dynamic. Not need to overengineer now
    registerAsyncThemeHelper('get', coreHelpers.get);
    registerAsyncThemeHelper('ghost_head', coreHelpers.ghost_head);
    registerAsyncThemeHelper('next_post', coreHelpers.prev_post);
    registerAsyncThemeHelper('prev_post', coreHelpers.prev_post);
};

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerAllCoreHelpers;
