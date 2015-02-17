var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {
    var component = execute('portal.getComponent');
    var buyPageKey = component.config['buyPage'];

    var params = {
        buyPageKey: buyPageKey
    };

    var view = resolve('pricing.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;