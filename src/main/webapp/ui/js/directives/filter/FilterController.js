angular.module('foodbankfarm') 
    .controller('FilterController', ['$scope','$rootScope', function ($scope,$rootScope) {
   
    	//Setup our categories so that we can build them the UI page.

    	$rootScope.getCategoriesFromLocation = function () {
    		var products = [];
    		var typesOfOpp = [];
    		var specialDesignation = [];
    		
    		for(var i = 0; i < $rootScope.locations.length; i++) {
       			var currentFarm = $rootScope.locations[i];
       			products = _.union(products, currentFarm.products);  			
       			typesOfOpp = _.union(typesOfOpp, currentFarm.typeOfOperation);
       			specialDesignation = _.union(specialDesignation, currentFarm.designation);
       		}  
    
    		$rootScope.productCheckBoxes = [];
    		$rootScope.oppCheckBoxes = [];
    		$rootScope.designationCheckBoxes = [];
    		
        	for (var i = 0; i < products.length; i++) {
        		var productLabel = products[i];
        		if(productLabel.length > 0) {
        			var checkBoxObject = {label : productLabel, isSelected: false};
        			$rootScope.productCheckBoxes.push(checkBoxObject);
        		}
        	}
        	
        	for(var i = 0; i < typesOfOpp.length; i++) {
        		var oppLabel = typesOfOpp[i];
        		if(oppLabel.length > 0) {
        			var checkBoxObject = {label : oppLabel , isSelected: false};
        			$rootScope.oppCheckBoxes.push(checkBoxObject);
        		}
        	}
        	
        	for(var i = 0; i < specialDesignation.length; i++) {
        		var designationLabel = specialDesignation[i];
        		if(designationLabel.length > 0) {
        			var checkBoxObject = {label : designationLabel , isSelected: false};
        			$rootScope.designationCheckBoxes.push(checkBoxObject);
        		}
        	}
    	};  
    	
    	var resetFiltersForAllBoxes = function() {
    		for(var i = 0; i < $rootScope.productCheckBoxes.length; i++) {
    			var checkBoxObject = $rootScope.productCheckBoxes[i];
    			checkBoxObject.isSelected = false;
    		}
    		
    		for(var i = 0; i < $rootScope.oppCheckBoxes.length; i++) {
    			var checkBoxObject = $rootScope.oppCheckBoxes[i];
    			checkBoxObject.isSelected = false;
    		}
    		
    		for(var i = 0; i < $rootScope.designationCheckBoxes.length; i++) {
    			var checkBoxObject = $rootScope.designationCheckBoxes[i];
    			checkBoxObject.isSelected = false;
    		}
    	}
    	
    	$scope.resetFilters = function() {
    		//I'm hoping this helps the map update.
    		resetFiltersForAllBoxes();
    	}
    	
    	$scope.checkBoxChanged = function () {
    		var allProductFilters = angular.copy($rootScope.productCheckBoxes);
    		var allOppFilters = angular.copy($rootScope.oppCheckBoxes);
    		var allDesignationFilters = angular.copy($rootScope.designationCheckBoxes);
    		var filterLabels = [];
    		
    		//filter out all the not selected ones, and get the labels
    		
    		for(var i = 0; i < allProductFilters.length; i++) {
    			var currentBox = allProductFilters[i];
    			if(currentBox.isSelected) {
    				var currentFilterLabel = currentBox.label;
    				filterLabels.push(currentFilterLabel);
    			}
    		}
    		
    		for(var i = 0; i < allOppFilters.length; i++) {
    			var currentBox = allOppFilters[i];
    			if(currentBox.isSelected) {
    				var currentFilterLabel = currentBox.label;
    				filterLabels.push(currentFilterLabel);
    			}
    		}
    		
    		for(var i = 0; i < allDesignationFilters.length; i++) {
    			var currentBox = allDesignationFilters[i];
    			if(currentBox.isSelected) {
    				var currentFilterLabel = currentBox.label;
    				filterLabels.push(currentFilterLabel);
    			}
    		}
    		
    		//Our actual filtering is rather simple - we will just intersect the specialties on each product with our filter labels, and if the intersection
    		//isn't empty we know we found a product in our filter range.  So we just add it to our result set.
    		var filteredLocations = [];
    		for(var i = 0; i < $rootScope.locations.length; i++) {
    			var currentLocation = $rootScope.locations[i];
    			
    			var intersectedProducts = _.intersection(currentLocation.products, filterLabels)
    			var intersectedOpp = _.intersection(currentLocation.typeOfOperation, filterLabels);
    			var intersectedDesignation = _.intersection(currentLocation.designation, filterLabels);
    			
    			var totalFilters = intersectedProducts.length + intersectedOpp.length + intersectedDesignation.length;
    			
    			if(totalFilters == filterLabels.length) {
    				filteredLocations.push(currentLocation);
    			}
    		}

    		$rootScope.filteredLocations = filteredLocations;

    	};
    	
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
