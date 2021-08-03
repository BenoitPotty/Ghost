const logging = require('@tryghost/logging');
const rokkaUtils = require('./rokka-utils');

module.exports = function rokkaGallery(originalRenderer) {
    return function ({payload, env: {dom}, options}) {
        const gallery = originalRenderer({payload, env: {dom}, options});
        try {
            let container = gallery.firstChild;
            let row = container.firstChild;

            do {
                let imgDiv = row.firstChild;
                do {
                    let img = imgDiv.firstChild;
                    rokkaUtils.copyAttributes(img.getAttribute('src'), payload.alt, img);
                    imgDiv = imgDiv.nextSibling;
                } while (imgDiv);

                row = row.nextSibling;
            } while (row);
        } catch (error) {
            logging.error(`Cannot render Rokka Gallery. Reason : ${error}`);
        }

        return gallery;
    };
};
