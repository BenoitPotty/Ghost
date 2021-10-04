const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class OutlookRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('outlook');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        const headerBlock = this.appendBlock('header');
        this.appendIconSpan('outlook-cta', headerBlock);
        this.appendSpan('title', headerBlock);
        this.appendBlock('text');
        const ctaBlock = this.appendBlock('cta');
        const ctaLink = this.appendLink('cta_link', ctaBlock, payload.outlook_cta_link);
        this.appendSpan('cta_text', ctaLink);
        return this.root;
    }
}

module.exports = new OutlookRenderer();

