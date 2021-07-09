const {SafeString} = require('../services/proxy');
const config = require('../../shared/config');
const logging = require('@tryghost/logging');
const isString = require('lodash/isString');

function logRenderingImpossible(reason) {
    logging.warn(`Cannot generate proper Rokka img. Reason : ${reason}.`);
}

function standardImage(imgSrc) {
    return new SafeString(`<img src="${imgSrc}" />`);
}

// eslint-disable-next-line camelcase
module.exports = function rokka_image(imageUrl, options) {
    const storageConfig = config.get('storage');

    if (!isString(imageUrl)) {
        logRenderingImpossible('No imageUrl was passed');
        return;
    }

    if (!options) {
        logRenderingImpossible('No options were passed to the helper');
        return standardImage(imageUrl);
    }

    if (!storageConfig) {
        logRenderingImpossible('Storage not defined in configuration');
        return standardImage(imageUrl);
    }

    const activeConfig = storageConfig[storageConfig.active];

    if (!activeConfig) {
        logRenderingImpossible('No active config found');
        return standardImage(imageUrl);
    }

    const organization = activeConfig.organization;
    const defaultStack = activeConfig.defaultStack;

    const encodedImageUrl = encodeURIComponent(imageUrl);

    const altText = options.hash.altText || '';

    return new SafeString(
        `<img
        src="https://${organization}.rokka.io/${defaultStack}/-${encodedImageUrl}-.jpg"
        srcset="https://${organization}.rokka.io/${defaultStack}/resize-width-300/-${encodedImageUrl}-.jpg 300w,
                https://${organization}.rokka.io/${defaultStack}/resize-width-600/-${encodedImageUrl}-.jpg 600w,
                https://${organization}.rokka.io/${defaultStack}/resize-width-1000/-${encodedImageUrl}-.jpg 1000w"
        sizes="(min-width: 1400px) 1400px, 92vw"
        alt="${altText}" />`
    );
};
