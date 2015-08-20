angular.module('foodbankfarm.map', ['uiGmapgoogle-maps'])
    .controller('MapController', 
    		['$rootScope',
    		 '$location',
             '$scope',
             'LocationRepository',
             function($rootScope,$location,$scope,locationRepository) {
    		//$scope.locations = $rootScope.filteredLocations
            $scope.shouldShowFilter = false;
	        $scope.map = {center: {latitude: 40.0010204, longitude: -75.8069082 }, zoom: 10 };// chester county long lat
	        $scope.options = {scrollwheel: false};
	        $scope.farmmarkers = [];
	        
	        var createMarker = function (i, locations,idKey) {
	        	var specialitiesStr = '';
	        	if(locations[i].specialities && locations[i].specialities.length >0){
	        		specialitiesStr = locations[i].specialities.join(", ");
	        	}
	        	
                var ret = {
            	        latitude:  locations[i].latitude,
            	        longitude:  locations[i].longitude,
            	        title:  locations[i].farmName,
            	        address:  locations[i].address,
            	        specialities : specialitiesStr,
            	        link:'#/detail/'+$rootScope.filteredLocations[i].id,
                        show: false,
            	      };
              ret.onClick = function() {

                  ret.show = !ret.show;
	              window.console.log("Clicked!");

              };
              ret.viewDetail  = function(){
                	 $location.path('/detail/' + i);
                };
              ret[idKey] = i;
              return ret;
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
	                        id:place.place_id,
	                        place_id: place.place_id,
	                        title: 'Search Location!!!',
	                        latitude: place.geometry.location.lat(),
	                        longitude: place.geometry.location.lng(),
	                        address:place.adr_address,
	            	        link:'#/detail/'+place.place_id

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
	        $scope.searchbox = { template:'searchbox.tpl.html', events:events,position: 'top-left'};
	        
	        $scope.$watch(function() {
	            return $scope.map.bounds;
	          }, function(nv, ov) {
	            // Only need to regenerate once
	              if($rootScope.filteredLocations){
	            	  initializeMarkers();
	              }else{
	                    locationRepository.list('queryString').then(function (result) {
	                  	$scope.locations = result.data;
	                      $rootScope.locations = result.data;
	                      $rootScope.filteredLocations = result.data;
	                      $rootScope.getCategoriesFromLocation();
	                      initializeMarkers();
	                  });  
	              }
	          }, true);
	        
	        var initializeMarkers = function(){
	              var markers = [];

	              for (var i = 0; i < $rootScope.filteredLocations.length; i++) {
		                markers.push(createMarker(i, $rootScope.filteredLocations,'id'));
		           }
		           $scope.farmmarkers = markers;
	        }
	        
	        $scope.viewDetail  = function(id){
           	 $location.path('/detail/' + id);
           };
           
           
           //This is all my sort by distance stuff
           $scope.shouldShowDistanceSearchbar = false;

           $scope.valueChanged = function(radioButtonValue) {
               if(radioButtonValue == 'Distance') {
               	$scope.shouldShowDistanceSearchbar = true;
               	$scope.setUpSearchBox();
               } else {
               	$scope.shouldShowDistanceSearchbar = false;
               }
           };
           
           
           $scope.setUpSearchBox = function () {
        	   var input = document.getElementById('sortByDistanceField');
               $scope.searchBox = new google.maps.places.SearchBox(input);
               
               // Listen for the event fired when the user selects a prediction and retrieve
               // more details for that place.
               $scope.searchBox.addListener('places_changed', function() {
            	   var places = $scope.searchBox.getPlaces();
  
            	   if (places.length == 0) {
            		   return;
            	   } else {
            		   $rootScope.currentSortLocation = places[0];
            	   }
            	   
            	   var numberOfLocations = $rootScope.locations.length;
            	   for(var i = 0; i < numberOfLocations; i++) {
            		   var currentLocation = $rootScope.locations[i];
            		   var currentLocationLatLng = new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
            		   var sortLocationLatLng = new google.maps.LatLng($rootScope.currentSortLocation.geometry.location.lat(), $rootScope.currentSortLocation.geometry.location.lng());
            		   var distance = distance = google.maps.geometry.spherical.computeDistanceBetween(currentLocationLatLng, sortLocationLatLng)
            		   currentLocation.sortDistance = distance;
            		   console.log(currentLocation.sortDistance);
            	   }
            	   
            	   
               });
           }
    }]);