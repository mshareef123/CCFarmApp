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