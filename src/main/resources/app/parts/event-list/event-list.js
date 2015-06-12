var stk = require('/lib/stk/stk.js');

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
            //"2015-02-18T09:00"

            data.startTime = data.startDate.substring(11,16) != '00:00' ? data.startDate.substring(11,16) : null;

            var objDate = new Date(data.startDate),
                locale = "en-us",
                month = objDate.toLocaleString(locale, { month: "long" }),
                day = objDate.getDate().toString(),
                year = objDate.getFullYear();

            data.startDD = day;
            data.startMonth = month.substring(4,7);
            data.startYear = year;
            //data.month = 'Sat, 12 Aug 1995 13:30:00 GMT+0430';
            // Temporary hack. The month does not come out right, but it works in the browser console.
            data.formattedStartDate = month.substring(4,7) + ' ' + day + ', ' + year;
        }

        if (data.endDate) {
            data.endTime = data.endDate.substring(11,16) != '00:00' ? data.endDate.substring(11,16) : null;

            var objDate = new Date(data.endDate),
                locale = "en-us",
                month = objDate.toLocaleString(locale, { month: "long" }),
                day = objDate.getDate().toString(),
                year = objDate.getFullYear();

            data.endDD = day;
            data.endMonth = month.substring(4,7);
            data.endYear = year;

            //data.month = 'Sat, 12 Aug 1995 13:30:00 GMT+0430';
            // Temporary hack. The month does not come out right, but it works in the browser console.
            data.formattedEndDate = month.substring(4,7) + ' ' + day + ', ' + year;
        }
        var time = getTime(data.startTime, data.endTime);
        if(data.startYear == data.endYear) {
            if(data.startMonth == data.endMonth) {
                if(data.startDD == data.endDD) {
                    data.date = data.startDD + ' ' + data.startMonth + ', ' + data.startYear + ' ' + time;
                } else {
                    data.date = data.startDD + '-' + data.endDD + ' ' + data.startMonth + ', ' + data.startYear + ' ' + time;
                }
            } else {
                data.date = data.startDD + ' ' + data.startMonth + ' - ' + data.endDD + ' ' + data.endMonth + ', ' + data.startYear + ' ' + time;
            }
        } else {
            data.date = data.startDD + ' ' + data.startMonth + ', ' + data.startYear + ' - ' + data.endDD + ' ' + data.endMonth + ', ' + data.endYear + ' ' + time;
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

var getTime = function(start, end) {
    var time = null;
    if(start && end) {
        time = start + '-' + end;
    } else if(start) {
        time = 'start';
    } else if (end) {
        time = end;
    }

    return time;
}

exports.get = handleGet;