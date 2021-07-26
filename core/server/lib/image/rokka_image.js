const rokka = require('../../../frontend/helpers/rokka_image');
const logging = require('@tryghost/logging');
const cheerio = require('cheerio');

module.exports = function rokka_image(originalRenderer) {
    return function ({payload, env: {dom}, options}) {
        const figure = originalRenderer({payload, env: {dom}, options});

        try {
            let currentImage = figure.firstChild;

            //Use the rokka_image helper function to uniformize image generation
            let imgString = rokka(payload.src, {hash: {altText: payload.alt || ''}});
            const rokkaImage = cheerio.load(imgString.toHTML());

            currentImage.setAttribute('src', rokkaImage('img').attr('src'));
            currentImage.setAttribute('srcset', rokkaImage('img').attr('srcset'));
            currentImage.setAttribute('alt', rokkaImage('img').attr('alt'));
            currentImage.setAttribute('sizes', rokkaImage('img').attr('sizes'));
        } catch (error) {
            logging.error(`Impossible to render Rokka Image. Reason : ${error}`);
        }
        return figure;
    };
};
