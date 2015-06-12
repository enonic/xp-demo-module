var stk = require('/lib/stk/stk.js');
var utilities = require('/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var config = component.config;
    var heading = config.heading ? config.heading : 'High performance - extreme scalability';
    var text = config.text ? config.text : 'Enonic eXperience Platform is designed to scale with your operations; from a single site to thousands, from hundreds of content items to millions, from low traffic to billions of impressions.';
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

    var view = resolve('frontpage-scalability.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;