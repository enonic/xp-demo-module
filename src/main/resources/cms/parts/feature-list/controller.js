var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {

    var currentContent = execute('portal.getContent');

    var result = execute('content.getChildren', {
        key: currentContent._path,
        start: 0,
        count: 100,
        contentTypes: ['product-feature']
    });

    for (var i = 0; i < result.contents.length; i++) {
        var content = result.contents[i];

        content.data.bullets = stk.data.forceArray(content.data.bullets);
        content.data.bullets = stk.data.trimArray(content.data.bullets);

        content.data.images = stk.data.forceArray(content.data.images);
        content.data.images = stk.data.trimArray(content.data.images);

        result.contents[i] = content;
    }

    var params = {
        content: currentContent,
        features: result.contents
    };

    stk.log(params);

    var view = resolve('feature-list.html');
    return stk.view.render(view, params);


}

exports.get = handleGet;