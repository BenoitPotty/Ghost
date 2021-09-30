const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');
const markdownRenderer = require('@tryghost/kg-default-cards/lib/cards/markdown');

class MdhRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('mdh');
    }

    render({payload, env: {dom}, options}) {
        this.initDom(dom);
        this.initData(payload);
        this.entryPoint.appendChild(markdownRenderer.render({payload, env: {dom}, options}));
        return this.root;
    }
}

module.exports = new MdhRenderer();
