var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {
    var component = execute('portal.getComponent');

    // Get URL params
    var product = req.params['pr'];
    var configuration = req.params['co'];
    var heading = req.params['ac'] === 'o' ? 'Order now' : 'Get quote';

    var products = [
        {
            code: 'cd',
            name: 'Cloud Developer'
        },
        {
            code: 'cs',
            name: 'Cloud Silver'
        },
        {
            code: 'cg',
            name: 'Cloud Gold'
        },
        {
            code: 'cp',
            name: 'Cloud Platinum'
        },
        {
            code: 'sc',
            name: 'Software Community'
        },
        {
            code: 'ss',
            name: 'Software Silver'
        },
        {
            code: 'sg',
            name: 'Software Gold'
        },
        {
            code: 'sp',
            name: 'Software Platinum'
        }
    ];

    // Form post url is this component path
    var postUrl = execute('portal.componentUrl', {
        component: component.path
    });

    // Preface text
    var preface = component.config['preface'] || 'Part not configured';

    var params = {
        products: products,
        selectedProduct: product,
        configuration: configuration,
        heading: heading,
        postUrl: postUrl,
        preface: preface
    };

    var view = resolve('buy.html');
    return stk.view.render(view, params);
}

function handlePost(req) {
    var contentCreated = false;

    var component = execute('portal.getComponent');
    var content = execute('portal.getContent');
    var folderKey = component.config['saveFolder'] || null;
    var saveFolder;
    if (folderKey) {
        var folder = execute('content.get', {
            key: folderKey
        });
        saveFolder = folder._path;
    }
    var saveLocation = saveFolder ? saveFolder : content._path;

    var fp = req.formParams;

    var result = execute('content.create', {
        name: 'Buy ' + fp['name'] + '-' + Math.floor((Math.random() * 1000000000) + 1),
        parentPath: saveLocation,
        displayName: fp['name'],
        branch: 'draft',
        contentType: 'base:unstructured',
        data: {
            product: fp['product'],
            config: fp['config'],
            name: fp['name'],
            phone: fp['phone'],
            email: fp['email'],
            company: fp['company'],
            message: fp['message']
        }
    });

    if (result._id) {
        contentCreated = true;
    }

    return {
        contentType: 'text/json',
        body: {
            content: contentCreated ? 'ok' : 'false'
        }
    }
}

exports.get = handleGet;
exports.post = handlePost;
