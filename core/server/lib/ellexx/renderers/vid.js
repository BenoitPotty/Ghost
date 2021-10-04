const EllexxCardBaseRenderer = require('./EllexxCardBaseRenderer');

class VidRenderer extends EllexxCardBaseRenderer {
    constructor() {
        super('vid');
    }

    render({payload, env: {dom}}) {
        this.initDom(dom);
        this.initData(payload);
        console.log(payload)
        this.appendYoutube(`https://youtube.com/embed/${payload.vid_video_link_code}`);
        return this.root;
    }
}

module.exports = new VidRenderer();
