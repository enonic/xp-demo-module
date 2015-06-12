var stk = require('/lib/stk/stk.js');

function handleGet(req) {

    var currentContent = execute('portal.getContent');
    var component = execute('portal.getComponent');

    var result = execute('content.getChildren', {
        key: currentContent._path,
        start: 0,
        count: 100,
        sort: '_modifiedTime ASC'
    });



    var partners = {};

    for (var i = 0; i < result.contents.length; i++) {

        var content = result.contents[i];
        stk.data.deleteEmptyProperties(content.data);
        var partnerType;

        // Need to use integers to avoid Thymeleaf changing order
        switch(content.data.partnerType) {
            case 'silver':
                partnerType = 3;
                break;
            case 'gold':
                partnerType = 2;
                break;
            default:
                partnerType = 1;
        }

        if (!(partnerType in partners)) {
            partners[partnerType] = {
                title: content.data.partnerType,
                data: []
            };
        }


        var partnerCaseStudies = [];


        content.data['case-study'] = stk.data.forceArray(content.data['case-study']);
        content.data['case-study'] = stk.data.trimArray(content.data['case-study']);
        for (var j = 0; j < content.data['case-study'].length; j++) {
            var caseStudy = content.data['case-study'][j];

            var caseStudyResult = execute('content.get', {
                key: caseStudy
            });



            if (caseStudyResult) {
                partnerCaseStudies.push({
                    key: caseStudy,
                    data: caseStudyResult.data
                });
            }
        }

        var contentData = {
            title: content.displayName,
            data: content.data,
            caseStudies: partnerCaseStudies
        };

        /*if (partnerType in partners) {
            partners[partnerType].data.push(contentData);
        }
        else {
            partners[partnerType] = [contentData];
        }*/

        partners[partnerType]['data'].push(contentData);
    }

    var becomePartnerIntro = component.config['becomePartnerIntro'] || 'Part config not set';
    var becomePartnerBody = component.config['becomePartnerBody'] || 'Part config not set';
    var contactPageUrl = component.config['contactPage'] ? execute('portal.pageUrl', {id: component.config['contactPage']}) : '#';

    var params = {
        content: currentContent,
        partners: partners,
        becomePartnerIntro: becomePartnerIntro,
        becomePartnerBody: becomePartnerBody,
        contactPageUrl: contactPageUrl
    };


    var view = resolve('partner-list.html');
    return stk.view.render(view, params);
}

exports.get = handleGet;