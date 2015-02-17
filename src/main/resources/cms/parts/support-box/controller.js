var stk = require('/cms/lib/stk/stk.js');
var utilities = require('/cms/lib/utilities.js');

function handleGet(req) {

    var component = execute('portal.getComponent');

    var title = component.config['title'] ? component.config['title'] : 'Product support';
    var text = component.config['text'] ? component.config['text'] : 'Lorem ipsum...';
    //var imagePath = component.config['imagePath'] ? component.config['imagePath'] : null;

    var imagePath;
    if (component.config['imagePath']) {
        imagePath = component.config['imagePath'];
    }
    else if (component.config['imageContent']) {
        imagePath = execute('portal.imageUrl', {id: component.config['imageContent'], filter: 'scaleWidth(800)'})
    }


    var listItem = component.config['listItem'];

    var linkUrl = component.config['linkUrl'];
    var linkPageKey = component.config['linkPage'];
    var linkText = component.config['linkText'] || null;
    var anchorContentKey = component.config['anchorContent'];
    var highlight = component.config['linkHighlight'];
    var linkHighlight = (highlight == true || highlight == 'true') ? true : false;
    var bgColor = component.config['themeColor'] || null;

    var params = {
        component: component,
        title: title,
        text: text,
        imagePath: imagePath,
        listItem: listItem,
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, anchorContentKey),
        linkText: linkText,
        linkHighlight: linkHighlight,
        bgColor: bgColor
    };



    var view = resolve('support-box.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;