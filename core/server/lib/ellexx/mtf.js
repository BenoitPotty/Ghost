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
        this.appendBlock('personality-title', personality, this.getMultilangContent('personality'));
        this.appendPersonality('generosity', personality);
        this.appendPersonality('assets', personality);
        this.appendPersonality('decision', personality);
        this.appendPersonality('currency', personality);
        const background = this.appendBlock('background');
        this.appendBlock('backgroud-title', background, this.getMultilangContent('background'));
        this.appendBackground('age', background);
        this.appendBackground('children', background);
        this.appendBackground('location', background);
        this.appendBackground('largest_expense_item', background);
        this.appendBackground('income', background);
        return this.root;
    }

    appendPersonality(criteria, parent) {
        if (this.getData(`${criteria}_display`)) {
            const criteriaContainer = this.appendBlock(criteria, parent, '');
            this.appendSliderLabel(criteria, 'min', criteriaContainer);
            this.appendSlider(criteria, criteriaContainer, 'mtf-personality_slider');
            this.appendSliderLabel(criteria, 'max', criteriaContainer);
        }
    }

    appendBackground(item, parent) {
        const itemValue = this.getData(item);
        if (itemValue) {
            const criteriaContainer = this.appendBlock(item, parent, '');
            this.appendSpan(`${item}_title`, criteriaContainer, this.getMultilangContent(item), 'mtf-background_label');
            this.appendSpan(`${item}_value`, criteriaContainer, itemValue, 'mtf-background_value');
        }
    }

    appendSliderLabel(criteria, suffix, parent) {
        const label = `${criteria}_${suffix}`;
        this.appendSpan(label , parent, this.getMultilangContent(label), `mtf-personality_label_${suffix}`);
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
