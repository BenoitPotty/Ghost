
module.exports = function rokkaGallery(originalRenderer) {
    return function ({payload, env: {dom}, options}) {
        const gallery = originalRenderer({payload, env: {dom}, options});

        return gallery;
    };
};
