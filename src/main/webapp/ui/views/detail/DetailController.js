angular.module('foodbankfarm')
    .controller('DetailController', [
        '$q',
        '$rootScope',
        '$routeParams',
        '$scope',
        'LocationRepository',
        function ($q,$rootScope,$route,$scope,locationRepository) {
        	$scope.farm ={};
        	var routeID = Number($route.id);

            if(!$rootScope.filteredLocations){
            	//retrieving list of locations
	            locationRepository.list('queryString').then(function (result) {
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
        	
        }
    ]);