angular.module('foodbankfarm')
    .controller('DetailController', [
        '$q',
        '$rootScope',
        '$routeParams',
        '$scope',
        function ($q,$rootScope,$route,$scope) {
        	$scope.farm ={};
        	var routeID = Number($route.id);
            var farmSelected = _.findWhere($rootScope.locations, {'id' : routeID});
            $scope.farm = farmSelected;
        	
        }
    ]);