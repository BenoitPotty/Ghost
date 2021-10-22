const config = require('../../shared/config');

function getActiveConfig() {
    const storageConfig = config.get('storage');
    return storageConfig[storageConfig.active];
}

function throughStack(imgSrc) {
    return `https://${getActiveConfig().organization}.rokka.io/${getStack('twitterStack')}/-${imgSrc}-.jpg`;
}

function getStack(stackKey) {
    const activeConfig = getActiveConfig();
    if (activeConfig && activeConfig[stackKey]) {
        return activeConfig[stackKey];
    } else {
        return '';
    }
}

module.exports = throughStack;
