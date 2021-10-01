const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');
const activeStorageConfig = require('../../../ellexx/helpers/active_storage_config')();
const config = require('../../../shared/config');

const de = {
    lang: 'de',
    availablility: 'Nur für elleXX Member verfügbar',
    link_text: 'Werde Member'
};
const en = {
    lang: 'en',
    availablility: 'Only available for elleXX Members',
    link_text: 'Become a member'
};
class PdfRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('pdf');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom, payload.pdf_visibility);
        this.initData(payload);
        this.addCardLink(this.covertUrlToSourceFile(payload.src));
        this.appendIconSpan('icon-pdf');
        this.appendSpan('caption', null, this.ensureCaption(payload.caption, payload.src));
        const registerContainer = this.appendBlock('register-container', this.root);
        this._generaterMembership(registerContainer, de);
        this._generaterMembership(registerContainer, en);
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


    _generaterMembership(parent, langConfig) {
        const langBlock = this.appendBlock(`register-${langConfig.lang}`, parent);
        this.appendSpan(`document-availability`, langBlock, langConfig.availablility);
        const link = this.appendLink('membership-link', langBlock, `${config.getSiteUrl()}${langConfig.lang}/membership`);
        this.appendSpan('membership-text', link, langConfig.link_text);
    }
}

module.exports = new PdfRenderer();
