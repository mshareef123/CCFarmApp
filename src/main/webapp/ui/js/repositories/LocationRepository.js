angular.module('foodbankfarm.repositories')
    .factory('LocationRepository', [
        '$http',
        function ($http) {
            //var serverUrl = 'http://localhost:8080/controller';
            //var serverUrl = 'http://52.24.208.79/foodbankfarm/controller';//server upload
            return {
					list: function (serverURL) {
						Require.IsNotNull(serverURL, 'serverURL');
						return $http.get(serverURL + 'api/LocationService/GetLocations/');
					}
                };
            }
    ]);