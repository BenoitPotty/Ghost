const cheerio = require('cheerio');
const rokka = require('../../../frontend/helpers/rokka_image');

module.exports = {
    copyAttributesWithStack(src, alt, stack, currentImage) {
        let imgString = rokka(src, {
            hash: {
                altText: alt || '',
                stack: stack
            }
        });
        copyAttributesFromRokka(imgString, currentImage);
    },
    copyAttributes(src, alt, currentImage) {
        let imgString = rokka(src, {
            hash: {altText: alt || ''}
        });
        copyAttributesFromRokka(imgString, currentImage);
    },
    wrap(dom, element) {
        const wrapper = dom.createElement('div');
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
    },
    setOrientationClass(image, figure) {
        const width = parseInt(image.getAttribute('width'));
        const height = parseInt(image.getAttribute('height'));

        if (width < height) {
            this.addClass(figure, 'is-portrait');
        } else {
            this.addClass(figure, 'is-landscape');
        }
    },
    addClass(element, className) {
        const currentClasses = element.getAttribute('class');
        element.setAttribute('class', currentClasses ? `${currentClasses} ${className}` : className);
    }
};

function copyAttributesFromRokka(imgString, currentImage) {
    const rokkaImg = cheerio.load(imgString.toHTML());

    currentImage.setAttribute('src', rokkaImg('img').attr('src'));
    currentImage.setAttribute('srcset', rokkaImg('img').attr('srcset'));
    currentImage.setAttribute('alt', rokkaImg('img').attr('alt'));
    currentImage.setAttribute('sizes', rokkaImg('img').attr('sizes'));
}
