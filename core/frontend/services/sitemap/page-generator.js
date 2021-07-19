const _ = require('lodash');
const BaseMapGenerator = require('./base-generator');

class PageMapGenerator extends BaseMapGenerator {
    constructor(opts) {
        super();

        this.name = 'pages';

        _.extend(this, opts);
    }

    createPriorityNodeFromDatum(datum) {
        // Page priorty are between 0.8 and 1
        let priority = 0.8;

        if (datum.featured) {
            priority = 1;
        }

        return {priority};
    }
}

module.exports = PageMapGenerator;
