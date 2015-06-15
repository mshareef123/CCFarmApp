angular.module('foodbankfarm')
    .controller('HomeController', [
        '$scope',
        function ($scope) {
            $scope.responsible = {
                name: 'Aziz',
                email: 'abdulaziz.ergashev@gmail.com'
            };
        }
    ]);