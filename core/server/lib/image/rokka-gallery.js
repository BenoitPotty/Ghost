const rokkaUtils = require('./rokka-utils');

module.exports = function rokkaGallery(originalRenderer) {
    return function ({payload, env: {dom}, options}) {
        let gallery = originalRenderer({payload, env: {dom}, options});
        gallery = dom.createElement('div');
        gallery.setAttribute('class', 'ellexx-gallery');

        payload.images.forEach((image, index) => {
            const img = dom.createElement('img');
            rokkaUtils.copyAttributes(image.src, payload.caption ? `${payload.caption} ${index}` : `Gallery image ${index}`, img);

            const galleryItem = dom.createElement('div');
            galleryItem.setAttribute('id', `gallery_img_${index}`);
            galleryItem.setAttribute('class', `ellexx-gallery-item ${image.width < image.height ? 'is-portrait' : 'is-landscape'}`);
            galleryItem.appendChild(img);

            gallery.appendChild(galleryItem);
        });
        return gallery;
    };
};
