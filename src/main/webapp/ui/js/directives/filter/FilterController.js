angular.module('foodbankfarm') 
    .controller('FilterController', ['$scope','$rootScope', function ($scope,$rootScope) {
    	
    	$scope.shouldShowSpecialtyProducts = false;
   		$scope.allCheckBoxSelected = false;     

    	//Setup our categories so that we can build them the UI page.
    	$rootScope.getCategoriesFromLocation = function () {
    		var categories = [];
    		for(var i = 0; i < $rootScope.locations.length; i++) {
       			var currentFarm = $rootScope.locations[i];
       			categories = _.union(categories, currentFarm.specialities);
       		}  
    
    		$rootScope.filterCheckBoxes = [];
        	for (var i = 0; i < categories.length; i++) {
        		var checkBoxObject = {label : categories[i] , isSelected: false};
        		$rootScope.filterCheckBoxes.push(checkBoxObject);
        	}
    	};  
    	
    	//Toggles all the checkboxes selected or not when you toggle all
    	$scope.allCheckBoxChanged = function () {     
    		var setterValue = false;
    		if($scope.allCheckBoxSelected) {
    			setterValue = true;
    		} 
    		
    		for (var i = 0; i < $rootScope.filterCheckBoxes.length; i++) {
    			var currentBox = $rootScope.filterCheckBoxes[i];
    			currentBox.isSelected = setterValue;
        	}
    		$scope.checkBoxChanged();
    	}	 
    	
    	$scope.checkBoxChanged = function () {
    		var allFilters = angular.copy($rootScope.filterCheckBoxes);
    		var currentFilters = _.remove(allFilters, function(filter) {
    			  return filter.isSelected == true;
    		}); 
    		
    		//Okay now we need to just get the labels...probably a better way to do this, couldn't think of one at the moment so this'll do for now.
    		var filterLabels = [];
    		for(var i = 0; i < currentFilters.length; i++) {
    			var currentFilterLabel = currentFilters[i].label;
    			filterLabels.push(currentFilterLabel);
    		}
    		
    		//Our actual filtering is rather simple - we will just intersect the specialties on each product with our filter labels, and if the intersection
    		//isn't empty we know we found a product in our filter range.  So we just add it to our result set.
    		var filteredLocations = [];
    		for(var i = 0; i < $rootScope.locations.length; i++) {
    			var currentLocation = $rootScope.locations[i];
    			var intersectedProducts = _.intersection(currentLocation.specialities, filterLabels)
    			if(intersectedProducts.length > 0) {
    				filteredLocations.push(currentLocation);
    			}
    		}
    		
    		//This little check is for the condition when you turned off all the filters and we need to go back to basic state
    		if(currentFilters.length != 0) {
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
