var stk = require('/lib/stk/stk.js');

function handleGet(req) {
    var content = execute('portal.getContent');

    var params = {
        data: content.data
    };

    var view = resolve('unstructured-viewer.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;