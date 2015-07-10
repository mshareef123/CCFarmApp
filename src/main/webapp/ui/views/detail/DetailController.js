angular.module('foodbankfarm')
    .controller('DetailController', [
        '$q',
        '$rootScope',
        '$routeParams',
        '$scope',
        function ($q,$rootScope,$route,$scope) {
        	$scope.farm ={};
            var farmSelected = _($rootScope.locations).findWhere(function (farm) { return farm.id== $route.id; });
        	$scope.farm = farmSelected;
        	var filterTemplate = $templateCache.get('filter.html');
        }
    ]);