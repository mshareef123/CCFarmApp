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
	            libraries: 'places,weather,geometry,visualization'
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
angular.module('foodbankfarm') 
    .controller('FilterController', ['$scope','$rootScope', function ($scope,$rootScope) {
    	
    	$scope.shouldShowSpecialtyProducts = false;
   		$scope.allCheckBoxSelected = false;     
   		$scope.allSpecialitySelected = false;
   		
    	//Setup our categories so that we can build them the UI page.
    	$rootScope.getCategoriesFromLocation = function () {
    		var products = [];
    		var specialities = [];
    		for(var i = 0; i < $rootScope.locations.length; i++) {
       			var currentFarm = $rootScope.locations[i];
       			products = _.union(products, currentFarm.products);  			
       			specialities = _.union(specialities, currentFarm.specialities);
       		}  
    
    		$rootScope.filterCheckBoxes = [];
    		$rootScope.specialityCheckBoxes = [];
        	for (var i = 0; i < products.length; i++) {
        		var checkBoxObject = {label : products[i] , isSelected: false};
        		$rootScope.filterCheckBoxes.push(checkBoxObject);
        	}
        	
        	for(var i = 0; i < specialities.length; i++) {
        		var checkBoxObject = {label : specialities[i] , isSelected: false};
        		$rootScope.specialityCheckBoxes.push(checkBoxObject);
        	}
    	};  
    	
    	//Toggles all the checkboxes selected or not when you toggle all
    	$scope.allCheckBoxChanged = function () {     
    		var setterValue = false;
    		if($scope.allCheckBoxSelected) {
    			setterValue = true;
    		} 
    		
    		for (var i = 0; i < $rootScope.filterCheckBoxes.length; i++) {
    			var currentBox = $rootScope.filterCheckBoxes[i];
    			currentBox.isSelected = setterValue;
        	}
    		$scope.allSpecialitySelected = setterValue;
    		$scope.allSpecialityChanged();
    		$scope.checkBoxChanged();
    	}	 
    	
    	//much like the all toggle, but only for specialty products
    	$scope.allSpecialityChanged = function() {
    		var setterValue = false;
    		if($scope.allSpecialitySelected) {
    			setterValue = true;
    		} 
    		
    		for (var i = 0; i < $rootScope.specialityCheckBoxes.length; i++) {
    			var currentBox = $rootScope.specialityCheckBoxes[i];
    			currentBox.isSelected = setterValue;
        	}
    	}
    	
    	$scope.checkBoxChanged = function () {
    		var allProductFilters = angular.copy($rootScope.filterCheckBoxes);
    		var allSpecialityFilters = angular.copy($rootScope.specialityCheckBoxes);
    		
    		var currentProductFilters = _.remove(allProductFilters, function(filter) {
    			return filter.isSelected == true;
    		}); 
    		
    		var currentSpecialityFilters = _.remove(allSpecialityFilters, function(filter) {
    			return filter.isSelected == true;
    		}); 
    		
    		//Okay now we need to just get the labels...probably a better way to do this, couldn't think of one at the moment so this'll do for now.
    		var filterLabels = [];
    		
    		for(var i = 0; i < currentProductFilters.length; i++) {
    			var currentFilterLabel = currentProductFilters[i].label;
    			filterLabels.push(currentFilterLabel);
    		}
    		
    		for(var i = 0; i < currentSpecialityFilters.length; i++) {
    			var currentFilterLabel = currentSpecialityFilters[i].label;
    			filterLabels.push(currentFilterLabel);
    		}
    		
    		//Our actual filtering is rather simple - we will just intersect the specialties on each product with our filter labels, and if the intersection
    		//isn't empty we know we found a product in our filter range.  So we just add it to our result set.
    		var filteredLocations = [];
    		for(var i = 0; i < $rootScope.locations.length; i++) {
    			var currentLocation = $rootScope.locations[i];
    			var intersectedProducts = _.intersection(currentLocation.products, filterLabels)
    			var intersectedSpecialities = _.intersection(currentLocation.specialities, filterLabels);
    			if(intersectedProducts.length > 0 || intersectedSpecialities.length > 0 ) {
    				filteredLocations.push(currentLocation);
    			}
    		}
    		
    		//This little check is for the condition when you turned off all the filters and we need to go back to basic state
    		if(currentProductFilters.length != 0 || currentSpecialityFilters.length != 0) {
    			$rootScope.filteredLocations = filteredLocations;
    		} else {
    			$rootScope.filteredLocations = angular.copy($rootScope.locations);
    		}

    	};
    	
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
        	var routeID = Number($route.id);
            var farmSelected = _.findWhere($rootScope.locations, {'id' : routeID});
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
                $rootScope.filteredLocations = result.data;
                $rootScope.getCategoriesFromLocation();
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
              $scope.shouldShowFilter = false;
    		
//            LocationRepository.list('queryString').then(function (result) {
//                $scope.locations = result.data;
//            });

	        $scope.map = {center: {latitude: 40.0010204, longitude: -75.8069082 }, zoom: 10 };// chester county long lat
	        $scope.options = {scrollwheel: false};
	        
	        var events = {
	                places_changed: function (searchBox) {}
	              }
	              $scope.searchbox = { template:'searchbox.tpl.html', events:events};

	        
	        $scope.farmmarkers = [];
	        
	        var createMarker = function (i, locations,idKey) {
                var ret = {
            	        latitude:  locations[i].longitude,
            	        longitude:  locations[i].latitude,
            	        title:  locations[i].farmName,
                        show: false,
            	      };
              ret.onClick = function() {
                  ret.show = !ret.show;
	              window.console.log("Clicked!");

              };
              ret[idKey] = i;
              return ret;
	        };
	        
	        $scope.$watch(function() {
	            return $scope.map.bounds;
	          }, function(nv, ov) {
	            // Only need to regenerate once
	              var markers = [];
	              for (var i = 0; i < $rootScope.filteredLocations.length; i++) {
//	                  var ret = {
//	                	        latitude:  $scope.locations[i].longitude,
//	                	        longitude:  $scope.locations[i].latitude,
//	                	        title:  $scope.locations[i].farmName,
//	                            show: false,
//	                	      };
//	                  ret.onClick = function() {
//	                      ret.show = !ret.show;
//	                  };
//	                  ret["id"] = i;
//
	                markers.push(createMarker(i, $rootScope.filteredLocations,'id'));
	              }
	              $scope.farmmarkers = markers;
	          }, true);

    }]);
