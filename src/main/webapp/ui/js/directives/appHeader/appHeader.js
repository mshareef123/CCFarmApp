angular.module('foodbankfarm.directives')
    .directive("appHeader", [
        function () {
            return {
                templateUrl: 'dist/directives/appHeader.html',
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {}
            };
        }]
    );
