var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');

    var result = execute('portal.getContent');

    stk.data.deleteEmptyProperties(result.data);


    var params = {
        context: req,
        component: component,
        caseStudy: result.data
    };

    var view = resolve('case-study-show.html');
    return stk.view.render(view, params);


}

exports.get = handleGet;