angular.module('foodbankfarm.directives', []);
angular.module('foodbankfarm.repositories', []);
angular.module('foodbankfarm.map',[
       'uiGmapgoogle-maps',
       ]).config(
	    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
	        GoogleMapApiProviders.configure({
	            key: 'AIzaSyCTwkFSfmpbEPFittMwuiS-Uj6eONCUfdQ',
	            v: '3.17',
	            libraries: 'weather,geometry,visualization'
	        });
	    }]);
var foodbankfarm = angular.module('foodbankfarm', [
    'ngCookies',
    'ngRoute',
    'ngLocale',
    'ngTouch',
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
    function (router) {
        router
            .when('/home/', {
                templateUrl: 'dist/views/home.html',
                controller: 'HomeController'
            })
            .when('/listings/', {
                templateUrl: 'dist/views/listing.html',
                controller: 'ListingController'
            }) 
            .when('/map', {
            	templateUrl: 'dist/views/map.html',
            	controller: 'MapController'
            })
            .when('/detail/:id', {
            	templateUrl: 'dist/views/detail.html',
            	controller: 'DetailController'
            })
            .otherwise({
                templateUrl: 'dist/views/home.html',
                controller: 'HomeController'
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