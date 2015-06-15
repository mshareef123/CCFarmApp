angular
    .module('foodbankfarm.directives')
    .directive("content", [
        function () {
            return {
                templateUrl: 'dist/directives/content.html',
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {}
            };
        }]
    );