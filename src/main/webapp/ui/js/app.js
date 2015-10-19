angular.module('foodbankfarm.directives', []);
angular.module('foodbankfarm.repositories', []);
angular.module('foodbankfarm.map',[
       'uiGmapgoogle-maps',
       ]).config(
	    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
	        GoogleMapApiProviders.configure({
	            key: 'AIzaSyCTwkFSfmpbEPFittMwuiS-Uj6eONCUfdQ',
	            v: '3.17',
	            libraries: 'places,weather,geometry,visualization'
	        });
	    }]);
var foodbankfarm = angular.module('foodbankfarm', [
    'ngCookies',
    'ngRoute',
    'ngLocale',
    'ngResource',
    'foodbankfarm.directives',
    'foodbankfarm.repositories',
    'ui.bootstrap',
    'foodbankfarm.map'
]);

foodbankfarm.config([
    '$routeProvider',
    '$locationProvider',
    '$httpProvider',
    function (router,$locationProvider) {
        //$locationProvider.html5Mode(true);

        router
            .when('/home/', {
                templateUrl: 'dist/views/home.html',
                controller: 'HomeController'
            })
            .when('/listings/', {
                templateUrl: 'dist/views/listing.html',
                controller: 'ListingController'
            }) 
            .when('/map/:id', {
            	templateUrl: 'dist/views/map.html',
            	controller: 'MapController'
            })
            .when('/detail/:id', {
            	templateUrl: 'dist/views/detail.html',
            	controller: 'DetailController'
            })
            .when('/info', {
            	templateUrl: 'dist/views/info.html',
            	controller: 'InfoController'
            })
            .when('/filterpage', {
            	templateUrl: 'dist/views/filterpage.html',
            })

            .otherwise({
            	templateUrl: 'dist/views/map.html',
            	controller: 'MapController'
            });
    }]
);

//angular.module('foodbankfarm', ['uiGmapgoogle-maps']).config(
//	    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
//	        GoogleMapApiProviders.configure({
//	            key: 'AIzaSyCTwkFSfmpbEPFittMwuiS-Uj6eONCUfdQ',
//	            v: '3.17',
//	            libraries: 'weather,geometry,visualization'
//	        });
//	    }]
//	);