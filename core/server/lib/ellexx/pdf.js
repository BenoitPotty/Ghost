const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');
const activeStorageConfig = require('../../../ellexx/helpers/active_storage_config')();
class PdfRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('pdf');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        this.addCardLink(this.covertUrlToSourceFile(payload.src));
        this.appendIconSpan('icon-pdf');
        this.appendSpan('caption', null, this.ensureCaption(payload.caption, payload.src));

        return this.root;
    }

    covertUrlToSourceFile(src) {
        if (!src) {
            return src;
        } else {
            return src.replace(activeStorageConfig.defaultStack, activeStorageConfig.sourceFileStack);
        }
    }

    ensureCaption(caption, url) {
        if (caption) {
            return caption;
        } else {
            if (!url) {
                return 'undefined';
            }
            return url.match(/([^/]+)(?=\.\w+$)/)[0];
        }
    }
}

module.exports = new PdfRenderer();
