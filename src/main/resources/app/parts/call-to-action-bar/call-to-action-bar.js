var stk = require('/lib/stk/stk.js');
var util = require('/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent'); // Get information about the part component
    var config = component.config; // Get the config values from the part

    // Get the link info and force it to an array if there is only one result so it won't break the page
    var links = config.link ? stk.data.forceArray(config.link) : [];
    links = stk.data.trimArray(links);

    // Use the utility function to create the page URL or the external URL or set a default URL if neither is set.
    for(var i = 0; i < links.length; i++) {
        links[i].link = util.getLinkUrl(links[i].linkPage, links[i].linkUrl);
    }

    var params = {
        links: links
    };

    var view = resolve('call-to-action-bar.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;