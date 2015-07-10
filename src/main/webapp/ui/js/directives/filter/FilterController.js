angular.module('foodbankfarm')
    .controller('FilterController', ['$scope','$rootScope', function ($scope,$rootScope) {
    	
    	$rootScope.shouldShowSpecialtyProducts = false;
    	
    	$rootScope.checkboxModel = {
    			allField : false,
        		specialtyProductField : false,
        		farmOutletField : false,
        		csaField : false,
        		farmersMarketField : false,
        		retailOutletField : false,
        		foodBankPartnerField : false,
        		acceptSNAPField : false,
        		honeyField : false,
        		treeFarmField : false,
        		milkAndIceCreamField : false,
        		cheeseField : false,
        		mushroomField : false,
        		wineField : false
        };
        	
    	$scope.checkBoxChanged = function () {
    		alert("hi");
    	}
    }]);

angular.module('foodbankfarm.directives')
.directive("filterView", [
                         function () {
                             return {
                                 templateUrl: 'dist/directives/filter.html',
                                 restrict: 'E',
                                 transclude: true,
                                 replace: true,
                             };
                         }]
                     );
