var stk = require('/cms/lib/stk/stk.js');
var utilities = require('/cms/lib/utilities.js');

function handleGet(req) {

    var content = execute('portal.getContent');
    var component = execute('portal.getComponent');
    var config = component.config;
    var linkPageKey = config.linkPage;
    var linkUrl = config.linkUrl;
    var defaultLinkUrl = 'https://enonoic.com/community';
    var videos = config.videos;

    //If there is only one video then make it an array.
    videos = stk.data.forceArray(videos);

    var params = {
        heading: config.heading,
        // Check for an actual value in the first video to prevent problems when somebody saves the page without values in the form.
        videos: videos && videos[0] && videos[0].title != '' ? videos : [],
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, defaultLinkUrl),
        linkText: config.linkText ? config.linkText : 'Visit our community site for more information'
    };


    var view = resolve('video-list.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;