'use strict';
angular.module('app.controller', []);
angular.module('app.directive', []);
angular.module('app.filter', []);
angular.module('app.service', []);

angular.module('app', [
    'app.service',
    'app.controller',
    'app.directive',
    'app.filter',
    'app.view',
    'ngPDFViewer',
    'ui.mask',
    'ionic',
    'socket-io'
]);

angular.module('app').config([
    '$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);

angular.module('app').config([
    '$ionicConfigProvider', function ($ionicConfigProvider) {
        $ionicConfigProvider.views.transition('platform');

        $ionicConfigProvider.views.maxCache(30);

        $ionicConfigProvider.views.forwardCache(true);

        $ionicConfigProvider.templates.maxPrefetch(30);

        $ionicConfigProvider.navBar.alignTitle('ios');
    }]);

angular.module('app').config([
    '$stateProvider', '$urlRouterProvider', function routes($stateProvider, $urlRouterProvider) {
        $stateProvider.state('main', {
            url: '/main',
            templateUrl: 'main.html',
            controller: 'simpleCtrl',
            authenticate: false
        }).state('formular', {
            url: '/formular',
            templateUrl: 'formularlist2.html',
            controller: 'formularCtrl',
            authenticate: true
        }).state('standard', {
            url: '/standard',
            templateUrl: 'standardlist.html',
            controller: 'standardCtrl',
            authenticate: true
        }).state('blanko', {
            url: '/blanko',
            templateUrl: 'blankolist.html',
            controller: 'blankoCtrl',
            authenticate: true
        }).state('imprint', {
            url: '/imprint',
            templateUrl: 'imprint.html',
            controller: 'simpleCtrl',
            authenticate: false
        }).state('contact', {
            url: '/contact',
            templateUrl: 'contact.html',
            controller: 'contactCtrl',
            authenticate: false
        }).state('help', {
            url: '/help',
            templateUrl: 'help.html',
            controller: 'helpCtrl',
            authenticate: false
        }).state('setting', {
            url: '/setting',
            templateUrl: 'setting.html',
            controller: 'settingCtrl',
            authenticate: true
        }).state('logout', {
            url: '/',
            abstract: false,
            authenticate: false
        });

        $urlRouterProvider.otherwise("/main");
    }]);


angular.module('app').run([
    '$ionicPlatform', '$rootScope', '$state', '$window', 'dataService', 'modalLoginService',
    function routes($ionicPlatform, $rootScope, $state, $window, data, login) {
        $ionicPlatform.ready(function () {
            if (!ionic.Platform.isWebView()) {
                if (ionic.Platform.isIOS()) {
                    ionic.keyboard.disable();
                }
            }

            $ionicPlatform.isFullScreen = true;

            if ($window.cordova && $window.cordova.plugins.Keyboard) {
                $ionicPlatform.registerBackButtonAction(function (e) {
                    e.preventDefault();
                    return false;
                }, 101);

                cordova.plugins.Keyboard.disableScroll(true);

                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if ($window.StatusBar) {
            }
        });

        $window.addEventListener("pageshow", function (evt) {
            data.apiSilentLogin(function (err) {
                if (err) {
                    $state.transitionTo('main');
                }
            });
        }, false);

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name === 'logout') {
                event.preventDefault();
                return;
            }

            if (toState.authenticate && !data.user.isLogin) {
                login.redirectTo = toState.name;

                login.show();

                event.preventDefault();
            }
        });
    }]);

var app;
(function (app) {
    

    

    (function (filter) {
        [];
    })(app.filter || (app.filter = {}));
    var filter = app.filter;

    

    

    

    

    

    function registerController(name, obj) {
        angular.module('app.controller').controller(name, obj);
    }
    app.registerController = registerController;

    function registerDirective(name, directive) {
        angular.module('app.directive').directive(name, directive);
    }
    app.registerDirective = registerDirective;

    function registerFilter(className, services) {
        if (typeof services === "undefined") { services = []; }
        var filter = className.toLowerCase();

        services.push(function () {
            var obj = new app.filter[className]();
            return obj.filter;
        });

        angular.module('app.filter').filter(filter, services);
    }
    app.registerFilter = registerFilter;

    function registerValue(name, value) {
        angular.module('app.service').value(name, value);
    }
    app.registerValue = registerValue;

    function registerConstant(name, value) {
        angular.module('app.service').constant(name, value);
    }
    app.registerConstant = registerConstant;

    function registerFactory(className, services) {
        if (typeof services === "undefined") { services = []; }
        var service = className.toLowerCase();

        services.push(function () {
            return new app.service[className]();
        });

        angular.module('app.service').factory(service, services);
    }
    app.registerFactory = registerFactory;

    function registerService(name, obj) {
        angular.module('app.service').service(name, obj);
    }
    app.registerService = registerService;
})(app || (app = {}));
