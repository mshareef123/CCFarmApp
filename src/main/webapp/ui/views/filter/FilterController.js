angular.module('foodbankfarm')
    .controller('FilterController', [
        '$scope',
        'LocationRepository',
        function ($scope) {
            $scope.responsible = {
                name: 'Jared',
                email: 'jardavies89@gmail.com'
            };
        }
    ]);
