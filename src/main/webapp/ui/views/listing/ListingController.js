angular.module('foodbankfarm')
    .controller('ListingController', [
        '$rootScope',
        '$scope',
        '$location',
        'LocationRepository',
        function ($rootScope,$scope,$location,locationRepository) {
            $scope.locations = [];
            $rootScope.locations = [];
            $scope.shouldShowFilter = false;
            
            //retrieving list of locations
            locationRepository.list('queryString').then(function (result) {
                $scope.locations = result.data;
                $rootScope.locations = result.data;
                $rootScope.filteredLocations = result.data;
                $rootScope.getCategoriesFromLocation();
            });  
             
            $scope.viewDetail  = function(id){
            	 $location.path('/detail/' + id);
            };
        }
    ]);