const {
    htmlAbsoluteToRelative,
    htmlRelativeToAbsolute,
    htmlToTransformReady
} = require('@tryghost/url-utils/lib/utils');
const cheerio = require('cheerio');
const rokkaUtils = require('../image/rokka-utils');
const config = require('../../../shared/config');
class EllexxCardBaseRenderer {
    constructor(name) {
        this.name = name;
        this.type = 'dom';
        this.config = {
            commentWrapper: true
        };
        this.root = undefined;
        this.dom = undefined;
        this.entryPoint = undefined;
        this.data = {};
    }

    initDom(dom) {
        this.dom = dom;
        this.renderRootNode();
    }

    initData(data) {
        this.data = data;
    }

    getData(key) {
        return this.data[`${this.name}_${key}`];
    }

    getClassName(key) {
        return `${this.name}-${key}`;
    }

    renderRootNode() {
        this.root = this.dom.createElement('div');
        this.root.setAttribute('class', this.name);
        this.entryPoint = this.root;
    }

    addCardLink(link = null) {
        let key = 'link';
        if (link === null) {
            link = this.getData(key);
        }

        if (link) {
            const linkElement = this.dom.createElement('a');
            linkElement.setAttribute('class', this.getClassName(key));
            linkElement.setAttribute('href', link);
            if (isExternalLink(link)) {
                linkElement.setAttribute('target', '_blank');
            }
            this.entryPoint.appendChild(linkElement);
            this.entryPoint = linkElement;
        }
    }

    appendBlock(blockName, parent = null, content = null, classes = null) {
        if (content === null) {
            content = this.getData(blockName);
        }
        const blockElement = this.dom.createElement('div');
        blockElement.setAttribute('class', classes ? `${this.getClassName(blockName)} ${classes}` : this.getClassName(blockName));
        if (content) {
            blockElement.appendChild(this.dom.createTextNode(content));
        }
        if (parent) {
            parent.appendChild(blockElement);
        } else {
            this.entryPoint.appendChild(blockElement);
        }
        return blockElement;
    }

    appendSlider(blockName, parent = null, classes = null) {
        const value = this.getData(blockName);
        const blockElement = this.dom.createElement('input');
        blockElement.setAttribute('type', 'range');
        blockElement.setAttribute('min', 0);
        blockElement.setAttribute('max', 10);
        blockElement.setAttribute('value', value);
        blockElement.setAttribute('disabled');
        blockElement.setAttribute('class', classes ? `${this.getClassName(blockName)} ${classes}` : this.getClassName(blockName));

        if (parent) {
            parent.appendChild(blockElement);
        } else {
            this.entryPoint.appendChild(blockElement);
        }
        return blockElement;
    }

    appendIconSpan() {
        const goToIcon = this.dom.createElement('span');
        goToIcon.setAttribute('class', 'icon-cta');
        this.appendNode(goToIcon);
    }

    appendYoutube(html) {
        const youtubeHtml = cheerio.load(html)('iframe');
        const iframe = this.dom.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('src', enrichYoutubeUrl(youtubeHtml.attr('src')));
        iframe.setAttribute('frameborder', youtubeHtml.attr('frameborder'));
        iframe.setAttribute('allow', youtubeHtml.attr('allow'));
        iframe.setAttribute('allowfullscreen', youtubeHtml.attr('allowfullscreen'));
        this.entryPoint.appendChild(iframe);
        return iframe;
    }

    appendNode(node) {
        if (!node) {
            return;
        }
        this.entryPoint.appendChild(node);
    }

    appendImage(src, alt, parent) {
        if (!src) {
            return;
        }
        const imgElement = this.dom.createElement('img');
        rokkaUtils.copyAttributes(src, alt, imgElement);
        if (parent) {
            parent.appendChild(imgElement);
        } else {
            this.entryPoint.appendChild(imgElement);
        }
        return imgElement;
    }

    absoluteToRelative(payload, options) {
        payload.html = payload.html && htmlAbsoluteToRelative(payload.html, options.siteUrl, options);
        return payload;
    }

    relativeToAbsolute(payload, options) {
        payload.html = payload.html && htmlRelativeToAbsolute(payload.html, options.siteUrl, options.itemUrl, options);
        return payload;
    }

    toTransformReady(payload, options) {
        payload.html = payload.html && htmlToTransformReady(payload.html, options.siteUrl, options);
        return payload;
    }
}

function enrichYoutubeUrl(url) {
    return `${url}&modestbranding=1`;
}

function isExternalLink(link) {
    return !link.startsWith(config.getSiteUrl());
}

module.exports = EllexxCardBaseRenderer;
