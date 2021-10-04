const rokkaImage = require('./rokka-image');
const rokkaGallery = require('./rokka-gallery');

module.exports = {
    registerEllexxRenderers(defaultCards) {
        const ellexxRenderers = [
            'zdt',
            'fdw',
            'zit',
            'vid',
            'ifk',
            'lnk',
            'mtf',
            'tbi',
            'pdf',
            'mdh',
            'pers',
            'outlook'
        ];
        ellexxRenderers.forEach((renderer) => {
            defaultCards.push(require(`./renderers/${renderer}`));
        });
    },

    replaceDefautlRenderers(cards) {
        let imageRender = cards.find(renderer => renderer.name === 'image');
        imageRender.render = rokkaImage(imageRender.render);

        let galleryRender = cards.find(renderer => renderer.name === 'gallery');
        galleryRender.render = rokkaGallery();
    }
};
