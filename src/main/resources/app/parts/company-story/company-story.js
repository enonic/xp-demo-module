var stk = require('/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');
    var content = execute('portal.getContent');

    var result = execute('content.getChildren', {
        key: content._path,
        start: 0,
        count: 100,
        sort: 'data.year ASC'
    });

    var yearsArray = [];
    var yearsGroup = {};

    for (var i = 0; i < result.contents.length; i++) {

        var content = result.contents[i];
        content.data.title = content.displayName;

        var year = content.data.year;

        if (stk.data.isInt(year)) {
            var yearData;

            if (year in yearsGroup) {
                yearData = yearsGroup[year];
                yearData.data.push(content.data);
            }
            else {
                yearData = {year: year, data: [content.data]};
                yearsGroup[year] = yearData;
            }
        }


    }

    for (var yearKey in yearsGroup) {
        yearsArray.push(yearsGroup[yearKey]);
    }

    yearsArray.sort(function (item1, item2) {
        var year1 = parseInt(item1.year);
        var year2 = parseInt(item2.year);
        return year1 - year2;
    });


    var params = {
        context: req,
        component: component,
        title: component.config['title'] || 'part not configured',
        preface: component.config['preface'] || null,
        events: result.contents,
        years: yearsArray,
        currentYear: new Date().getFullYear()
    };

    var view = resolve('company-story.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;