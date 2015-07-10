angular.module('foodbankfarm.map', ['uiGmapgoogle-maps'])
    .controller('MapController', function($scope) {
        $scope.map = {center: {latitude: 39.9606643, longitude: -75.6054882 }, zoom: 14 };
        $scope.options = {scrollwheel: false};
    });