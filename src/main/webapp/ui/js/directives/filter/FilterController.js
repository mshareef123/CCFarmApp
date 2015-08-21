angular.module('foodbankfarm') 
    .controller('FilterController', ['$scope','$rootScope', function ($scope,$rootScope) {
    	
    	$scope.shouldShowSpecialtyProducts = false;
   		$scope.allCheckBoxSelected = false;     
   		$scope.allSpecialitySelected = false;
   		
    	//Setup our categories so that we can build them the UI page.
    	$rootScope.getCategoriesFromLocation = function () {
    		var products = [];
    		var specialities = [];
    		for(var i = 0; i < $rootScope.locations.length; i++) {
       			var currentFarm = $rootScope.locations[i];
       			products = _.union(products, currentFarm.products);  			
       			specialities = _.union(specialities, currentFarm.specialities);
       		}  
    
    		$rootScope.filterCheckBoxes = [];
    		$rootScope.specialityCheckBoxes = [];
    		
        	for (var i = 0; i < products.length; i++) {
        		var productLabel = products[i];
        		if(productLabel.length > 0) {
        			var checkBoxObject = {label : productLabel, isSelected: false};
        			$rootScope.filterCheckBoxes.push(checkBoxObject);
        		}
        	}
        	
        	for(var i = 0; i < specialities.length; i++) {
        		var specialtyLabel = specialities[i];
        		if(specialtyLabel.length > 0) {
        			var checkBoxObject = {label : specialities[i] , isSelected: false};
        			$rootScope.specialityCheckBoxes.push(checkBoxObject);
        		}
        	}
    	};  
    	
    	$scope.resetFilters = function() {
    		for(var i = 0; i < $rootScope.filterCheckBoxes.length; i++) {
    			var checkBoxObject = $rootScope.filterCheckBoxes[i];
    			checkBoxObject.isSelected = false;
    		}
    		
    		for(var i = 0; i < $rootScope.specialityCheckBoxes.length; i++) {
    			var checkBoxObject = $rootScope.specialityCheckBoxes[i];
    			checkBoxObject.isSelected = false;
    		}
    	}
    	
    	$scope.checkBoxChanged = function () {
    		var allProductFilters = angular.copy($rootScope.filterCheckBoxes);
    		var allSpecialityFilters = angular.copy($rootScope.specialityCheckBoxes);
    		
    		var currentProductFilters = _.remove(allProductFilters, function(filter) {
    			return filter.isSelected == true;
    		}); 
    		
    		var currentSpecialityFilters = _.remove(allSpecialityFilters, function(filter) {
    			return filter.isSelected == true;
    		}); 
    		
    		//Okay now we need to just get the labels...probably a better way to do this, couldn't think of one at the moment so this'll do for now.
    		var filterLabels = [];
    		
    		for(var i = 0; i < currentProductFilters.length; i++) {
    			var currentFilterLabel = currentProductFilters[i].label;
    			filterLabels.push(currentFilterLabel);
    		}
    		
    		for(var i = 0; i < currentSpecialityFilters.length; i++) {
    			var currentFilterLabel = currentSpecialityFilters[i].label;
    			filterLabels.push(currentFilterLabel);
    		}
    		
    		//Our actual filtering is rather simple - we will just intersect the specialties on each product with our filter labels, and if the intersection
    		//isn't empty we know we found a product in our filter range.  So we just add it to our result set.
    		var filteredLocations = [];
    		for(var i = 0; i < $rootScope.locations.length; i++) {
    			var currentLocation = $rootScope.locations[i];
    			var intersectedProducts = _.intersection(currentLocation.products, filterLabels)
    			var intersectedSpecialities = _.intersection(currentLocation.specialities, filterLabels);
    			var totalFilters = intersectedProducts.length + intersectedSpecialities.length;
    			if(totalFilters == filterLabels.length) {
    				filteredLocations.push(currentLocation);
    			}
    		}
    		
    		//This little check is for the condition when you turned off all the filters and we need to go back to basic state
    		if(currentProductFilters.length != 0 || currentSpecialityFilters.length != 0) {
    			$rootScope.filteredLocations = filteredLocations;
    		} else {
    			$rootScope.filteredLocations = angular.copy($rootScope.locations);
    		}

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
