var stk = require('/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');

    var defaultDreams = ['a better CMS?', 'a responsive website'];
    var dreamArray = stk.data.forceArray(component.config['dream']);
    dreamArray = stk.data.trimArray(dreamArray);
    dreamArray = dreamArray.length ? dreamArray : defaultDreams;

    // Make sure there is a trailing question mark
    for (var i = 0; i < dreamArray.length; i++) {
        dreamArray[i] = dreamArray[i].replace(/\??$/, '?');
    }

    var dreams = dreamArray.join();

    var params = {
        dreams: dreams
    };

    var view = resolve('dream-story.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;