	angular.module('foodbankfarm.map', ['uiGmapgoogle-maps'])
    .controller('MapController', 
    		['$rootScope',
    		 '$location',
             '$scope',
             'LocationRepository',
             function($rootScope,$location,$scope,locationRepository) {
    		//$scope.locations = $rootScope.filteredLocations
             var serverURL =  $location.absUrl().split('#')[0];

            $scope.shouldShowFilter = false;
	        $scope.map = {center: {latitude: 40.0010204, longitude: -75.8069082 }, zoom: 10 };// chester county long lat
	        
	        $scope.options = {scrollwheel: false};
	        $scope.farmmarkers = [];
	        $scope.openWindow = {};
	        var createMarker = function (i, locations,idKey) {
	        	var productString = '';
	        	if(locations[i].products && locations[i].products.length >0){
	        		productString = locations[i].products.join(", ");
	        	}
	        	
                var ret = {
            	        latitude:  locations[i].latitude,
            	        longitude:  locations[i].longitude,
            	        title:  locations[i].farmName,
            	        address:  locations[i].address,
            	        products : productString,
            	        city: locations[i].city,
            	        link:'#/detail/'+$rootScope.filteredLocations[i].id,
                        show: false,
            	      };
              ret.onClick = function() {
            	  $scope.openWindow.show = false;
                  ret.show = !ret.show;
            	  $scope.openWindow = ret;

	              //window.console.log("Clicked!");

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
	                    locationRepository.list(serverURL).then(function (result) {
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
           

           $scope.$watchCollection('filteredLocations', function(oldlocations, newlocations) {
        	   if($rootScope.filteredLocations){
        		   initializeMarkers();
        	   }
           });


    }]);