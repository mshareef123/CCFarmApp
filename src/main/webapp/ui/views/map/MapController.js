angular.module('foodbankfarm.map', ['uiGmapgoogle-maps'])
    .controller('MapController', 
    		['$rootScope',
    		 '$location',
             '$scope',
             function($rootScope,$location,$scope) {
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
            	        link:'#/detail/'+i,
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
	                        id:i,
	                        place_id: place.place_id,
	                        title: 'Search Location!!!',
	                        latitude: place.geometry.location.lat(),
	                        longitude: place.geometry.location.lng(),
	                        address:place.adr_address,
	            	        link:'#/detail/'+i

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
	              var markers = [];
	              for (var i = 0; i < $rootScope.filteredLocations.length; i++) {
	                markers.push(createMarker(i, $rootScope.filteredLocations,'id'));
	              }
	              $scope.farmmarkers = markers;
	          }, true);
	        
	        $scope.viewDetail  = function(id){
           	 $location.path('/detail/' + id);
           };

    }]);