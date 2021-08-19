const glob = require('glob');
const path = require('path');
const config = require('../shared/config');

class HandlebarsHelpersUtils {
    addCustomHelpersToGscanKnownHelpers() {
        const canarySpecs = require('gscan/lib/specs/canary');
        addCustomHelpersToGscan(canarySpecs, getAllCustomHelpers());
    }

    addCustomHelpers(helpersList) {
        addCustomHelpers(helpersList, getAllCustomHelpers());
    }
}

function addCustomHelpersToGscan(specs, customHelpers) {
    customHelpers.forEach(helperPath => specs.knownHelpers.push(getHelperName(helperPath)));
}

function addCustomHelpers(helpers, customHelpers) {
    customHelpers.forEach(helperPath => addHelperFromPath(helperPath, helpers));
}

function getAllCustomHelpers() {
    return [...getThemeCustomHelpersFiles(), ...getCoreCustomHelpersFiles()];
}

function getThemeCustomHelpersFiles() {
    return glob.sync(path.join(config.getContentPath('themes'), '**/helpers/!(index).js'));
}

function getCoreCustomHelpersFiles() {
    return glob.sync(path.join(__dirname, 'helpers/!(index).js'));
}

function getHelperName(helperPath) {
    return helperPath.match(/[ \w-]+?(?=\.)/)[0];
}

function addHelperFromPath(helperPath, helpers) {
    if (helperPath.includes('node_modules')) {
        return;
    }
    helpers[getHelperName(helperPath)] = require(helperPath.replace('.js', ''));
}

module.exports = new HandlebarsHelpersUtils();
