const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class ZitRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('zit');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.addCardLink();
        this.appendBlock('quote');
        this.appendBlock('author');
        return this.root;
    }
}

module.exports = new ZitRenderer();
