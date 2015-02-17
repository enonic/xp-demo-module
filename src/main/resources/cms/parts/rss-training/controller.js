var stk = require('/cms/lib/stk/stk.js');
var utilities = require('/cms/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var config = component.config;
    var text = config['text'];
    var linkUrl = config['linkUrl'];
    var defaultLinkUrl = 'https://enonic.com/academy';
    var linkPageKey = config['linkPage'];
    var linkText = config['linkText'] ? config['linkText'] : 'Visit the Enonic Academy';


    var params = {
        config: config,
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, defaultLinkUrl),
        linkText: linkText,

    };

    var view = resolve('rss-training.html');
    /*return {
        body: execute('xstl.render', {
            view: view,
            model: params
        }),
        contentType: 'text/html'
    };*/
    return stk.view.render(view, params);
}

exports.get = handleGet;