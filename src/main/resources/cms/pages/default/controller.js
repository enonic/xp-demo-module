var menu = require('/cms/lib/menu.js');
var stk = require('/cms/lib/stk/stk.js');

function handleGet(req) {



    var site = execute('portal.getSite');
    var content = execute('portal.getContent');

    var menuItems = menu.getSiteMenu(3);
    var moduleConfig = site.data.moduleConfig;;

    // Google Analytics
    var googleUATrackingId = moduleConfig.config['googleUATrackingId'] || null;

    // Contact page URL (for footer)
    var contactPageUrl = moduleConfig.config['contactPage'] ? execute('portal.pageUrl', {id: moduleConfig.config['contactPage']}) : '#';

    // Defines whether page header is layered or not
    var headerType = content.page.config['headerType'] ? content.page.config['headerType'] : 'default';

    // Header logo and menu button color
    var headerColor = content.page.config['headerColor'] === 'white' ? 'dark' : null;

    // If true, h2 gets h1 styling, h3 gets h2 styling and so on
    var offsetHeadingRank = content.page.config['offsetHeadingRank'] ? true : false;

    // Offices data (for footer)
    var offices = moduleConfig.config['office'];
    offices = stk.data.forceArray(offices);
    offices = stk.data.trimArray(offices);
    var officesData = [];
    for (var i=0; i<offices.length;i++) {
        var office = execute('content.get', {
            key: offices[i]
        });

        if (office) {
            office.data['phoneNoSpace'] = office.data['phone'].replace(/\s+/g, '');
            officesData.push(office.data);
        }
    }

    // Head title
    var pageTitle = content['displayName'] + ' - ' + site['displayName'];

    // Open Graph Metadata
    var openGraph = {
        'og:title': content['displayName'],
        'og:site_name': site['displayName'],
        'og:url': null,
        'og:image': execute('portal.assetUrl', { path: 'img/og-enonic-logo.png' })
    };

    var params = {
        mainRegion: content.page.regions['main'],
        sitePath: site['_path'],
        moduleConfig: moduleConfig,
        menuItems: menuItems,
        headerType: headerType,
        headerColor: headerColor,
        offsetHeadingRank: offsetHeadingRank,
        offices: officesData,
        contactPageUrl: contactPageUrl,
        googleUATrackingId: googleUATrackingId,
        pageTitle: pageTitle,
        openGraph: openGraph

    };

    var view = resolve('default.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;