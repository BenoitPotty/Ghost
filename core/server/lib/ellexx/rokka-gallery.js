const rokkaUtils = require('./rokka-utils');
const config = require('../../../shared/config');

module.exports = function rokkaGallery() {
    return function ({payload, env: {dom}}) {
        const gallery = dom.createElement('div');

        try {
            rokkaUtils.addClass(gallery, 'slider');

            gallery.appendChild(createSlides(dom, payload.images));

            gallery.appendChild(createBullets(dom));

            gallery.appendChild(createCaption(dom, payload.caption));
        } catch (err) {
            console.error(err);
        }
        return gallery;
    };
};

function getGalleryStack() {
    const storageConfig = config.get('storage');
    const activeConfig = storageConfig[storageConfig.active];

    if (activeConfig && activeConfig.galleryStack) {
        return activeConfig.galleryStack;
    } else {
        return '';
    }
}
function createCaption(dom, caption) {
    const captionElement = dom.createElement('div');
    rokkaUtils.addClass(captionElement, 'slider_caption');

    const captionText = dom.createElement('div');
    rokkaUtils.addClass(captionText, 'slider_caption_content');
    if (caption) {
        captionText.appendChild(dom.createTextNode(caption));
    }
    captionElement.appendChild(captionText);

    const captionControls = createCaptionControls(dom);
    captionElement.appendChild(captionControls);

    return captionElement;
}

function createCaptionControls(dom) {
    const captionControls = dom.createElement('div');
    rokkaUtils.addClass(captionControls, 'slider_caption_controls');
    return captionControls;
}

function createSlides(dom, images) {
    const slides = dom.createElement('div');
    rokkaUtils.addClass(slides, 'slider_slides');
    images.forEach((image, index) => {
        slides.appendChild(createSlide(dom, image, index));
    });
    return slides;
}

function createSlide(dom, image, index) {
    const slide = dom.createElement('div');
    slide.setAttribute('id', `slide-${index + 1}`);
    slide.appendChild(createImage(dom, image, `Gallery image ${index + 1}`));
    return slide;
}

function createImage(dom, image, altText) {
    let img = dom.createElement('img');
    rokkaUtils.copyAttributesWithStack(image.src, altText, getGalleryStack(), img);

    // Some bug fix (images don't have the correct size on mobile) with carousel and Rokka. So remove srcset & sizes
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');

    // Use the lazy loading of slick
    img.setAttribute('data-lazy', img.getAttribute('src'));
    img.removeAttribute('src');

    return img;
}

function createBullets(dom) {
    const bullets = dom.createElement('div');
    rokkaUtils.addClass(bullets, 'slider_bullets');
    bullets.setAttribute('id', 'slider-bullets');
    return bullets;
}
