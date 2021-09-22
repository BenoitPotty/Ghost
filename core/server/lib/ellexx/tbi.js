const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class TbiRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('tbi');
    }

    render({payload, env: {dom}}) {
        console.dir(payload);
        this.initDom(dom);
        this.initData(payload);
        this.addCardLink();
        // this.appendBlock('number', null, null, payload.zdt_number.length > 4 ? 'content-xl' : '');
        // this.appendBlock('content');
        // this.appendBlock('source');
        return this.root;
    }
}

module.exports = new TbiRenderer();

