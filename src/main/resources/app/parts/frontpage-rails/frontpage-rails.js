var stk = require('/lib/stk/stk.js');

function handleGet(req) {

    var component = execute('portal.getComponent');

    var title = component.config['title'] || 'Develop faster with Enonic';
    var intro = component.config['intro'] || 'A set of unique features simplifies and speeds up development. Build and deliver faster and more safely than ever with Enonic on Rails.';
    var readMoreUrl = component.config['readMorePage'] ? execute('portal.pageUrl', {id: component.config['readMorePage']}) : '#';
    var linkText = component.config['linkText'] ? component.config['linkText'] : 'Learn more about Enonic on Rails';
    var slides = component.config['slides'];
    slides = stk.data.forceArray(slides);

    var params = {
        title: title,
        intro: intro,
        readMoreUrl: readMoreUrl,
        linkText: linkText,
        slides: slides
    };

    var view = resolve('frontpage-rails.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;