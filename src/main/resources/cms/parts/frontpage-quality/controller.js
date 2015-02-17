var stk = require('/cms/lib/stk/stk.js');
var utilities = require('/cms/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var config = component.config;
    var linkUrl = config['linkUrl'];
    var defaultLinkUrl = 'https://enonic.com/case-studies';
    var linkPageKey = config['linkPage'];
    var linkText = config['linkText'] ? config['linkText'] : 'Read our case studies';

    var params = {
        config: config,
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, defaultLinkUrl),
        linkText: linkText,

    };

    var view = resolve('frontpage-quality.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;