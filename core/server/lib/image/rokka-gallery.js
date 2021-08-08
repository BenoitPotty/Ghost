const controlCommonClasses = 'w-10 h-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 my-auto';
const defaultStyle = `
  .carousel-open:checked+.carousel-item {
    position: static;
    opacity: 100;
  }

  .carousel-item {
    -webkit-transition: opacity 0.6s ease-out;
    transition: opacity 0.6s ease-out;
  }

  .carousel-indicators {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 2%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
  }
`;
const rokkaUtils = require('./rokka-utils');

module.exports = function rokkaGallery() {
    return function ({payload, env: {dom}}) {
        const gallery = dom.createElement('div');
        gallery.setAttribute('id', 'ellexx_gallery');
        gallery.setAttribute('class', 'carousel relative rounded relative overflow-hidden shadow-xl');

        const slides = dom.createElement('div');
        slides.setAttribute('id', 'ellexx_gallery_slides');
        slides.setAttribute('class', 'carousel-inner relative overflow-hidden w-full');
        gallery.appendChild(slides);

        const indicators = dom.createElement('ol');
        indicators.setAttribute('class', 'carousel-indicators');

        const imgCount = payload.images.length;
        payload.images.forEach((image, index) => {
            const slideNumber = index + 1;

            slides.appendChild(createInput(dom, slideNumber));

            slides.appendChild(createSlide(dom, image, payload.caption, slideNumber));

            slides.appendChild(createPreviousControl(dom, slideNumber, imgCount));

            slides.appendChild(createNextControl(dom, slideNumber, imgCount));

            createIndicator(dom, slideNumber, indicators);
        });

        slides.appendChild(indicators);

        slides.appendChild(createStyle(dom, imgCount));

        return gallery;
    };
};

function createInput(dom, slideNumber) {
    const input = dom.createElement('input');
    input.setAttribute('id', `carousel-${slideNumber}`);
    input.setAttribute('class', `carousel-open`);
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'carousel');
    input.setAttribute('aria-hidden', 'true');
    input.setAttribute('hidden', '');
    if (slideNumber === 1) {
        input.setAttribute('checked', 'checked');
    }
    return input;
}

function createSlide(dom, image, caption, slideNumber) {
    const slide = dom.createElement('div');
    slide.setAttribute('class', `carousel-item absolute opacity-0 bg-center`);
    const img = dom.createElement('img');
    rokkaUtils.copyAttributes(image.src, `${caption ? caption : 'Gallery Image'} (${slideNumber})`, img);
    img.setAttribute('src', image.src);
    slide.appendChild(img);
    return slide;
}

function createPreviousControl(dom, slideNumber, slideCount) {
    const previous = dom.createElement('label');
    previous.setAttribute('for', `carousel-${slideNumber === 1 ? slideCount : slideNumber - 1}`);
    previous.setAttribute('class', `control-${slideNumber} ${controlCommonClasses} left-0 ml-2 md:ml-10`);
    previous.appendChild(createControlContent(dom, '<'));
    return previous;
}

function createNextControl(dom, slideNumber, slideCount) {
    const next = dom.createElement('label');
    next.setAttribute('for', `carousel-${slideNumber === slideCount ? 1 : slideNumber + 1}`);
    next.setAttribute('class', `next control-${slideNumber} ${controlCommonClasses} right-0 mr-2 md:mr-10`);
    next.appendChild(createControlContent(dom, '>'));
    return next;
}

function createControlContent(dom, contentText) {
    const content = dom.createElement('i');
    content.setAttribute('class', 'mt-3');
    content.appendChild(dom.createTextNode(contentText));
    return content;
}

function createIndicator(dom, slideNumber, indicators) {
    const indicator = dom.createElement('li');
    indicator.setAttribute('class', 'inline-block mr-3');

    const indicatorLabel = dom.createElement('label');
    indicatorLabel.setAttribute('for', `carousel-${slideNumber}`);
    indicatorLabel.setAttribute('class', `carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700`);
    const indicatorText = dom.createTextNode('•');
    indicatorLabel.appendChild(indicatorText);
    indicator.appendChild(indicatorLabel);
    indicators.appendChild(indicator);
}

function createStyle(dom, slideCount) {
    const style = dom.createElement('style');
    let styleContent = '';
    styleContent = appendControlsStyle(slideCount, styleContent);
    styleContent = appendIndicatorsStyle(slideCount, styleContent);
    styleContent += defaultStyle;
    style.appendChild(dom.createTextNode(styleContent));
    return style;
}

function appendControlsStyle(slideCount, styleContent) {
    let txt = [...Array(slideCount).keys()]
        .map(x => `#carousel-${x + 1}:checked~.control-${x + 1}`)
        .join(', ');
    txt += `{
        display: block
    }
    `;
    return styleContent += txt;
}

function appendIndicatorsStyle(slideCount, styleContent) {
    let txt = [...Array(slideCount).keys()]
        .map(x => `#carousel-${x + 1}:checked~.control-${x + 1}~.carousel-indicators li:nth-child(${x + 1}) .carousel-bullet`)
        .join(', ');
    txt += `{
        color: #2b6cb0;
    }`;
    return styleContent += txt;
}
