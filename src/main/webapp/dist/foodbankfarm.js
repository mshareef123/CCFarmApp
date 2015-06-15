'use strict';
angular.module('foodbankfarm.directives', []);
angular.module('foodbankfarm.repositories', []);

var foodbankfarm = angular.module('foodbankfarm', [
    'ngCookies',
    'ngRoute',
    'ngLocale',
    'ngTouch',
    'ngResource',
    'foodbankfarm.directives',
    'foodbankfarm.repositories',
    'ui.bootstrap'
]);

foodbankfarm.config([
    '$routeProvider',
    '$locationProvider',
    '$httpProvider',
    function (router) {
        router
            .when('/home/', {
                templateUrl: 'dist/views/home.html',
                controller: 'HomeController'
            })
            .when('/listings/', {
                templateUrl: 'dist/views/listing.html',
                controller: 'ListingController'
            }).otherwise({
                templateUrl: 'dist/views/home.html',
                controller: 'HomeController'
            });
    }]
);
angular.module('foodbankfarm.repositories')
    .factory('LocationRepository', [
        '$http',
        function ($http) {
            var serverUrl = 'http://localhost:8080/controller';
            return {
					list: function (query) {
						Require.IsNotNull(query, 'query');
						return $http.get(serverUrl + '/listing?queryString' + query);
					}
                };
            }
    ]);
window.Require = {
    /// <summary>Checks value(s) for null, undefined, or truthyness</summary>

    IsNotNull: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is null or undefined</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is null or undefined</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value === undefined) {
            throw new Error('The ' + (name || 'value') + ' cannot be undefined.');
        }
        else if (value === null) {
            throw new Error('The ' + (name || 'value') + ' cannot be null.');
        }
    },

    IsNotNullOrWhiteSpace: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is null, undefined, or contains only white space characters</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is null, undefined, or contains only white space characters</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value !== undefined && (value === '' || (value.trim && value.trim() === ''))) {
            throw new Error('The ' + (name || 'value') + ' cannot contain only white space characters.');
        }
        else {
            Require.IsNotNull(value, name);
        }
    },

    AreNotNullOrWhiteSpace: function (values) {
        /// <summary>Throws an error if any element of values is null, undefined, or contains only white space characters</summary>
        /// <param name="values" type="Array">Array of objects to evaluate.</param>

        for (var idx in values) {
            Require.IsNotNullOrWhiteSpace(values[idx]);
        }
    },

    AreNotNull: function (values) {
        /// <summary>Throws an error if any element of values is null or undefined</summary>
        /// <param name="values" type="Array">Array of objects to evaluate.</param>

        for (var idx in values) {
            Require.IsNotNull(values[idx]);
        }
    },

    Is: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is not true</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is not true</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value !== true) {
            throw new Error('The ' + (name || 'value') + ' must be true.');
        }
    }
};
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