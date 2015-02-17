var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var postUrl = execute('portal.componentUrl', {
        component: component.path
    });
    var params = {
        component: component,
        postUrl: postUrl
    };
    stk.log(params);

    if (req.params.fisk) {
        var result = execute('content.create', {
            name: 'mycontent5',
            parentPath: '/enonic-com/',
            displayName: 'City',
            draft: true,
            contentType: module.name + ':testcontenttype',
            data: { fisk: req.params.fisk }
        });

        log.info('Content created with id ' + result._id);
    }

    return {
        body: execute('thymeleaf.render', {
            view: resolve('form.html'),
            model: params
        })
    };
}

function handlePost(req) {

    stk.log(req);

    if (req.formParams.fisk) {
        var result = execute('content.create', {
            name: 'mycontent5',
            parentPath: '/enonic-com/',
            displayName: 'City',
            draft: true,
            contentType: module.name + ':testcontenttype',
            data: { fisk: req.formParams.fisk }
        });

        log.info('Content created with id ' + result._id);
    }
    var component = execute('portal.getComponent');

    var params = {
        component: component
    };

    return {
        redirect: execute('portal.pageUrl', {

            path: '/enonic-com/_templates/try-now',
            params: {
                submitted: 'ok'
            }
        })
        /*body: execute('thymeleaf.render', {
            view: resolve('post.html'),
            model: params
        })*/
    };
}

exports.get = handleGet;
exports.post = handlePost;

