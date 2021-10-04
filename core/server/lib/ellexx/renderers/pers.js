const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class PersRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('pers');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom, payload.pers_type);
        this.initData(payload);
        const pictureBlock = this.appendBlock('picture');
        this.appendImage(payload.src, null, pictureBlock);
        const detailsBlock = this.appendBlock('details');
        this.appendBlock('name', detailsBlock);
        this.appendBlock('description', detailsBlock);
        return this.root;
    }
}

module.exports = new PersRenderer();

