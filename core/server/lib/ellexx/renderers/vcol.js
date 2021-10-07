const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');
const mdRenderer = require('@tryghost/kg-markdown-html-renderer');
class VcolRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('vcol');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.appendBlock('title');
        this.appendBlock('subtitle');
        const itemsBlock = this.appendBlock('items', null, null);

        payload.items.forEach((item) => {
            const itemBlock = this.appendBlock('item', itemsBlock);
            this.appendBlock('item-title', itemBlock, item.title);
            this.appendRaw('item-content', itemBlock, mdRenderer.render(item.markdown));
            this.appendBlock('item-go-to-end', itemBlock, payload.vcol_text_to_end);
        });

        if (payload.vcol_generate_summary) {
            const summaryBlock = this.appendBlock('summary', null, null);
            this.appendContent('h2', 'summary_title', summaryBlock, payload.vcol_summary_title);
            payload.items.forEach((item) => {
                this.appendBlock('item-title', summaryBlock, item.title);
                this.appendRaw('item-content', summaryBlock, mdRenderer.render(item.markdown));
            });
        }

        return this.root;
    }
}

module.exports = new VcolRenderer();

