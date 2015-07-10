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
