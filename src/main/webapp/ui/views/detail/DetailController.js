angular.module('foodbankfarm')
    .controller('DetailController', [
        '$q',
        '$rootScope',
        '$routeParams',
        '$scope',
        '$location',
        'LocationRepository',
        function ($q,$rootScope,$route,$scope,$location,locationRepository) {
        	$scope.farm ={};
        	var routeID = Number($route.id);
            var serverURL =  $location.absUrl().split('#')[0];

            if(!$rootScope.filteredLocations){
            	//retrieving list of locations
	            locationRepository.list(serverURL).then(function (result) {
	            	$scope.locations = result.data;
	                $rootScope.locations = result.data;
	                $rootScope.filteredLocations = result.data;
	                //$rootScope.getCategoriesFromLocation();
	                var farmSelected = _.findWhere($rootScope.locations, {'id' : routeID});
	                $scope.farm = farmSelected;

	            });  
            }else{
                var farmSelected = _.findWhere($rootScope.locations, {'id' : routeID});
                $scope.farm = farmSelected;
            	
            }
        	
            $scope.showOnMap = function(){
            	$location.path('/map/'+$route.id);
            }
            
            $scope.showOnGoogleMaps = function(){
            	window.open(
            			"https://maps.google.com?daddr="+$scope.farm.address+" "+$scope.farm.city+" "+$scope.farm.state+" "+$scope.farm.zip,
            			'_blank');

            }
        }
    ]);