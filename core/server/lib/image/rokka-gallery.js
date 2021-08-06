const rokkaUtils = require('./rokka-utils');
const twFirstELement = 'absolute inset-0 w-screen h-screen text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-0 slide';
const twOtherElements = 'absolute inset-0 w-screen h-screen text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide';

module.exports = function rokkaGallery() {
    return function ({payload, env: {dom}}) {
        const gallery = dom.createElement('div');
        gallery.setAttribute('id', 'ellexx_gallery');
        gallery.setAttribute('class', 'relative');

        payload.images.forEach((image, index) => {
            const img = dom.createElement('img');
            rokkaUtils.copyAttributes(image.src, payload.caption ? `${payload.caption} ${index}` : `Gallery image ${index}`, img);

            const galleryItem = dom.createElement('div');
            galleryItem.setAttribute('id', `ellexx_gallery_item_${index}`);
            galleryItem.setAttribute('class', `ellexx-gallery-item ${image.width < image.height ? 'is-portrait' : 'is-landscape'} ${index === 0 ? twFirstELement : twOtherElements}`);
            galleryItem.appendChild(img);

            gallery.appendChild(galleryItem);
        });

        const prevButton = dom.createElement('div');
        prevButton.setAttribute('class', 'fixed bottom-0 right-0 bg-white w-16 h-16 flex items-center justify-center text-black');
        prevButton.setAttribute('id', 'ellexx_gallery_btn_prev');
        gallery.appendChild(prevButton);

        const nextButton = dom.createElement('div');
        nextButton.setAttribute('class', 'fixed bottom-0 right-0 bg-white w-16 h-16 flex items-center justify-center text-black');
        nextButton.setAttribute('id', 'ellexx_gallery_btn_next');
        gallery.appendChild(nextButton);

        return gallery;
    };
};

/* <div class="relative">
    <div class="absolute inset-0 w-screen h-screen text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-0 slide">Hello</div>
    <div class="absolute inset-0 w-screen h-screen text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide">There</div>
    <div class="absolute inset-0 w-screen h-screen text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide">Booya!</div>
    <div class="fixed bottom-0 right-0 bg-white w-16 h-16 flex items-center justify-center text-black">&#x276F;</div>
    <div class="fixed bottom-0 right-0 bg-white w-16 h-16 mr-16 border-r border-gray-400 flex items-center justify-center text-black">&#x276E;</div>
</div> */
