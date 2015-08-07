;(function () {
    'use strict';

    angular
        .module('app.core')
        .run(initAnalytics)
        .config(configure);

    configure.$inject = ['$provide', '$httpProvider', 'AngularyticsProvider'];
    initAnalytics.$inject = ['Angularytics', 'CONFIG'];

    function initAnalytics(Angularytics, CONFIG) {
        ga('create', CONFIG.gaId);
        Angularytics.init();
    }

    function configure($provide, $httpProvider, AngularyticsProvider) {
        AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);

        var sharing = {
            "link":"http:\/\/dev.craveonline.com\/lifestyle\/articles\/824865-craveonlines-guide-to-tailgate-like-a-beast-with-text",
            "redirect":"http:\/\/dev.craveonline.com\/lifestyle\/articles\/824865-craveonlines-guide-to-tailgate-like-a-beast-with-text",
            "name":"Craveonline's Guide to Tailgate like a beast with Text!",
            "description":"Craveonline's Guide to Tailgate like a beast with Text! on Craveonline",
            "appid":"794888393894616",
            "img":"http:\/\/dev.craveonline.com\/assets\/uploads\/2015\/03\/mobile_slide13-140x79.jpg"
        };

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $provide.constant('CONFIG', {
            'flow': {
                'endpoint': 'http://flow.evolvemediallc.dev/api/v1/sweepstakes/yn/entries',
                'bearer': 'NiRTsR5WZY2OxuLx3oW6uzd3RyCAfxpwM5DgYmKj'
            },
            'gaId': 'UA-12310597-137',
            'gaCat':'test',
            "showSocialNav" : true,
            "submitText" : 'Submit',
            "legalOpenText" : 'Legal notice',
            "legalTitle" : 'Legal notice title',
            "legalCloseText" : 'Accept',
            "termsText" : 'Terms & Condition',
            "privacyText" : 'Privacy Policy',
            "acknowledgementText" : 'Thank you',
            "expiredText" : 'Expired',
            "social": [
                {
                    'id' : 'face',
                    'title': 'facebook share button',
                    'href' : 'https://www.facebook.com/dialog/feed?app_id=' + sharing.appid + '&link=' + sharing.link + '&redirect_uri=' + sharing.redirect + '&display=popup&name=' + encodeURIComponent(sharing.name) + '&description=' + encodeURIComponent(sharing.description) + '&picture=' + sharing.img
                },
                {
                    'id' : 'tweet',
                    'title': 'twitter share button',
                    'href' : 'https://twitter.com/home?status=' + encodeURIComponent(sharing.name) + '%20on%20Craveonline%20' + sharing.link
                },
                {
                    'id' : 'plus',
                    'title': 'google plus share button',
                    'href' : 'https://plus.google.com/share?url=' + sharing.link
                }
            ]
        });
    }

})();
