var stk = require('/cms/lib/stk/stk.js');

function buildParams(req, urlParam) {
    var component = execute('portal.getComponent');
    var urlParams = urlParam ? urlParam : req.params;
    var postUrl = execute('portal.componentUrl', {
        component: component.path
    });

    var data = {
        supportUrl: component.config['supportUrl'] || 'https://enonic.com/support',
        text: component.config['text'] || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non eleifend justo, ut gravida velit. Cras id metus tortor. Nam eget tortor nec lacus euismod.',
        thankYou: component.config['thankYou'] || 'Thank you! Your comment/feedback/inquiry will be addressed soon.'
    };

    return {
        component: component,
        urlParams: urlParams,
        postUrl: postUrl,
        data: data
    }
};

function handleGet(req) {
    var content = execute('portal.getContent');
    var params = buildParams(req);

    var view = resolve('contact.html');
    return stk.view.render(view, params);
}

function handlePost(req) {
    var view = resolve('contact.html');
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
    var saveLocation = saveFolder || content._path;

    // Check required fields and create content
    if (p['contact-us-name'] && ( p['contact-us-phone'] || p['contact-us-email']) && p['contact-us-message']) {
        var result = execute('content.create', {
            name: p['form'] + ' ' + p['contact-us-name'],
            parentPath: saveLocation,
            displayName: p['contact-us-name'],
            draft: false,
            contentType: 'base:unstructured',
            data: {
                form: p['form'],
                name: p['contact-us-name'],
                phone: p['contact-us-phone'],
                email: p['contact-us-email'],
                company: p['contact-us-company'],
                message: p['contact-us-message']
            }
        });

        if (result._id) {
            contentCreated = true;
        }

    }

    var params = buildParams(req, {submitted: null});

    return {
        contentType: 'text/json',
        body: {
            content: contentCreated ? 'ok' : 'false'
        }
    }

}

exports.get = handleGet;
exports.post = handlePost;