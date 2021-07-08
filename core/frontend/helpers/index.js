const glob = require('glob');
const path = require('path');
const config = require('../../shared/config');
const helpers = {};

// We use glob here because it's already a dependency
// If we want to get rid of glob we could use E.g. requiredir
// Or require('fs').readdirSync(__dirname + '/')
let helperFiles = glob.sync('!(index).js', {cwd: __dirname});
helperFiles.forEach((helper) => {
    let name = helper.replace(/.js$/, '');
    helpers[name] = require(path.join(__dirname, helper));
});

// Go through the theme directory
let customThemesHelperFiles = glob.sync(path.join(config.getContentPath('themes'), '**/helpers/!(index).js'));
customThemesHelperFiles.forEach((helper) => {
    let name = helper.match(/[ \w-]+?(?=\.)/)[0];
    helpers[name] = require(helper.replace('.js', ''));
});

module.exports = helpers;
