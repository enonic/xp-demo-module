var stk = require('/lib/stk/stk.js');

function handleGet(req) {
    var component = execute('portal.getComponent');

    var params = {
        context: req,
        component: component,
        'copyright': component.config.copyright
    };

    var view = resolve('video-banner.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;