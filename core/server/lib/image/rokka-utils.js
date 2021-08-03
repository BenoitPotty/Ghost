const cheerio = require('cheerio');
const rokka = require('../../../frontend/helpers/rokka_image');

module.exports = {
    copyAttributes: function (src, alt, currentImage) {
        let imgString = rokka(src, {
            hash: {altText: alt || ''}
        });
        const rokkaImg = cheerio.load(imgString.toHTML());

        currentImage.setAttribute('src', rokkaImg('img').attr('src'));
        currentImage.setAttribute('srcset', rokkaImg('img').attr('srcset'));
        currentImage.setAttribute('alt', rokkaImg('img').attr('alt'));
        currentImage.setAttribute('sizes', rokkaImg('img').attr('sizes'));
    },
    wrap: function (dom, element) {
        const wrapper = dom.createElement('div');
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
    },
    setOrientationClass: function (image, figure) {
        const width = image.getAttribute('width');
        const height = image.getAttribute('height');
        if (width < height) {
            addClass(figure, 'is-portrait');
        } else {
            addClass(figure, 'is-landscape');
        }
    }
};

function addClass(element, className) {
    element.setAttribute('class', `${element.getAttribute('class')} ${className}`);
}
