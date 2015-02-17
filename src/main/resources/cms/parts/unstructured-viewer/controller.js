var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var content = execute('portal.getContent');
    var index = stk.data.isInt(req.params.index) ? parseInt(req.params.index) : 0;
    var numPerPage = stk.data.isInt(component.config.numPerPage) ? component.config.numPerPage : 10
    var total = 0;
    var contents = {};
    var nextUrl, previousUrl;

    // Folder picker to retrieve content from
    var folderKey = component.config['retrieveFolder'] || null;
    var retrieveFolder;
    if (folderKey) {
        var folder = execute('content.get', {
            key: folderKey
        });
        retrieveFolder = folder._path;
    }
    var retrieveLocation = retrieveFolder || '/enonic-com/inbox';

    /*var result = execute('content.query', {
        query: '_parentpath="/content/enonic-com/inbox"',
        start: index,
        count: numPerPage,
        contentTypes: [
            "base:unstructured"
        ],
    });*/

    var result = execute('content.getChildren', {
        key: retrieveLocation,
        start: index,
        count: numPerPage,
        sort: 'modifiedTime DESC'
    });

    if (result) {
        total = result.total;
        contents = result.contents;
        nextUrl = execute('portal.pageUrl', {
            path: content._path,
            params: {index: (parseInt(index) + parseInt(numPerPage)).toString()}
        });
        previousUrl = execute('portal.pageUrl', {
            path: content._path,
            params: {index: (index - numPerPage) < 0 ? '0' : index - numPerPage }
        });

        for (var i = 0; i < result.contents.length; i++) {
            stk.data.deleteEmptyProperties(result.contents[i].data);
        }
    }

    var params = {
        component: component,
        contents: contents,
        total: total,
        numPerPage: numPerPage,
        index: index,
        nextUrl: nextUrl,
        previousUrl: previousUrl
    };

    var view = resolve('unstructured-viewer.html');
    return stk.view.render(view, params);

}

exports.get = handleGet;