const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class ZitRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('lnk');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.addCardLink();
        this.appendBlock('source');
        this.appendBlock('title');
        this.appendIconSpan();

        return this.root;
    }
}

module.exports = new ZitRenderer();
