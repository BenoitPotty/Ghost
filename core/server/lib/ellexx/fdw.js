const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');
class FdwRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('fdw');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.addCardLink();
        this.appendBlock('sentence');
        return this.root;
    }
}

module.exports = new FdwRenderer();
