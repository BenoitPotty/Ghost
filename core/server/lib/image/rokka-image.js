const logging = require('@tryghost/logging');
const rokkaUtils = require('./rokka-utils');

module.exports = function rokkaImage(originalRenderer) {
    return function ({payload, env: {dom}, options}) {
        const figure = originalRenderer({payload, env: {dom}, options});

        try {
            let currentImage = figure.firstChild;
            rokkaUtils.copyAttributes(payload.src, payload.alt, currentImage);
            rokkaUtils.wrap(dom, currentImage);
        } catch (error) {
            logging.error(`Impossible to render Rokka Image. Reason : ${error}`);
        }
        return figure;
    };
};
