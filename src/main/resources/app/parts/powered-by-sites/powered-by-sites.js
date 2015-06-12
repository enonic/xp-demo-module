var stk = require('/lib/stk/stk.js');

function handleGet(req) {
    var content = execute('portal.getContent');
    var component = execute('portal.getComponent');

    var contentLocation = component.config['contentLocation'] || content['_id'];

    var result = execute('content.getChildren', {
        key: contentLocation,
        start: 0,
        count: 100,
        contentTypes: [module.name + ':powered-by']
    });

    for (var i = 0; i < result.contents.length; i++) {
        result.contents[i].data['title'] = result.contents[i].displayName;
        stk.data.deleteEmptyProperties(result.contents[i].data);
    }

    var params = {
        sites: result.contents
    };

    var view = resolve('powered-by-sites.html');
    return stk.view.render(view, params);

}

exports.get = handleGet;