const glob = require('glob');
const path = require('path');
const helpers = {};
const handlebarsHelpersUtils = require('../../ellexx/HandlebarsHelpersUtils');
// We use glob here because it's already a dependency
// If we want to get rid of glob we could use E.g. requiredir
// Or require('fs').readdirSync(__dirname + '/')
let helperFiles = glob.sync('!(index).js', {cwd: __dirname});
helperFiles.forEach((helper) => {
    let name = helper.replace(/.js$/, '');
    helpers[name] = require(path.join(__dirname, helper));
});

// Go through the theme directory
handlebarsHelpersUtils.addCustomHelpers(helpers);

module.exports = helpers;
