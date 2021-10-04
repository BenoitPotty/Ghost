const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class MiniRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('mini');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.appendBlock('content');
        return this.root;
    }
}

module.exports = new MiniRenderer();

