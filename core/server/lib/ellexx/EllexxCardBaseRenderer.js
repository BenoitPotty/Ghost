const {
    htmlAbsoluteToRelative,
    htmlRelativeToAbsolute,
    htmlToTransformReady
} = require('@tryghost/url-utils/lib/utils');

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

    addCardLink() {
        let key = 'link';
        let link = this.getData(key);
        if (link) {
            const linkElement = this.dom.createElement('a');
            linkElement.setAttribute('class', this.getClassName(key));
            linkElement.setAttribute('href', link);
            this.entryPoint.appendChild(linkElement);
            this.entryPoint = linkElement;
        }
    }

    appendBlock(blockName, parent = undefined) {
        let content = this.getData(blockName);
        const blockElement = this.dom.createElement('div');
        blockElement.setAttribute('class', this.getClassName(blockName));
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

module.exports = EllexxCardBaseRenderer;
