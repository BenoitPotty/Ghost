const glob = require('glob');
const path = require('path');
const config = require('../shared/config');

class HandlebarsHelpersUtils {
    addCustomHelpersToGscanKnownHelpers() {
        const canarySpecs = require('gscan/lib/specs/canary');
        this.getCustomHelpersFiles().forEach((helperPath) => {
            canarySpecs.knownHelpers.push(getHelperName(helperPath));
        });
    }

    getCustomHelpersFiles() {
        return glob.sync(path.join(config.getContentPath('themes'), '**/helpers/!(index).js'));
    }

    addCustomHelpers(helpers) {
        this.getCustomHelpersFiles().forEach((helperPath) => {
            if (helperPath.includes('node_modules')) {
                return;
            }
            helpers[getHelperName(helperPath)] = require(helperPath.replace('.js', ''));
        });
    }
}

function getHelperName(helperPath) {
    return helperPath.match(/[ \w-]+?(?=\.)/)[0];
}

module.exports = new HandlebarsHelpersUtils();
