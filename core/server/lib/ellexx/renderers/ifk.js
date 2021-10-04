const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class IfkRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('ifk');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.addCardLink(payload.href);
        const imageWrapper = this.appendBlock('content');
        this.appendImage(payload.src, payload.alt, imageWrapper);
        this.appendBlock('caption', null, payload.caption);
        return this.root;
    }
}

module.exports = new IfkRenderer();
