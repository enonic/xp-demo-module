var stk = require('/lib/stk/stk.js');

// Module specific utilities, not suitable for STK

/**
 * Returns URL for a selected page, unless a hardcoded external URL is passed. Returns default URL if no page or link. Used on all parts
 * with page picker for a link.
 * @param {Content} content key of the selected landing page, if one was selected. config['linkPage']
 * @param {String} Hardcoded URL for external link. Overrides the page.
 * @param {Content} Content key of link anchor content.
 * @return {String} Returns the URL
 */
exports.getLinkUrl = function(contentKey, url, anchorContentKey) {
    var returnUrl = null;

    if (url) {
        returnUrl = url;
    }
    else if (contentKey) {
        var result = execute('content.get', {
           key: contentKey
        });
        if (result) {
            returnUrl = execute('portal.pageUrl', {
               path: result._path
            });
            if (anchorContentKey) {
                var anchor = exports.getContentAnchor(anchorContentKey);
                returnUrl += anchor ? '#' + anchor : null;
            }
        }
    }
    return returnUrl;
};

exports.getContentAnchor = function(contentKey) {
    return stk.content.getProperty(contentKey, '_name');
};