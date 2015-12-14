	angular.module('foodbankfarm.map', ['uiGmapgoogle-maps'])
    .controller('MapController', 
    		['$rootScope',
    	      '$routeParams',
    		 '$location',
             '$scope',
             'LocationRepository',
             'uiGmapIsReady',
             function($rootScope,$route,$location,$scope,locationRepository, IsReady) {
    		//$scope.locations = $rootScope.filteredLocations
    	    var routeID = 0;
    	    if($route.id){
    	    	routeID = Number($route.id);
    	    }
             var serverURL =  $location.absUrl().split('#')[0];
            $scope.shouldShowFilter = false;
	        $scope.map = {center: {latitude: 40.0010204, longitude: -75.8069082 }, zoom: 9 };// chester county long lat
	        
	        $scope.options = {scrollwheel: false};
	        $scope.farmmarkers = [];
	        $scope.openWindow = {};
	        var createMarker = function (i, locations,idKey) {
	        	var productString = '';
	        	if(locations[i].products && locations[i].products.length >0){
	        		productString = locations[i].products.join(", ");
	        	}
	        	var showInfoWindowOpen = false;
	        	if(routeID==$rootScope.filteredLocations[i].id){
	        		showInfoWindowOpen = true;
	        	}
                var ret = {
            	        latitude:  locations[i].latitude,
            	        longitude:  locations[i].longitude,
            	        title:  locations[i].farmName,
            	        address:  locations[i].address,
            	        products : productString,
            	        city: locations[i].city,
            	        link:'#/detail/'+$rootScope.filteredLocations[i].id,
                        show: showInfoWindowOpen,
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
	                      //newMarkers.push(marker);

	                      bounds.extend(place.geometry.location);
	                    }
	                }
	              }
	        $scope.searchbox = { template:'searchbox.tpl.html', 
					 events  : events,
					 position: 'top-left', 
					 options : {}
					};
	        
	        IsReady.promise().then( function (maps) {
//	        	google.maps.event.addListener($scope.map, "bounds_changed", function() {var bounds = $scope.map.getBounds(); $scope.searchbox.options.bounds = bounds; console.log(bounds)});
		        var bounds = new google.maps.LatLngBounds(
		      			  new google.maps.LatLng(40.241721, -75.359296), //NE: 40.241721, -75.359296
		      			  new google.maps.LatLng(39.721712, -76.135703))//SW: 39.721712, -76.135703
	      	 $scope.searchbox.options.bounds = bounds;
		      var countyBorderFirstLine = [
	    		                           	new google.maps.LatLng(39.83727,-75.59623),
	    		                           	new google.maps.LatLng(39.83635,-75.60473),
	    		                           	new google.maps.LatLng(39.8351,-75.61297),
	    		                           	new google.maps.LatLng(39.83365,-75.62078),
	    		                           	new google.maps.LatLng(39.83207,-75.6273),
	    		                           	new google.maps.LatLng(39.83022,-75.63537),
	    		                           	new google.maps.LatLng(39.826336,-75.650053),
	    		                           	new google.maps.LatLng(39.82389700000001,-75.656919),
	    		                           	new google.maps.LatLng(39.821062,-75.664043),
	    		                           	new google.maps.LatLng(39.818228,-75.671082),
	    		                           	new google.maps.LatLng(39.81592,-75.67897),
	    		                           	new google.maps.LatLng(39.81196,-75.68618),
	    		                           	new google.maps.LatLng(39.80853,-75.69374),
	    		                           	new google.maps.LatLng(39.80563,-75.69957),
	    		                           	new google.maps.LatLng(39.80194,-75.70507),
	    		                           	new google.maps.LatLng(39.79719,-75.71056),
	    		                           	new google.maps.LatLng(39.793172,-75.716057),
	    		                           	new google.maps.LatLng(39.7898,-75.72086),
	    		                           	new google.maps.LatLng(39.785257,-75.726357),
	    		                           	new google.maps.LatLng(39.78163,-75.7315),
	    		                           	new google.maps.LatLng(39.776221,-75.736313),
	    		                           	new google.maps.LatLng(39.77081,-75.74249),
	    		                           	new google.maps.LatLng(39.76157,-75.75004),
	    		                           	new google.maps.LatLng(39.75629,-75.75485),
	    		                           	new google.maps.LatLng(39.75049,-75.75828),
	    		                           	new google.maps.LatLng(39.74521,-75.76206),
	    		                           	new google.maps.LatLng(39.73966,-75.76549),
	    		                           	new google.maps.LatLng(39.73438,-75.76824),
	    		                           	new google.maps.LatLng(39.7291,-75.77133),
	    		                           	new google.maps.LatLng(39.72224,-75.77304),
	    		                           	new google.maps.LatLng(39.72171,-76.13662),
	    		                           	new google.maps.LatLng(39.72514,-76.13697),
	    		                           	new google.maps.LatLng(39.72686,-76.13439),
	    		                           	new google.maps.LatLng(39.72738,-76.13147),
	    		                           	new google.maps.LatLng(39.72765,-76.1277),
	    		                           	new google.maps.LatLng(39.72659,-76.12495),
	    		                           	new google.maps.LatLng(39.72369,-76.12306),
	    		                           	new google.maps.LatLng(39.72369,-76.12031),
	    		                           	new google.maps.LatLng(39.72554,-76.11808),
	    		                           	new google.maps.LatLng(39.72857,-76.1198),
	    		                           	new google.maps.LatLng(39.73095,-76.12049),
	    		                           	new google.maps.LatLng(39.732530000000004,-76.11963),
	    		                           	new google.maps.LatLng(39.73557,-76.12083),
	    		                           	new google.maps.LatLng(39.73636,-76.11928),
	    		                           	new google.maps.LatLng(39.73689,-76.11568),
	    		                           	new google.maps.LatLng(39.73676,-76.11173),
	    		                           	new google.maps.LatLng(39.73465000000001,-76.1083),
	    		                           	new google.maps.LatLng(39.73016,-76.11036),
	    		                           	new google.maps.LatLng(39.72844,-76.11122),
	    		                           	new google.maps.LatLng(39.72395,-76.1059),
	    		                           	new google.maps.LatLng(39.72422,-76.1016),
	    		                           	new google.maps.LatLng(39.72738,-76.10092),
	    		                           	new google.maps.LatLng(39.72976,-76.09594),
	    		                           	new google.maps.LatLng(39.73293,-76.09388),
	    		                           	new google.maps.LatLng(39.73438,-76.09285),
	    		                           	new google.maps.LatLng(39.73715,-76.09611),
	    		                           	new google.maps.LatLng(39.73808,-76.09937),
	    		                           	new google.maps.LatLng(39.73966,-76.10212),
	    		                           	new google.maps.LatLng(39.7427,-76.10075),
	    		                           	new google.maps.LatLng(39.7456,-76.10092),
	    		                           	new google.maps.LatLng(39.74428,-76.09783),
	    		                           	new google.maps.LatLng(39.74283,-76.09508),
	    		                           	new google.maps.LatLng(39.74362000000001,-76.09096),
	    		                           	new google.maps.LatLng(39.74692,-76.08581),
	    		                           	new google.maps.LatLng(39.75299,-76.08341),
	    		                           	new google.maps.LatLng(39.75471,-76.08375),
	    		                           	new google.maps.LatLng(39.75603,-76.08598),
	    		                           	new google.maps.LatLng(39.76025,-76.08341),
	    		                           	new google.maps.LatLng(39.76223,-76.08015),
	    		                           	new google.maps.LatLng(39.76144,-76.07414),
	    		                           	new google.maps.LatLng(39.76012,-76.06899),
	    		                           	new google.maps.LatLng(39.76197,-76.06521),
	    		                           	new google.maps.LatLng(39.765,-76.06264),
	    		                           	new google.maps.LatLng(39.77094,-76.06504),
	    		                           	new google.maps.LatLng(39.77542,-76.06058),
	    		                           	new google.maps.LatLng(39.78031,-76.05869),
	    		                           	new google.maps.LatLng(39.78163,-76.05371000000001),
	    		                           	new google.maps.LatLng(39.78519,-76.04942),
	    		                           	new google.maps.LatLng(39.78967,-76.04873),
	    		                           	new google.maps.LatLng(39.79099,-76.04427),
	    		                           	new google.maps.LatLng(39.79376,-76.04444000000001),
	    		                           	new google.maps.LatLng(39.79732,-76.04084),
	    		                           	new google.maps.LatLng(39.7993,-76.04461),
	    		                           	new google.maps.LatLng(39.80207,-76.04856),
	    		                           	new google.maps.LatLng(39.8026,-76.05011),
	    		                           	new google.maps.LatLng(39.80444,-76.04787),
	    		                           	new google.maps.LatLng(39.80194,-76.04066),
	    		                           	new google.maps.LatLng(39.80141,-76.03843),
	    		                           	new google.maps.LatLng(39.80695,-76.03603),
	    		                           	new google.maps.LatLng(39.81275,-76.03551000000002),
	    		                           	new google.maps.LatLng(39.8146,-76.03191),
	    		                           	new google.maps.LatLng(39.81921,-76.03157),
	    		                           	new google.maps.LatLng(39.82383,-76.03637),
	    		                           	new google.maps.LatLng(39.82633,-76.03654),
	    		                           	new google.maps.LatLng(39.82541,-76.03208),
	    		                           	new google.maps.LatLng(39.82356,-76.0271),
	    		                           	new google.maps.LatLng(39.82791,-76.02333),
	    		                           	new google.maps.LatLng(39.83042,-76.02298),
	    		                           	new google.maps.LatLng(39.83029,-76.01921),
	    		                           	new google.maps.LatLng(39.83200000000001,-76.01663),
	    		                           	new google.maps.LatLng(39.83516,-76.0168),
	    		                           	new google.maps.LatLng(39.8374,-76.01783),
	    		                           	new google.maps.LatLng(39.83991,-76.01989),
	    		                           	new google.maps.LatLng(39.84294,-76.01972),
	    		                           	new google.maps.LatLng(39.84518,-76.02075),
	    		                           	new google.maps.LatLng(39.84874,-76.02075),
	    		                           	new google.maps.LatLng(39.85032,-76.02212),
	    		                           	new google.maps.LatLng(39.85348,-76.02024),
	    		                           	new google.maps.LatLng(39.85414,-76.01594),
	    		                           	new google.maps.LatLng(39.85322,-76.012),
	    		                           	new google.maps.LatLng(39.85282,-76.00736),
	    		                           	new google.maps.LatLng(39.85599,-76.00736),
	    		                           	new google.maps.LatLng(39.85968,-76.00685),
	    		                           	new google.maps.LatLng(39.863240000000005,-76.00616),
	    		                           	new google.maps.LatLng(39.866400000000006,-76.00599),
	    		                           	new google.maps.LatLng(39.87009,-76.0041),
	    		                           	new google.maps.LatLng(39.87298,-76.0041),
	    		                           	new google.maps.LatLng(39.87522,-76.00101),
	    		                           	new google.maps.LatLng(39.87351,-75.99758),
	    		                           	new google.maps.LatLng(39.87193,-75.99878),
	    		                           	new google.maps.LatLng(39.87022,-75.99449),
	    		                           	new google.maps.LatLng(39.86877,-75.99123),
	    		                           	new google.maps.LatLng(39.87206,-75.9902),
	    		                           	new google.maps.LatLng(39.87298,-75.98779),
	    		                           	new google.maps.LatLng(39.87549,-75.98693),
	    		                           	new google.maps.LatLng(39.87891,-75.98934),
	    		                           	new google.maps.LatLng(39.88181,-75.99208),
	    		                           	new google.maps.LatLng(39.88497,-75.99071000000002),
	    		                           	new google.maps.LatLng(39.88682,-75.99174),
	    		                           	new google.maps.LatLng(39.89169,-75.98831),
	    		                           	new google.maps.LatLng(39.89498,-75.98728),
	    		                           	new google.maps.LatLng(39.89814,-75.99123),
	    		                           	new google.maps.LatLng(39.89907,-75.99346),
	    		                           	new google.maps.LatLng(39.89854,-75.99586),
	    		                           	new google.maps.LatLng(39.90288,-75.99483),
	    		                           	new google.maps.LatLng(39.90552000000001,-75.99638),
	    		                           	new google.maps.LatLng(39.90894,-75.99706),
	    		                           	new google.maps.LatLng(39.91079,-75.99689),
	    		                           	new google.maps.LatLng(39.91381,-75.99603),
	    		                           	new google.maps.LatLng(39.91671,-75.99586),
	    		                           	new google.maps.LatLng(39.92013,-75.99672),
	    		                           	new google.maps.LatLng(39.92263,-75.99723),
	    		                           	new google.maps.LatLng(39.92474,-75.99638),
	    		                           	new google.maps.LatLng(39.92724,-75.99741),
	    		                           	new google.maps.LatLng(39.92895,-75.99723),
	    		                           	new google.maps.LatLng(39.92672,-75.99243),
	    		                           	new google.maps.LatLng(39.92935000000001,-75.9914),
	    		                           	new google.maps.LatLng(39.93053,-75.98659),
	    		                           	new google.maps.LatLng(39.93238,-75.98539),
	    		                           	new google.maps.LatLng(39.9329,-75.98213),
	    		                           	new google.maps.LatLng(39.93501,-75.98247),
	    		                           	new google.maps.LatLng(39.93738,-75.98436),
	    		                           	new google.maps.LatLng(39.93896,-75.98676),
	    		                           	new google.maps.LatLng(39.9408,-75.98865),
	    		                           	new google.maps.LatLng(39.943430000000006,-75.98899),
	    		                           	new google.maps.LatLng(39.9458,-75.99191),
	    		                           	new google.maps.LatLng(39.94949,-75.99226),
	    		                           	new google.maps.LatLng(39.95291,-75.995),
	    		                           	new google.maps.LatLng(39.95646,-75.99569),
	    		                           	new google.maps.LatLng(39.9583,-75.99483),
	    		                           	new google.maps.LatLng(39.96475,-75.99741),
	    		                           	new google.maps.LatLng(39.96791,-75.99741),
	    		                           	new google.maps.LatLng(40.03918,-75.93595000000002),
	    		                           	new google.maps.LatLng(40.10775,-75.94385),
	    		                           	new google.maps.LatLng(40.13807,-75.86952),
	    		                           	new google.maps.LatLng(40.2414,-75.69562),
	    		                           	new google.maps.LatLng(40.23747000000001,-75.6915),
	    		                           	new google.maps.LatLng(40.23616,-75.68876),
	    		                           	new google.maps.LatLng(40.23878,-75.68224),
	    		                           	new google.maps.LatLng(40.24232,-75.67674),
	    		                           	new google.maps.LatLng(40.24481,-75.67091),
	    		                           	new google.maps.LatLng(40.2452,-75.66524),
	    		                           	new google.maps.LatLng(40.2431,-75.66095),
	    		                           	new google.maps.LatLng(40.24075,-75.6546),
	    		                           	new google.maps.LatLng(40.24206,-75.65082),
	    		                           	new google.maps.LatLng(40.24009,-75.64653),
	    		                           	new google.maps.LatLng(40.23734000000001,-75.64155),
	    		                           	new google.maps.LatLng(40.23537,-75.6376),
	    		                           	new google.maps.LatLng(40.23419,-75.63159),
	    		                           	new google.maps.LatLng(40.23183,-75.62662),
	    		                           	new google.maps.LatLng(40.23052,-75.62044),
	    		                           	new google.maps.LatLng(40.22528,-75.61683000000001),
	    		                           	new google.maps.LatLng(40.22266,-75.60859000000002),
	    		                           	new google.maps.LatLng(40.22712,-75.60344),
	    		                           	new google.maps.LatLng(40.23105,-75.60482),
	    		                           	new google.maps.LatLng(40.23524,-75.60756),
	    		                           	new google.maps.LatLng(40.23839,-75.60447),
	    		                           	new google.maps.LatLng(40.23813,-75.59761),
	    		                           	new google.maps.LatLng(40.23183,-75.59486),
	    		                           	new google.maps.LatLng(40.22423,-75.59177),
	    		                           	new google.maps.LatLng(40.21532,-75.58834),
	    		                           	new google.maps.LatLng(40.20772,-75.58181),
	    		                           	new google.maps.LatLng(40.20221,-75.57941),
	    		                           	new google.maps.LatLng(40.19539,-75.57529),
	    		                           	new google.maps.LatLng(40.19434,-75.56774),
	    		                           	new google.maps.LatLng(40.19801,-75.56327),
	    		                           	new google.maps.LatLng(40.20273,-75.56259),
	    		                           	new google.maps.LatLng(40.20693,-75.56568),
	    		                           	new google.maps.LatLng(40.2106,-75.56362),
	    		                           	new google.maps.LatLng(40.207190000000004,-75.55675),
	    		                           	new google.maps.LatLng(40.19434,-75.55126),
	    		                           	new google.maps.LatLng(40.1828,-75.54542),
	    		                           	new google.maps.LatLng(40.17388,-75.53958),
	    		                           	new google.maps.LatLng(40.17074,-75.53203),
	    		                           	new google.maps.LatLng(40.16418,-75.52791),
	    		                           	new google.maps.LatLng(40.15473,-75.52757),
	    		                           	new google.maps.LatLng(40.14975,-75.52722),
	    		                           	new google.maps.LatLng(40.14712,-75.5207),
	    		                           	new google.maps.LatLng(40.15631,-75.51487),
	    		                           	new google.maps.LatLng(40.16024,-75.50937),
	    		                           	new google.maps.LatLng(40.15867,-75.50251),
	    		                           	new google.maps.LatLng(40.15237,-75.50285),
	    		                           	new google.maps.LatLng(40.14633,-75.50834000000002),
	    		                           	new google.maps.LatLng(40.13951,-75.51006)
	    		                           ];
		      var countyBorderSecondLine = [
		                      	new google.maps.LatLng(40.139647,-75.510578),
		                      	new google.maps.LatLng(40.133216,-75.505772),
		                      	new google.maps.LatLng(40.127835,-75.495129),
		                      	new google.maps.LatLng(40.125603,-75.489464),
		                      	new google.maps.LatLng(40.129279,-75.475903),
		                      	new google.maps.LatLng(40.129016,-75.470066),
		                      	new google.maps.LatLng(40.124816,-75.46114),
		                      	new google.maps.LatLng(40.120353,-75.46217),
		                      	new google.maps.LatLng(40.116546,-75.470581),
		                      	new google.maps.LatLng(40.111951,-75.472813),
		                      	new google.maps.LatLng(40.10473,-75.467834),
		                      	new google.maps.LatLng(40.102892,-75.461483),
		                      	new google.maps.LatLng(40.098034,-75.46217),
		                      	new google.maps.LatLng(40.096458,-75.460625),
		                      	new google.maps.LatLng(40.094357,-75.456161),
		                      	new google.maps.LatLng(40.089235,-75.456505),
		                      	new google.maps.LatLng(40.094357,-75.441914),
		                      	new google.maps.LatLng(40.089629,-75.438995),
		                      	new google.maps.LatLng(40.097377,-75.420113),
		                      	new google.maps.LatLng(40.060731,-75.392475),
		                      	new google.maps.LatLng(40.07216,-75.366898),
		                      	new google.maps.LatLng(40.06638,-75.361748),
		                      	new google.maps.LatLng(39.995402,-75.45375800000001),
		                      	new google.maps.LatLng(39.993561,-75.453587),
		                      	new google.maps.LatLng(39.993693,-75.45187),
		                      	new google.maps.LatLng(39.994087,-75.44981),
		                      	new google.maps.LatLng(39.993956,-75.445862),
		                      	new google.maps.LatLng(39.993824,-75.443287),
		                      	new google.maps.LatLng(39.992115,-75.442257),
		                      	new google.maps.LatLng(39.992641,-75.440369),
		                      	new google.maps.LatLng(39.993693,-75.438652),
		                      	new google.maps.LatLng(39.991325,-75.438309),
		                      	new google.maps.LatLng(39.989879,-75.437279),
		                      	new google.maps.LatLng(39.98738,-75.43573400000001),
		                      	new google.maps.LatLng(39.984092,-75.43642),
		                      	new google.maps.LatLng(39.944226,-75.524654),
		                      	new google.maps.LatLng(39.939356,-75.520363),
		                      	new google.maps.LatLng(39.938567,-75.521736),
		                      	new google.maps.LatLng(39.935408,-75.51899),
		                      	new google.maps.LatLng(39.933565,-75.525684),
		                      	new google.maps.LatLng(39.934881,-75.525856),
		                      	new google.maps.LatLng(39.933302,-75.530148),
		                      	new google.maps.LatLng(39.930669,-75.528774),
		                      	new google.maps.LatLng(39.922639,-75.523796),
		                      	new google.maps.LatLng(39.921323,-75.526199),
		                      	new google.maps.LatLng(39.922639,-75.527401),
		                      	new google.maps.LatLng(39.921586,-75.530148),
		                      	new google.maps.LatLng(39.929616,-75.536499),
		                      	new google.maps.LatLng(39.927115,-75.542336),
		                      	new google.maps.LatLng(39.924087,-75.540276),
		                      	new google.maps.LatLng(39.922771,-75.543537),
		                      	new google.maps.LatLng(39.91882100000001,-75.543022),
		                      	new google.maps.LatLng(39.91553,-75.550747),
		                      	new google.maps.LatLng(39.909341,-75.546799),
		                      	new google.maps.LatLng(39.90539100000001,-75.556412),
		                      	new google.maps.LatLng(39.908551,-75.558815),
		                      	new google.maps.LatLng(39.907761,-75.561218),
		                      	new google.maps.LatLng(39.904206,-75.558128),
		                      	new google.maps.LatLng(39.896568,-75.573063),
		                      	new google.maps.LatLng(39.893407,-75.570831),
		                      	new google.maps.LatLng(39.892221000000006,-75.574093),
		                      	new google.maps.LatLng(39.888665,-75.571003),
		                      	new google.maps.LatLng(39.883923,-75.582504),
		                      	new google.maps.LatLng(39.885241,-75.583534),
		                      	new google.maps.LatLng(39.88366,-75.585251),
		                      	new google.maps.LatLng(39.883923,-75.588169),
		                      	new google.maps.LatLng(39.881025,-75.586109),
		                      	new google.maps.LatLng(39.874702,-75.598297),
		                      	new google.maps.LatLng(39.872594,-75.596924),
		                      	new google.maps.LatLng(39.870618,-75.59520700000002),
		                      	new google.maps.LatLng(39.868642,-75.592632),
		                      	new google.maps.LatLng(39.867061,-75.594006),
		                      	new google.maps.LatLng(39.865875,-75.596066),
		                      	new google.maps.LatLng(39.863371,-75.596409),
		                      	new google.maps.LatLng(39.861131,-75.598125),
		                      	new google.maps.LatLng(39.857969,-75.6007),
		                      	new google.maps.LatLng(39.85507,-75.601387),
		                      	new google.maps.LatLng(39.854016,-75.597267),
		                      	new google.maps.LatLng(39.852829,-75.592976),
		                      	new google.maps.LatLng(39.850984,-75.592289),
		                      	new google.maps.LatLng(39.850062,-75.594521),
		                      	new google.maps.LatLng(39.844658,-75.595722),
		                      	new google.maps.LatLng(39.842286,-75.596924),
		                      	new google.maps.LatLng(39.840441,-75.598125),
		                      	new google.maps.LatLng(39.838464,-75.59761),
		                      	new google.maps.LatLng(39.837145,-75.595894)
		                      ];
		      
		      $scope.polylines = [{
		                            id:1,
		                            path:countyBorderFirstLine,
		                            stroke: { 
		                            	color: "#ff0000",
		                            	weight:2
		                            },
		      						editable:false,
		      						draggable:false,
		      						geodesic:true,
		      						visible:true
	          }, {
	        	  id:2,
	        	  path:countyBorderSecondLine,
	        	  stroke: { 
                  	color: "#ff0000",
                  	weight:2
                  },
					editable:false,
					draggable:false,
					geodesic:true,
					visible:true
	          }];  	    		        	         
	
	        
	        });
	        
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