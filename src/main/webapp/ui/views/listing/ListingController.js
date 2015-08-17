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
        
        

}]);