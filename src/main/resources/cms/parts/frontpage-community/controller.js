var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');


    var params = {
        config: component.config
    };

    var view = resolve('frontpage-community.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;