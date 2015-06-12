var stk = require('/lib/stk/stk.js');
var utilities = require('/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var config = component.config;
    var heading = config.heading ? config.heading : 'Works with the tools you already love';
    var text = config.text ? config.text : 'That is why we focus on building the best platform for digital experiences - and make it easy to integrate with your favorite tools.';
    var linkUrl = config.linkUrl;
    var linkPageKey = config.linkPage;
    var linkText = config.linkText || null;
    var anchorContentKey = config['anchorContent'];

    var params = {
        config: config,
        heading: heading,
        text: text,
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, anchorContentKey),
        linkText: linkText
    };

    var view = resolve('frontpage-tools.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;