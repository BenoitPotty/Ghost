const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class MnfRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('mnf');
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

module.exports = new MnfRenderer();
