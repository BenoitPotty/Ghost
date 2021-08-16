const {
    htmlAbsoluteToRelative,
    htmlRelativeToAbsolute,
    htmlToTransformReady
} = require('@tryghost/url-utils/lib/utils');

module.exports = {
    name: 'zdt',
    type: 'dom',
    config: {
        commentWrapper: true
    },

    render({payload, env: {dom}}) {
        let root = dom.createElement('div');
        root.setAttribute('class', 'zdt');

        let tempRoot = root;
        if (payload.zdt_link) {
            const link = createLink(dom, payload.zdt_link);
            root.appendChild(link);
            tempRoot = link;
        }

        tempRoot.appendChild(createNumber(dom, payload.zdt_number));
        tempRoot.appendChild(createContent(dom, payload.zdt_content));
        tempRoot.appendChild(createSource(dom, payload.zdt_source));

        return root;
    },

    absoluteToRelative(payload, options) {
        payload.html = payload.html && htmlAbsoluteToRelative(payload.html, options.siteUrl, options);
        return payload;
    },

    relativeToAbsolute(payload, options) {
        payload.html = payload.html && htmlRelativeToAbsolute(payload.html, options.siteUrl, options.itemUrl, options);
        return payload;
    },

    toTransformReady(payload, options) {
        payload.html = payload.html && htmlToTransformReady(payload.html, options.siteUrl, options);
        return payload;
    }
};

function createLink(dom, link) {
    const linkElement = dom.createElement('a');
    linkElement.setAttribute('class', 'zdt-link');
    linkElement.setAttribute('href', link ? link : '#');
    return linkElement;
}

function createNumber(dom, number) {
    const numberElement = dom.createElement('h1');
    numberElement.setAttribute('class', 'zdt-number');
    if (number) {
        numberElement.appendChild(dom.createTextNode(number));
    }
    return numberElement;
}

function createContent(dom, content) {
    const contentElement = dom.createElement('div');
    contentElement.setAttribute('class', 'zdt-content');
    if (content) {
        contentElement.appendChild(dom.createTextNode(content));
    }
    return contentElement;
}

function createSource(dom, source) {
    const sourceElement = dom.createElement('div');
    sourceElement.setAttribute('class', 'zdt-source');
    if (source) {
        sourceElement.appendChild(dom.createTextNode(source));
    }
    return sourceElement;
}

