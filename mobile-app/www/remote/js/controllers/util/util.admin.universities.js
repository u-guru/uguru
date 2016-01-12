angular.module('uguru.util.controllers')

.controller('AdminUniversityController', [

	'$scope',
	'$state',
	'$stateParams',
	'Restangular',
	'University',
	'LoadingService',
	function($scope, $state, $stateParams, Restangular, University, LoadingService) {


		LoadingService.showAmbig('Loading..', 10000);
		Restangular.one('universities').get().then(function(result) {
			LoadingService.hide();
			$scope.universities = result.plain()
			$scope.alreadyStartedUniversities = University.filterByAlreadyStarted($scope.universities);

			var universityDistDict = University.getUniversityDateDist($scope.alreadyStartedUniversities);

			$scope.universityDistArr = University.getUniversityDateDistArrFromDict(universityDistDict).reverse();

		});

		$scope.updateField = function(payload, uni_id) {
			Restangular.setBaseUrl(REST_URL + '/api/admin/9c1185a5c5e9fc54612808977ee8f548b2258d34');
			Restangular.one('universities', uni_id).customPUT(payload).then(function(){
				LoadingService.showSuccess('updated!', 500);
			}, function(err) {
				alert('Something went wrong');
			})
		}

		$scope.fieldPromptAndUpdate = function(fieldName, currentValue, uni) {
			var currentValue = prompt("Please fill in a new value for " + fieldName, currentValue)
			var mappingDict = {
				'Mascot Name': "school_mascot_name",
				'Casual Name': "school_casual_name",
				"Short Name": "short_name",
				'Name': "name"
			}
			if (currentValue) {
				uni[mappingDict[fieldName]] = currentValue;
				var payload = {};
				payload[mappingDict[fieldName]] = currentValue;
				console.log('updating db value for payload', payload)
				payload = JSON.stringify(payload);
				$scope.updateField(payload, uni.id);
			}
		}
	}

]);