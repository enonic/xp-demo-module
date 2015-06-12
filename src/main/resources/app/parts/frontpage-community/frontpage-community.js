var stk = require('/lib/stk/stk.js');
var utilities = require('/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var config = component.config;
    var linkUrl = config['linkUrl'];
    var linkPageKey = config['linkPage'];
    var linkText = config['linkText'] || null;
    var anchorContentKey = config['anchorContent'];

    var data = {};
    data.title = component.config['title'] || 'Part not configured';
    data.preface = component.config['preface'] || 'Part not configured';

    var params = {
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, anchorContentKey),
        linkText: linkText,
        data: data
    };

    var view = resolve('frontpage-community.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;