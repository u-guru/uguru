angular.module('uguru.util.controllers', [])

.controller('AddUniversityController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  '$q',
  'University',
  '$cordovaKeyboard',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $cordovaProgress, $q, University,
  $cordovaKeyboard) {

    $scope.search_text = '';
    
    var GetUniversityList = function() {
      
      if ($localstorage.getObject('universities').length > 0) {
            
        return $localstorage.getObject('universities');

      }

      var universitiesLoaded = $q.defer();

      $scope.$on('modal.shown', function() {

        if ($scope.addUniversityModal.isShown() && 
          $localstorage.getObject('universities').length === 0) {
            getUniversitiesFromServer(universitiesLoaded);
          }

      });

      return universitiesLoaded.promise;
    }

    $scope.universities = GetUniversityList();

    var getUniversitiesFromServer = function(promise) {
        $cordovaProgress.showSimpleWithLabelDetail(true, "Loading", "Retrieving all US Universities....");
        University.get().then(
          function(universities) {
              $timeout(function() {
                $cordovaProgress.hide();
                $scope.showSuccess('Success!');
              }, 500)

              $timeout(function() {
                $scope.setFocus();
              }, 1000);
              
              universities = JSON.parse(universities);
              if (promise) {
                promise.resolve(universities);
              }
              $scope.universities = universities;
              
              $localstorage.setObject('universities', $scope.universities);
              console.log($scope.universities.length + ' universities successfully loaded');
          },
          function() {
              console.log('Universities NOT successfully loaded');
          }
      );
    }

    $scope.clearSearchInput = function() {
        $scope.search_text = '';
    };

    $scope.setFocus = function(target) {
      if ($scope.search_text.length === 0) {
        document.getElementsByName("university-input")[0].focus();
      }
    };

    $scope.universitySelected = function(university) {
      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.closeKeyboard();
      $scope.showSuccess('University Saved!');
      $timeout(function() {
        $scope.addUniversityModal.hide();
      }, 1000);

    }

    $scope.hideUniversityModal = function() {
      if ($cordovaKeyboard.isVisible()) {
        $scope.search_text = '';
        $scope.closeKeyboard();
        $timeout(function() {
          $scope.addUniversityModal.hide();
        }, 300)
      } else {
        $scope.addUniversityModal.hide();
      }
    }

    
    $scope.$on('modal.shown', function() {

        if ($scope.addUniversityModal.isShown() && 
          $localstorage.getObject('universities').length > 0) {


          $timeout(function() {
            $scope.setFocus();
          }, 500);

        }

    });

    //case 1: if universities do not exist in local storage ... go get them
    //case 2: if user has ios && user has not been prompted... , prompt the display to get access
    //case 3: if coordinates are available && nearest_universities are not displayed..., calculate the nearest gps

  }


])