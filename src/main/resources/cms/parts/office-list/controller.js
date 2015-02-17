var stk = require('/cms/lib/stk/stk');

function handleGet(req) {

    var content = execute('portal.getContent');
    var offices = new Array();
    var result;

    if (content.type == module.name + ':office') {
        offices.push(content.data)
    } else {
        result = execute('content.query', {
            start: 0,
            count: 3,
            sort: '_modifiedTime ASC',
            contentTypes: [
                module.name + ':office'
            ]
        });
        for (var i = 0; i < result.contents.length; i++) {
            stk.data.deleteEmptyProperties(result.contents[i].data);
            result.contents[i].data['title'] = result.contents[i].displayName;
            offices.push(result.contents[i].data);
        }
    }

    var params = {
        offices: offices
    };

    stk.log(params);

    var view = resolve('office-list.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;