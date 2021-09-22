const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class TsbRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('tsb');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.addCardLink();
        // this.appendBlock('number', null, null, payload.zdt_number.length > 4 ? 'content-xl' : '');
        // this.appendBlock('content');
        // this.appendBlock('source');
        return this.root;
    }
}

module.exports = new TsbRenderer();

