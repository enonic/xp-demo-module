var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var linkUrl = component.config['linkUrl'] ? component.config['linkUrl'] : 'https://enonic.com/support' ;

    var params = {
        component: component,
        linkUrl: linkUrl
    };


    var view = resolve('services-header.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;