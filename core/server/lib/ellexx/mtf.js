const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class MtfRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('mtf');
    }

    render({payload, env: {dom}}) {
        console.log(payload)
        this.initDom(dom);
        this.initData(payload);
        // this.addCardLink();
        // this.appendBlock('author');
        // this.appendBlock('quote');
        return this.root;
    }
}

module.exports = new MtfRenderer();
