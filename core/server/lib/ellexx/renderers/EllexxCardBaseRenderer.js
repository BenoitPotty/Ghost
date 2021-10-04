const {
    htmlAbsoluteToRelative,
    htmlRelativeToAbsolute,
    htmlToTransformReady
} = require('@tryghost/url-utils/lib/utils');
const rokkaUtils = require('../rokka-utils');
const config = require('../../../../shared/config');
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

    initDom(dom, classes) {
        this.dom = dom;
        this.renderRootNode(classes);
    }

    initData(data) {
        this.data = data;
    }

    getData(key) {
        return this.data[`${this.name}_${key}`];
    }

    getClassName(key, suffix = null) {
        if (!suffix) {
            return `${this.name}-${key}`;
        } else {
            return `${this.name}-${key}_${suffix}`;
        }
    }

    renderRootNode(classes) {
        this.root = this.dom.createElement('div');
        this.root.setAttribute('class', classes ? `${this.name} ${classes}` : this.name);
        this.entryPoint = this.root;
    }

    addCardLink(link = null) {
        let key = 'link';
        if (link === null) {
            link = this.getData(key);
        }

        if (link) {
            const linkElement = this.appendLink(key, this.entryPoint, link);
            this.entryPoint = linkElement;
        }
    }

    appendLink(name, parent, link){
        const linkElement = this.dom.createElement('a');
        linkElement.setAttribute('class', this.getClassName(name));
        linkElement.setAttribute('href', link);
        if (isExternalLink(link)) {
            linkElement.setAttribute('target', '_blank');
        }
        this.appendNode(linkElement, parent);
        return linkElement;
    }

    appendBlock(blockName, parent = null, content = null, classes = null) {
        return this.appendContent('div', blockName, parent, content, classes);
    }

    appendSpan(blockName, parent = null, content = null, classes = null) {
        return this.appendContent('span', blockName, parent, content, classes);
    }

    appendContent(type, blockName, parent, content, classes){
        if (content === null) {
            content = this.getData(blockName);
        }
        const blockElement = this.dom.createElement(type);
        blockElement.setAttribute('class', classes ? `${this.getClassName(blockName)} ${classes}` : this.getClassName(blockName));
        if (content) {
            blockElement.appendChild(this.dom.createTextNode(content));
        }
        this.appendNode(blockElement, parent);
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
        blockElement.setAttribute('class', classes ? `${this.getClassName(blockName, 'value')} ${classes}` : this.getClassName(blockName, 'value'));
        this.appendNode(blockElement, parent);
        return blockElement;
    }

    appendIconSpan(iconName = 'icon-cta', parent) {
        const iconElement = this.dom.createElement('span');
        iconElement.setAttribute('class', iconName);
        this.appendNode(iconElement, parent);
        return iconElement;
    }

    appendYoutube(src, parent = null) {
        const iframe = this.dom.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('src', src);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen');
        this.appendNode(iframe, parent);
        return iframe;
    }

    appendNode(node, parent = null) {
        if (!node) {
            return;
        }
        if (parent){
            parent.appendChild(node);
        } else {
            this.entryPoint.appendChild(node);
        }
    }

    appendImage(src, alt, parent) {
        if (!src) {
            return;
        }
        const imgElement = this.dom.createElement('img');
        rokkaUtils.copyAttributes(src, alt, imgElement);
        this.appendNode(imgElement, parent);
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
