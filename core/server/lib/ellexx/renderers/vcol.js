const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');
const mdRenderer = require('@tryghost/kg-markdown-html-renderer');
class VcolRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('vcol');
    }

    render({payload, env: {dom}}) {
        const endId = 'end';
        this.initDom(dom);
        this.initData(payload);
        this.appendBlock('title');
        this.appendBlock('subtitle');
        const itemsBlock = this.appendBlock('items', null, null);
        payload.items.sort((e1, e2) => e1.order - e2.order);
        payload.items.forEach((item) => {
            const itemBlock = this.appendBlock('item', itemsBlock);
            if (item.img_url) {
                const imgBlock = this.appendBlock('item-img', itemBlock);
                this.appendImage(item.img_url, '', imgBlock, 'sourceFileStack');
            }
            const contentBlock = this.appendBlock('item-content', itemBlock);
            this.appendBlock('item-title', contentBlock, item.title);
            this.appendRaw('item-content', contentBlock, mdRenderer.render(item.markdown));
            const goToEndBlock = this.appendBlock('item-go-to-end', itemBlock);
            const link = this.appendLink('link-go-to-end', goToEndBlock, `#${endId}`);
            this.appendSpan('text_to_end', link);
        });

        this.appendBlock('end').setAttribute('id', endId);

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

