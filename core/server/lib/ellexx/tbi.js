const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class TbiRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('tbi');
    }

    render({payload, env: {dom}}) {
        console.dir(payload);
        this.initDom(dom, payload.type);
        this.initData(payload);
        this.addCardLink();
        const imageWrapper = this.appendBlock('image');
        this.appendImage(payload.src, payload.alt, imageWrapper);
        this.appendBlock('text');
        this.appendIconSpan();
        if (payload.type === 'video') {
            const modalBlock = this.appendBlock('modal');
            this.appendYoutube(this.getYoutubeHtml(payload.tbi_video_link_code), modalBlock, false);
        }
        return this.root;
    }

    getYoutubeHtml(videoCode) {
        return `<iframe src="https://www.youtube.com/embed/${videoCode}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
}

module.exports = new TbiRenderer();

