const cheerio = require('cheerio');
const rokka = require('../../../frontend/helpers/rokka_image');

module.exports = function copyAttributes(src, alt, currentImage) {
    let imgString = rokka(src, {
        hash: {altText: alt || ''}
    });
    const rokkaImg = cheerio.load(imgString.toHTML());

    currentImage.setAttribute('src', rokkaImg('img').attr('src'));
    currentImage.setAttribute('srcset', rokkaImg('img').attr('srcset'));
    currentImage.setAttribute('alt', rokkaImg('img').attr('alt'));
    currentImage.setAttribute('sizes', rokkaImg('img').attr('sizes'));
};
