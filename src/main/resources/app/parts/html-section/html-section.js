var stk = require('/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');

    stk.log(component);


    var params = {
        config: component.config
    };

    var view = resolve('html-section.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;