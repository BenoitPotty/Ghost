const config = require('../../shared/config');

module.exports = function active_storage_config() {
    const storageConfig = config.get('storage');
    return storageConfig[storageConfig.active];
};
