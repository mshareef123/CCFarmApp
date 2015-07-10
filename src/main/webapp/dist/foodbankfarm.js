'use strict';
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
window.Require = {
    /// <summary>Checks value(s) for null, undefined, or truthyness</summary>

    IsNotNull: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is null or undefined</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is null or undefined</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value === undefined) {
            throw new Error('The ' + (name || 'value') + ' cannot be undefined.');
        }
        else if (value === null) {
            throw new Error('The ' + (name || 'value') + ' cannot be null.');
        }
    },

    IsNotNullOrWhiteSpace: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is null, undefined, or contains only white space characters</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is null, undefined, or contains only white space characters</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value !== undefined && (value === '' || (value.trim && value.trim() === ''))) {
            throw new Error('The ' + (name || 'value') + ' cannot contain only white space characters.');
        }
        else {
            Require.IsNotNull(value, name);
        }
    },

    AreNotNullOrWhiteSpace: function (values) {
        /// <summary>Throws an error if any element of values is null, undefined, or contains only white space characters</summary>
        /// <param name="values" type="Array">Array of objects to evaluate.</param>

        for (var idx in values) {
            Require.IsNotNullOrWhiteSpace(values[idx]);
        }
    },

    AreNotNull: function (values) {
        /// <summary>Throws an error if any element of values is null or undefined</summary>
        /// <param name="values" type="Array">Array of objects to evaluate.</param>

        for (var idx in values) {
            Require.IsNotNull(values[idx]);
        }
    },

    Is: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is not true</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is not true</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value !== true) {
            throw new Error('The ' + (name || 'value') + ' must be true.');
        }
    }
};
angular.module('foodbankfarm.repositories')
    .factory('LocationRepository', [
        '$http',
        function ($http) {
            var serverUrl = 'http://localhost:8080/controller';
            return {
					list: function (query) {
						Require.IsNotNull(query, 'query');
						return $http.get(serverUrl + '/listing?queryString' + query);
					}
                };
            }
    ]);
angular
    .module('foodbankfarm.directives')
    .directive("content", [
        function () {
            return {
                templateUrl: 'dist/directives/content.html',
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {}
            };
        }]
    );
angular.module('foodbankfarm.directives')
    .directive("appHeader", [
        function () {
            return {
                templateUrl: 'dist/directives/appHeader.html',
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {}
            };
        }]
    );

angular.module('foodbankfarm')
    .controller('FilterController', ['$scope','$rootScope', function ($scope,$rootScope) {
    	
    	$rootScope.shouldShowSpecialtyProducts = false;
    	
    	$rootScope.checkboxModel = {
    			allField : false,
        		specialtyProductField : false,
        		farmOutletField : false,
        		csaField : false,
        		farmersMarketField : false,
        		retailOutletField : false,
        		foodBankPartnerField : false,
        		acceptSNAPField : false,
        		honeyField : false,
        		treeFarmField : false,
        		milkAndIceCreamField : false,
        		cheeseField : false,
        		mushroomField : false,
        		wineField : false
        };
        	
    	$scope.checkBoxChanged = function () {
    		alert("hi");
    	}
    }]);

angular.module('foodbankfarm.directives')
.directive("filterView", [
                         function () {
                             return {
                                 templateUrl: 'dist/directives/filter.html',
                                 restrict: 'E',
                                 transclude: true,
                                 replace: true,
                             };
                         }]
                     );

angular.module('foodbankfarm')
    .controller('DetailController', [
        '$q',
        '$rootScope',
        '$routeParams',
        '$scope',
        function ($q,$rootScope,$route,$scope) {
        	$scope.farm ={};
            var farmSelected = _($rootScope.locations).findWhere(function (farm) { return farm.id== $route.id; });
        	$scope.farm = farmSelected;
        	
        }
    ]);
angular.module('foodbankfarm')
    .controller('HomeController', [
        '$scope',
        function ($scope) {
            $scope.responsible = {
                name: 'Aziz',
                email: 'dummy@email.email'
            };
        }
    ]);
angular.module('foodbankfarm')
    .controller('ListingController', [
        '$rootScope',
        '$scope',
        '$location',
        'LocationRepository',
        function ($rootScope,$scope,$location,locationRepository) {
            $scope.locations = [];
            $rootScope.locations = [];
            $scope.shouldShowFilter = false;
            
            //retrieving list of locations
            locationRepository.list('queryString').then(function (result) {
                $scope.locations = result.data;
                $rootScope.locations = result.data;
            });
            
            $scope.viewDetail  = function(id){
            	 $location.path('/detail/' + id);
            };
        }
    ]);
angular.module('foodbankfarm.map', ['uiGmapgoogle-maps'])
    .controller('MapController', 
    		['$rootScope',
             '$scope',
             function($rootScope,$scope) {
    		$scope.locations = $rootScope.locations;
//            LocationRepository.list('queryString').then(function (result) {
//                $scope.locations = result.data;
//            });

	        $scope.map = {center: {latitude: 40.0010204, longitude: -75.8069082 }, zoom: 10 };// chester county long lat
	        $scope.options = {scrollwheel: false};
	        $scope.farmmarkers = [];
	        $scope.$watch(function() {
	            return $scope.map.bounds;
	          }, function(nv, ov) {
	            // Only need to regenerate once
	              var markers = [];
	              for (var i = 0; i < $scope.locations.length; i++) {
	                  var ret = {
	                	        latitude:  $scope.locations[i].longitude,
	                	        longitude:  $scope.locations[i].latitude,
	                	        title:  $scope.locations[i].farmName,
	                	        id:i
	                	      };

	                markers.push(ret);
	              }
	              $scope.farmmarkers = markers;
	          }, true);

    }]);
