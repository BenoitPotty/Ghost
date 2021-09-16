const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

const en = {
    personality: 'Personality',
    background: 'Background',
    generosity_min: 'Sringy',
    generosity_max: 'Generous',
    assets_min: 'Saving account',
    assets_max: 'Action',
    decision_min: 'Budget book',
    decision_max: 'Gut feeling',
    currency_min: 'Francs',
    currency_max: 'Bitcoin',
    age: 'Age',
    children: 'Children',
    location: 'Location',
    largest_expense_item: 'Largest expense item',
    income: 'Income'
};

const de = {
    personality: 'Persönlichkeit',
    background: 'Hintergrund',
    generosity_min: 'Knauserig',
    generosity_max: 'Grosszügig',
    assets_min: 'Sparkonto',
    assets_max: 'Aktion',
    decision_min: 'Haushaltsbuch',
    decision_max: 'Bauchgefühl',
    currency_min: 'Franken',
    currency_max: 'Bitcoin',
    age: 'Alter',
    children: 'Kinder',
    location: 'Ort',
    largest_expense_item: 'Ausgabeposten',
    income: 'Einkommen'
};
class MtfRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('mtf');
    }

    render({payload, env: {dom}}) {
        console.log(payload)
        this.initDom(dom);
        this.initData(payload);
        const personality = this.appendBlock('personality');
        this.appendBlock('personality_title', personality, this.getMultilangContent('personality'));
        this.appendPersonality('generosity', personality);
        this.appendPersonality('assets', personality);
        this.appendPersonality('decision', personality);
        this.appendPersonality('currency', personality);
        return this.root;
    }

    appendPersonality(criteria, parent) {
        if (this.getData(`${criteria}_display`)) {
            const criteriaContainer = this.appendBlock(criteria, parent, '');
            this.appendSliderLabel(criteria, 'min', criteriaContainer);
            this.appendSlider(criteria, criteriaContainer);
            this.appendSliderLabel(criteria, 'max', criteriaContainer);
        }
    }

    appendSliderLabel(criteria, suffix, parent) {
        const label = `${criteria}_${suffix}`;
        this.appendSpan(label , parent, this.getMultilangContent(label));
    }

    getMultilangContent(label) {
        if (this.getData('lang') === 'en') {
            return en[label];
        } else {
            return de[label];
        }
    }
}

module.exports = new MtfRenderer();
