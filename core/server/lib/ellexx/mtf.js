const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class MtfRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('mtf');
    }

    render({payload, env: {dom}}) {
        console.log(payload)
        this.initDom(dom);
        this.initData(payload);
        const mtf = this.appendBlock('personality');
        this.displayPersonality('generosity', mtf);
        this.displayPersonality('assets', mtf);
        this.displayPersonality('decision', mtf);
        this.displayPersonality('currency', mtf);
        return this.root;
    }

    displayPersonality(criteria, parent) {
        const criteriaContainer = this.appendBlock(criteria, parent, '');
        if (this.getData(`${criteria}_display`)) {
            this.appendSlider(criteria, criteriaContainer);
        }
    }
}

module.exports = new MtfRenderer();
