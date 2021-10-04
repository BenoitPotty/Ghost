const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class VidRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('vid');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.appendYoutube(payload.html);
        return this.root;
    }
}

module.exports = new VidRenderer();
