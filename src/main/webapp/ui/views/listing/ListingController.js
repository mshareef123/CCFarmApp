angular.module('foodbankfarm')
    .controller('ListingController', [
        '$rootScope',
        '$scope',
        '$location',
        'LocationRepository',
        function ($rootScope,$scope,$location,locationRepository) {
            $scope.shouldShowFilter = false;
            $scope.shouldShowDistanceSearchbar = false;
        	$scope.sortOrder = 'farmName';

            if(!$rootScope.filteredLocations){
            	//retrieving list of locations
	            locationRepository.list('queryString').then(function (result) {
	            	$scope.locations = result.data;
	                $rootScope.locations = result.data;
	                $rootScope.filteredLocations = result.data;
	                $rootScope.getCategoriesFromLocation();
	            });  
            }
           
            $scope.viewDetail  = function(id){
            	 $location.path('/detail/' + id);
            };
        
            $scope.valueChanged = function(radioButtonValue) {

                if(radioButtonValue == 'Distance') {
                	$scope.shouldShowDistanceSearchbar = true;
                	$scope.setUpSearchBox();
                	if($rootScope.currentUserLocation != null) {
                		$scope.sortOrder = 'sortDistance';
                	}
                } else {
                	$scope.shouldShowDistanceSearchbar = false;
                	$scope.sortOrder = 'farmName';
                }
            };

            var updateAllSortLocations = function () {
            	var numberOfLocations = $rootScope.locations.length;
           	   	for(var i = 0; i < numberOfLocations; i++) {
           		   var currentLocation = $rootScope.locations[i];
          		   var currentLocationLatLng = new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
          		   var currentUserLocationLatLng = new google.maps.LatLng( $rootScope.currentUserLocation.lat,  $rootScope.currentUserLocation.long);
           		   var distance = distance = google.maps.geometry.spherical.computeDistanceBetween(currentLocationLatLng, currentUserLocationLatLng)
           		   currentLocation.sortDistance = (distance/1000)*0.621371;//converting to miles
//           		   window.console.log(currentLocation.sortDistance);
           	   	}
           	   
           	   	$scope.sortOrder = 'sortDistance';
            };
            
            var updateSortLocation = function() {

           	   	var places = $scope.searchBox.getPlaces();

           	   	if (places.length == 0) {
           		   	return;
           	   	} else {
           	   		var currentLocation = places[0];
           	   		var location = {lat: currentLocation.geometry.location.lat(), long: currentLocation.geometry.location.lng()};
           		   	$rootScope.currentUserLocation = location;
           	   	}
           	   
           	   	$scope.$apply(updateAllSortLocations());
            };

 
            $scope.setUpSearchBox = function () {
         	   var input = document.getElementById('sortByDistanceField');
                $scope.searchBox = new google.maps.places.SearchBox(input);
                
                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.
                $scope.searchBox.addListener('places_changed', updateSortLocation);
            };           

           
            $scope.getCurrentLocation = function() {
        		var input = document.getElementById('sortByDistanceField');
        		input.value = "My Current Location"
            	  navigator.geolocation.getCurrentPosition(geoSuccess);
            };
        
        	var geoSuccess = function(position) {

           	   	var location = {lat: position.coords.latitude, long: position.coords.longitude};
        		$rootScope.currentUserLocation = location;
           	   	$scope.$apply(updateAllSortLocations());
        	};

}]);