var stk = require('/cms/lib/stk/stk.js');

function buildParams(req, urlParam) {
    var component = execute('portal.getComponent');
    var urlParams = urlParam ? urlParam : req.params;
    var postUrl = execute('portal.componentUrl', {
        component: component.path
    });

    var data = {
        textBelowForm: component.config['textBelowForm'] || 'Push Send and we will send you an email with details you need to download.',
        thankYou: component.config['thankYou'] || 'Thank you! Check your email for details you need to experience the cloud demo.',
        communityVersion: component.config['communityVersion'] || 'Or <a href="#t-Download-now">download the free community version.</a>',
        description: component.config['description'] || 'No registration, no expiration - requires java.<br/> Download takes 2-5 minutes.'
    };

    return {
        component: component,
        urlParams: urlParams,
        postUrl: postUrl,
        data: data
    }
};

function handleGet(req) {
    var view = resolve('download.html');
    var content = execute('portal.getContent');
    var params = buildParams(req);

    return {
        body: execute('thymeleaf.render', {
            view: view,
            model: params
        }),
        contentType: 'text/html'
    };
}

function handlePost(req) {
    var view = resolve('download.html');
    var p = req.formParams;
    var contentCreated = null;
    var content = execute('portal.getContent');
    var component = execute('portal.getComponent');
    var folderKey = component.config['saveFolder'] || null;
    var saveFolder;
    if (folderKey) {
        var folder = execute('content.get', {
            key: folderKey
        });
        saveFolder = folder._path;
    }
    var saveLocation = saveFolder ? saveFolder : content._path;

    // Check required fields and create content
    if (p['cloud-register-name'] && p['cloud-register-phone'] && p['cloud-register-email']) {
        var result = execute('content.create', {
            name: p['form'] + ' ' + p['cloud-register-name'],
            //parentPath: content._path,
            parentPath: saveLocation,
            displayName: p['cloud-register-name'],
            draft: false,
            contentType: 'base:unstructured',
            data: {
                form: p['form'],
                name: p['cloud-register-name'],
                phone: p['cloud-register-phone'],
                email: p['cloud-register-email'],
                company: p['cloud-register-company']
            }
        });

        if (result._id) {
            contentCreated = true;
            log.info('Content created with id ' + result._id);
        }

    }

    var params = buildParams(req, {submitted: null});

    return {
        //Form is submitted with ajax and will return this as json.
        contentType: 'text/json',
        body: {
            content: contentCreated ? 'ok' : 'false'
        }

        /*redirect: execute('portal.pageUrl', {
            path: content._path,
            params: {
                submitted: contentCreated ? 'ok' : null
            }
        })*/
    }

}

exports.get = handleGet;
exports.post = handlePost;