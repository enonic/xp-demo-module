var stk = require('/lib/stk/stk.js');

function handleGet(req) {
    var content = execute('portal.getContent');

    var result = execute('content.query', {
        query: "_parentpath = '/content" + content._path + "'",
        start: 0,
        count: 10,
        contentTypes: [module.name + ':case-study']
    });

    for (var i = 0; i < result.contents.length; i++) {
        stk.data.deleteEmptyProperties(result.contents[i].data);
    }

    var params = {
        caseStudies: result.contents
    };

    var view = resolve('case-study-list.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;