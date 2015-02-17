var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {
    var component = execute('portal.getComponent');
    var config = component.config;
    var content = execute('portal.getContent');

    // Use the default when user does not specify or enters a non number.
    var numEvents = stk.data.isInt(config.numberEvents) ? config.numberEvents : 5;

    var contents = execute('content.query', {
        start: stk.data.isInt(req.params['index']) ? req.params['index'] : 0,
        count: numEvents,
        query: '_parentpath="/content' + content._path + '"',
        sort: "data.startDate ASC",
        contentTypes: [
            module.name + ':event'
        ]
    });

    var events = [];

    for (var i = 0; i < contents.contents.length; i++) {
        var data = contents.contents[i].data;

        if (data.startDate) {
            var objDate = new Date(data.startDate),
                locale = "en-us",
                month = objDate.toLocaleString(locale, { month: "long" }),
                day = objDate.getDate().toString(),
                year = objDate.getFullYear();

            //data.month = 'Sat, 12 Aug 1995 13:30:00 GMT+0430';
            // Temporary hack. The month does not come out right, but it works in the browser console.
            data.formattedStartDate = month.substring(4,7) + ' ' + day + ', ' + year;
        }

        stk.data.deleteEmptyProperties(data);

        events.push(data);
    }

    var params = {
        title: config.title ? config.title : 'Events',
        events: events
    };


    var view = resolve('event-list.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;