var stk = require('/cms/lib/stk/stk.js');
var utilities = require('/cms/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var config = component.config;
    var heading = config.heading ? config.heading : 'Works with the tools you already love';
    var text = config.text ? config.text : 'That is why we focus on building the best platform for digital experiences - and make it easy to integrate with your favorite tools.';
    var linkUrl = config.linkUrl;
    var defaultLinkUrl = 'https://enonic.com/features';
    var linkPageKey = config.linkPage;
    var linkText = config.linkText ? config.linkText : 'Explore our 3rd party integrations';

    stk.log(config);

    var params = {
        config: config,
        heading: heading,
        text: text,
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, defaultLinkUrl),
        linkText: linkText,
    };

    var view = resolve('frontpage-tools.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;