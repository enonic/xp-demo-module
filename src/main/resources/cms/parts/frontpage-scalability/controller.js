var stk = require('/cms/lib/stk/stk.js');
var utilities = require('/cms/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var config = component.config;
    var heading = config.heading ? config.heading : 'High performance - extreme scalability';
    var text = config.text ? config.text : 'Enonic eXperience Platform is designed to scale with your operations; from a single site to thousands, from hundreds of content items to millions, from low traffic to billions of impressions.';
    var linkUrl = config.linkUrl;
    var defaultLinkUrl = 'https://enonic.com/case-studies';
    var linkPageKey = config.linkPage;
    var linkText = config.linkText ? config.linkText : 'Browse our case studies';

    var params = {
        config: config,
        heading: heading,
        text: text,
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, defaultLinkUrl),
        linkText: linkText,
    };

    var view = resolve('frontpage-scalability.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;