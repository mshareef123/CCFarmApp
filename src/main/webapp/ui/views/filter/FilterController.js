angular.module('foodbankfarm')
    .controller('FilterController', ['$scope','LocationRepository', function ($scope) {

    	
    	$scope.shouldShowSpecialtyProducts = false;
    	
    	$scope.checkboxModel = {
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
        	
    }]);

