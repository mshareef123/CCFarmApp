angular.module('foodbankfarm')
    .controller('ListingController', [
        '$scope',
        'LocationRepository',
        function ($scope,locationRepository) {
            $scope.locations = [];
            
            //retrieving list of locations
            locationRepository.list('anystring').then(function (result) {
                $scope.locations = result.data;
            });
        }
    ]);