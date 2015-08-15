angular.module('foodbankfarm')
    .controller('ListingController', [
        '$rootScope',
        '$scope',
        '$location',
        'LocationRepository',
        function ($rootScope,$scope,$location,locationRepository) {
            $scope.shouldShowFilter = false;
            $scope.shouldShowDistanceSearchbar = false;
            
            //retrieving list of locations
            locationRepository.list('queryString').then(function (result) {
            	$scope.locations = result.data;
                $rootScope.locations = result.data;
                $rootScope.filteredLocations = result.data;
                $rootScope.getCategoriesFromLocation();
            });  
           
            $scope.valueChanged = function(radioButtonValue) {
                if(radioButtonValue == 'Distance') {
                	$scope.shouldShowDistanceSearchbar = true;
                } else {
                	$scope.shouldShowDistanceSearchbar = false;
                }
            };
            
            $scope.viewDetail  = function(id){
            	 $location.path('/detail/' + id);
            };
        
        
        var events = {
                places_changed: function (searchBox) {
                	var places=searchBox.getPlaces();

                    if (places.length == 0) {
                      return;
                    }
                	
                	var newMarkers = $scope.locations;
                    var bounds = new google.maps.LatLngBounds();
                    for (var i = 0, place; place = places[i]; i++) {
                      // Create a marker for each place.
                      var marker = {
                        id:i,
                        place_id: place.place_id,
                        title: 'Search Location!!!',
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                        address:place.adr_address
                        //show: false
                        //templateurl:'window.tpl.html',
                       // templateparameter: place
                      };
                      $scope.map = {center: {latitude: places[0].geometry.location.lat(), longitude: places[0].geometry.location.lng() }, zoom: 13 };
	                    
                      newMarkers.push(marker);

                      bounds.extend(place.geometry.location);
                    }
                }
              }
        $scope.searchbox = { template:'searchbox.tpl.html', events:events};
}]);