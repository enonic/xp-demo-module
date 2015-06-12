var stk = require('/lib/stk/stk.js');
var utilities = require('/lib/utilities.js');

function handleGet(req) {

    var currentContent = execute('portal.getContent');
    var component = execute('portal.getComponent');
    var text = component.config['text'];

    var config = component.config;
    var linkUrl = config['linkUrl'];
    var linkPageKey = config['linkPage'];
    var linkText = config['linkText'] || null;
    var anchorContentKey = config['anchorContent'];

    var result = execute('content.query', {
        //query: "_parentpath = '/content" + currentContent._path + "'", // temporary fix. Remove /content when they fix it.
        //query: "_parentpath = '" + currentContent._path + "'", // Does not work now
        start: 0,
        count: 5,
        sort: 'data.startDate ASC',
        contentTypes: [module.name + ':training-event']
    });

    var events = [];

    for (var i = 0; i < result.contents.length; i++) {

        var content = result.contents[i];

        /*var courseKey = content.data['course'];
        var courseContent = execute('content.get', {
            key: courseKey
        });

        var courseUrl = execute('portal.pageUrl', {
            path: courseContent._path
        });*/

        var data = content.data;
        //data.courseUrl = courseUrl;


        data.name = content.displayName;

        var objDate = new Date(data.startDate),
            locale = "en-us",
            month = objDate.toLocaleString(locale, { month: "short" }),
            day = objDate.getDate().toString();

        //stk.log(objDate);
        //stk.log('The month is: ' + month);

        data.month = month.substring(4,7);
        //data.month = 'Sat, 12 Aug 1995 13:30:00 GMT+0430';
        data.day = day;
        //stk.log("month " + month);

        events.push(data);

    }

    var params = {
        content: currentContent,
        text: text,
        linkUrl: utilities.getLinkUrl(linkPageKey, linkUrl, anchorContentKey),
        linkText: linkText,
        events: events,
        bgColor: component.config['themeColor'] || null
    };

    var view = resolve('training.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;