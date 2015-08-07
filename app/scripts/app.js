;(function () {
    'use strict';

    angular.module('app.common', []);
    angular.module('app.core', ['ngRoute', 'angularytics']);
    angular.module('app.routes', []);
    angular.module('app.directives',[]);
    angular.module('app.controllers',[
        'ui.bootstrap',
        'ngSanitize'
    ]);
    angular.module('app.sweepstake',[]);

    angular.module('app', [
        'app.common',
        'app.core',
        'app.routes',
        'app.directives',
        'app.controllers',
        'app.sweepstake'
    ]);
})();
