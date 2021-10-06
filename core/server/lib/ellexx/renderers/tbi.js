const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class TbiRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('tbi');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom, payload.type);
        this.initData(payload);
        if (payload.type !== 'video') {
            this.addCardLink();
        }

        const imageWrapper = this.appendBlock('image');
        this.storeVideoId(imageWrapper, payload.tbi_video_link_code);
        if (payload.usage === 'product') {
            this.appendBlock('type', imageWrapper);
            this.appendBlock('text', imageWrapper);
        }
        const imageElement = this.appendImage(payload.src, payload.alt, imageWrapper);

        if (payload.type === 'video') {
            this.addCardLink();
        }

        this.appendBlock('text');
        this.appendIconSpan();

        if (payload.type === 'video') {
            this.storeVideoId(this.root, payload.tbi_video_link_code);
            this.storeVideoId(imageElement, payload.tbi_video_link_code);
            const iconElement = this.appendIconSpan('icon-video-play', imageWrapper);
            this.storeVideoId(iconElement, payload.tbi_video_link_code);
            const modalBlock = this.appendBlock('modal', this.root);
            this.storeVideoId(modalBlock, payload.tbi_video_link_code);
            const modalContent = this.appendBlock('modal-content', modalBlock);
            this.storeVideoId(modalContent, payload.tbi_video_link_code);
            const playerTarget = this.appendBlock('iframe', modalContent);
            playerTarget.setAttribute('id', `player-${payload.tbi_video_link_code}`);
            this.storeVideoId(playerTarget, payload.tbi_video_link_code);
        }
        return this.root;
    }

    storeVideoId(element, videoId) {
        element.setAttribute('data-video', videoId);
    }
}

module.exports = new TbiRenderer();

