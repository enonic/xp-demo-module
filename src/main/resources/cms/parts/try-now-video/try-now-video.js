var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {
    var component = execute('portal.getComponent');

    //var heading = component.config['heading'] || [];
    var heading = component.config['heading'] || 'Try now';
    var text = component.config['text'] || 'Part is not configured';
    var videoId = component.config['video-id'] || null;

    var params = {
        component: component,
        heading: heading,
        text: text,
        videoId: videoId
    };

    var view = resolve('try-now-video.html');
    return stk.view.render(view, params);
}


exports.get = handleGet;