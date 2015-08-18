var JSONApp = angular.module('JSONApp', []);

JSONApp.controller('JSONController', function($scope,$log){
	$scope.textHome = 'Create JSON dinamically';
	
	/*variables to ng-hide*/
	$scope.blankFields = true;
	$scope.setNumberOfFields = false;
	$scope.fillFields = true;
	$scope.textAreaWithJSON = true;
	$scope.showMessageError = true;
	/*end variables to ng-hide*/

	$scope.allFields = [];	
	$scope.arrayOfJSONObjects = [];
	var stringToParseJSON = '';
	$scope.attributeDuplicated = '';

	/*function to get the total number of fields and set name them*/
	$scope.submit = function(){
		if(angular.isNumber($scope.numberOfFields)){
			$scope.showMessageError = true;
			$scope.textHome = 'Enter the desires fields and after that, fill them.';
			$scope.errorMessage = '';
			$scope.setNumberOfFields = true;
			$scope.blankFields = false;
			$scope.fields = [];

			for (var i = 1; i <= $scope.numberOfFields; i++) {
				$scope.fields.push('input_' + i);
			};
		}else{
			$scope.errorMessage = 'Sorry! Type a real number and dont inspect element more. :)';
			$scope.showMessageError = false;
		}
	};
	/*end function*/

	/*function to show fields // user fill them with real values*/
	$scope.submit2 = function(){
		for (var i = 1; i <= $scope.numberOfFields; i++) {
			$scope.allFields.push(document.getElementsByName('input_' + i)[0].value);
		};

		if (!checkSameField()) {
			$scope.showMessageError = false;
			$scope.errorMessage = 'Ooops!.. Something wrong. The field ' + '"' + $scope.attributeDuplicated + '"' + ' was duplicate.';
			for (var i = 0; i < $scope.numberOfFields; i++) {
				$scope.allFields.pop();
			};
		}else{
			$scope.showMessageError = true;		
			$scope.blankFields = true;
			$scope.fillFields = false;
			$scope.textAreaWithJSON = false;
			$scope.textHome = 'Its time. Fill the fields and make your JSON.';	
		};		
	};
	/*end function*/

	/*function to get values of inputs and create json*/
	$scope.submit3 = function(){
		stringToParseJSON += '{';
		for (var j = 0; j < $scope.numberOfFields; j++) {
			if(j == $scope.numberOfFields - 1){
				stringToParseJSON += '"' + $scope.allFields[j] + '"' + ':' + '"' + document.getElementsByName($scope.allFields[j])[0].value + '"';
				stringToParseJSON += '}';
			}else{
				stringToParseJSON += '"' + $scope.allFields[j] + '"' + ':' + '"' + document.getElementsByName($scope.allFields[j])[0].value + '"' + ',';
			}		
		};
		
		$scope.arrayOfJSONObjects.push(JSON.parse(stringToParseJSON));
		$scope.showJSON = JSON.stringify($scope.arrayOfJSONObjects,null,"   ");
		stringToParseJSON = '';
	};
	/*end function*/

	function checkSameField(){
		for (var i = 0; i < $scope.numberOfFields; i++) {
			var stringAux = $scope.allFields[i];
			var stringAuxCount = 0;
			for (var j = 0; j < $scope.numberOfFields; j++) {
				if (angular.equals(stringAux,$scope.allFields[j])) {
					stringAuxCount++;
					if (stringAuxCount >= 2) {
						$scope.attributeDuplicated = $scope.allFields[j];
						return false;
					};
				};
			};
		};
		return true;
	};
});
