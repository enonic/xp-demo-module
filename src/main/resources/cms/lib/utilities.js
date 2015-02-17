// Module specific utilities, not suitable for STK

/**
 * Returns URL for a selected page, unless a hardcoded external URL is passed. Returns default URL if no page or link. Used on all parts
 * with page picker for a link.
 * @param {Content} content key of the selected landing page, if one was selected. config['linkPage']
 * @param {String} Hardcoded URL for external link. Overrides the page.
 * @param {String} Default URL will be used if no page or link.
 * @return {String} Returns the URL
 */
exports.getLinkUrl = function(page, link, defaultLinkUrl) {
    var url = defaultLinkUrl;

    if (link) {
        url = link;
    } else if (page) {
        var result = execute('content.get', {
           key: page
        });
        if (result) {
            url = execute('portal.pageUrl', {
               path: result._path
            });
        }
    }
    return url;
};