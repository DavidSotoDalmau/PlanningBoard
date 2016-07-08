var app = angular.module('rootApp',['ngAnimate'])

    .controller('rootController',["$scope", "$http", "$window", function($scope, $http, $window){
	   $scope.types = ['Veggies','Dairy','Protein','Snacks', 'Beverages'];
	   $scope.selected_type = ""; 
	   $scope.showResults = false;
	   $scope.showBoard = true;
	   $scope.boardHTML = "planning_board.html";
	   $scope.resultsHTML = "results.html"; 
	   $scope.dragged_elem = "";
	   
	  
	   
	   $scope.isSelected = function(type){ // for ng-class to work
		   return $scope.selected_type === type;
	   }
	     
	   $scope.loadTable = function($event, type){
		   $scope.animeClass = "slideRight"; // add animation with slideRight class 
		   $scope.selected_type = type;
		   switch(type){
		   		case $scope.types[0]: // Veggies
		   			$scope.resultSet = ['Potato','Cucumber','Coliflower','Broccoli','Carrots'];
		   			break;
		   		case $scope.types[1]:// Dairy
		   			$scope.resultSet = ['Yogurt','Milk','Cheese'];
		   			break;
		   		case $scope.types[2]: // Protein
		   			$scope.resultSet = ['Tofu','Lentils','Eggs'];
		   			break;
		   		case $scope.types[3]: // Snacks
		   			$scope.resultSet = ['Roasted Peanuts','Chips','Cookies', 'Nutrition Bar'];
		   			break;
		   		case $scope.types[4]: // Beverages
		   			$scope.resultSet = ['Lemonade','Herbal Tea','Soda'];
		   			break; 
		   		default:
		   			$window.alert('Selected Not matched');
		   }
		   $scope.showResults = true; // show results table
		  
	   };
    }])
	 .directive('dragit', function($document, $window) {
		   function makeDraggable(scope, element, attr) {
		     angular.element(element).attr("draggable", "true");
		     element.on('dragstart', function(event) {
		       element.addClass('dragItem');
		       scope.$parent.dragged_elem = element;
		       event.originalEvent.dataTransfer.setData('Text', element.html());
		     });
		     
		     element.on('drag', function(event) {
		     });
		     element.on('dragend', function(event) {
		       event.preventDefault();
		       element.removeClass('dragItem');
		     });
		   }
		   return {
		     link: makeDraggable
		   };
	 })
    .directive('dropit', function($document, $window) {
    return {
	     restrict: 'A',
	     link: function makeDroppable(scope, element, attr){
	       element.on('dragover', function(event) {
	         event.preventDefault();
	         element.parent().addClass('dropItem');
	       });
	       element.on('dragleave', function(event) {
	         event.preventDefault();
	         element.parent().removeClass('dropItem');
	        
	       });
	       element.on('dragenter', function(event) {
	         event.preventDefault();
	         element.parent().addClass('dropItem');
	       });
	       element.on('drop', function(event) {
	         event.preventDefault();
	         element.parent().removeClass('dropItem');
	         scope.$apply(function(){
	        	 if(scope.$parent.selected_type == element.parent().children(".heading").html().trim())
	        		 {
	        		 	element.append('<li>' + 
	        		 			event.originalEvent.dataTransfer.getData('Text')  + '</li>');
	        		 	$('.dragItem').hide("fast");
	        		 }	
	        		 
	        	 else{
	        		  shake_effect(element.parent());
	        	 	}
	         	});
	         });
	       }
	     }
   });

	app.animation('.slideRight', function() {
		return {
			     enter : function(element, parentElement, afterElement, doneCallback) {},
			     leave : function(element, doneCallback) {},
			     move : function(element, parentElement, afterElement, doneCallback) {},
			     addClass : function(element, className, done) {
			    	 var len = parseInt($(".resultsBoard").css('left'), 10) + $(".resultsBoard").outerWidth() + 40; //keep some gap
			    	 element.animate({ left: len}, 1000);

			     },
			     removeClass : function(element, className, done) {
			       element.animate({ left: 0}, 1000);
			     }
			 };
});
	
function shake_effect(elm){
		for(var i=0; i<4; i++){
			var sign_1 = '+';
			var sign_2 = '-';
			
			if (i % 2 == 0){
				sign_1 = '-';
				sign_2 = '+';
			}
			else{
				sign_1 = '+';
				sign_2 = '-';
			}
		  elm.animate({
		        'margin-left': sign_1 + '5px',
		        'margin-right': sign_2 + '5px'
		    }, 50);
		  
		}
}
	
	
		
	
