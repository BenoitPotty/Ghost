const _ = require('lodash');
const BaseMapGenerator = require('./base-generator');

class PostMapGenerator extends BaseMapGenerator {
    constructor(opts) {
        super();

        this.name = 'posts';

        _.extend(this, opts);
    }

    createPriorityNodeFromDatum(datum) {
        // Post priorty are between 0.4 and 0.7
        let priority = 0.5;

        if (datum.featured) {
            priority = 0.7;
        }

        return {priority};
    }

    createFrequencyNodeFromDatum(datum) {
        let frequency = 'never';

        if (!datum) {
            return;
        }

        return {frequency};
    }
}

module.exports = PostMapGenerator;
