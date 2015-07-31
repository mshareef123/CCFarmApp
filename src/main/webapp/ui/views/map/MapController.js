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
