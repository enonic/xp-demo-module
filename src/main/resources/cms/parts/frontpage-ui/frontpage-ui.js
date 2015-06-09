var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var data = {};
    data.title = component.config['title'] || 'Part not configured';
    data.preface = component.config['preface'] || 'Part not configured';
    data.youtubeId = component.config['youtubeId'] || null;


    var params = {
        data: data
    };

    var view = resolve('frontpage-ui.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;