const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

const en = {
    personality: 'Personality',
    background: 'Background',
    generosity_min: 'Sringy',
    generosity_max: 'Generous',
    type_min: 'Saver',
    type_max: 'Investor',
    assets_min: 'Saving account',
    assets_max: 'Action',
    payment_method_min: 'Cash',
    payment_method_max: 'Digital Payment',
    decision_min: 'Budget book',
    decision_max: 'Gut feeling',
    currency_min: 'Francs',
    currency_max: 'Bitcoin',
    age: 'Age',
    children: 'Children',
    location: 'Location',
    largest_expense_item: 'Largest expense item',
    income: 'Income',
    job: 'Job',
    debts: 'Debts',
    capital: 'Capital'
};

const de = {
    personality: 'Persönlichkeit',
    background: 'Hintergrund',
    generosity_min: 'Knauserig',
    generosity_max: 'Grosszügig',
    type_min: 'Sparer:in',
    type_max: 'Investor:in',
    assets_min: 'Sparkonto',
    assets_max: 'Aktien',
    payment_method_min: 'Cash',
    payment_method_max: 'Digital Payment',
    decision_min: 'Haushaltsbuch',
    decision_max: 'Bauchgefühl',
    currency_min: 'Franken',
    currency_max: 'Bitcoin',
    age: 'Alter',
    children: 'Kinder',
    location: 'Ort',
    largest_expense_item: 'Grösster Ausgabeposten',
    income: 'Einkommen',
    job: 'Beruf',
    debts: 'Schulden',
    capital: 'Vermögen'
};
class MtfRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('mtf');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        const personality = this.appendBlock('personality');
        this.appendBlock('personality_title', personality, this.getMultilangContent('personality'));
        this.appendPersonality('generosity', personality);
        this.appendPersonality('type', personality);
        this.appendPersonality('decision', personality);
        this.appendPersonality('payment_method', personality);
        this.appendPersonality('assets', personality);
        this.appendPersonality('currency', personality);
        const background = this.appendBlock('background');
        this.appendBlock('background_title', background, this.getMultilangContent('background'));
        this.appendBackground('age', background);
        this.appendBackground('children', background);
        this.appendBackground('location', background);
        this.appendBackground('job', background);
        this.appendBackground('income', background);
        this.appendBackground('debts', background);
        this.appendBackground('largest_expense_item', background);
        this.appendBackground('capital', background);
        return this.root;
    }

    appendPersonality(criteria, parent) {
        if (this.getData(`${criteria}_display`)) {
            const criteriaContainer = this.appendBlock(criteria, parent, '', 'mtf-personality_item');
            this.appendSliderLabel(criteria, 'min', criteriaContainer);
            this.appendSlider(criteria, criteriaContainer, 'mtf-personality_slider');
            this.appendSliderLabel(criteria, 'max', criteriaContainer);
        }
    }

    appendBackground(item, parent) {
        const itemValue = this.getData(item);
        if (itemValue) {
            const criteriaContainer = this.appendBlock(item, parent, '');
            this.appendSpan(`${item}_title`, criteriaContainer, `${this.getMultilangContent(item)}:`, 'mtf-background_label');
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
