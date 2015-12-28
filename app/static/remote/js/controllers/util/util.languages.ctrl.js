angular.module('uguru.util.controllers')

.controller('LanguagesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  'Utilities',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, Utilities, LoadingService) {
    var languages = [{"name": "Mandarin", "id": 1}, {"name": "Spanish", "id": 2}, {"name": "English", "id": 3}, {"name": "Hindi", "id": 4}, {"name": "Arabic", "id": 5}, {"name": "Portuguese", "id": 6}, {"name": "Bengali", "id": 7}, {"name": "Russian", "id": 8}, {"name": "Japanese", "id": 9}, {"name": "Punjabi", "id": 10}, {"name": "German", "id": 11}, {"name": "Javanese", "id": 12}, {"name": "Wu", "id": 13}, {"name": "Malay/Indonesian", "id": 14}, {"name": "Telugu", "id": 15}, {"name": "Vietnamese", "id": 16}, {"name": "Korean", "id": 17}, {"name": "French", "id": 18}, {"name": "Marathi", "id": 19}, {"name": "Tamil", "id": 20}, {"name": "Urdu", "id": 21}, {"name": "Persian", "id": 22}, {"name": "Turkish", "id": 23}, {"name": "Italian", "id": 24}, {"name": "Cantonese", "id": 25}, {"name": "Thai", "id": 26}, {"name": "Gujarati", "id": 27}, {"name": "Jin", "id": 28}, {"name": "Min Nan", "id": 29}, {"name": "Polish", "id": 30}, {"name": "Pashto", "id": 31}, {"name": "Kannada", "id": 32}, {"name": "Xiang", "id": 33}, {"name": "Malayalam", "id": 34}, {"name": "Sundanese", "id": 35}, {"name": "Hausa", "id": 36}, {"name": "Odia", "id": 37}, {"name": "Burmese", "id": 38}, {"name": "Hakka", "id": 39}, {"name": "Ukrainian", "id": 40}, {"name": "Bhojpuri", "id": 41}, {"name": "Tagalog", "id": 42}, {"name": "Yoruba", "id": 43}, {"name": "Maithili", "id": 44}, {"name": "Swahili", "id": 45}, {"name": "Uzbek", "id": 46}, {"name": "Sindhi", "id": 47}, {"name": "Amharic", "id": 48}, {"name": "Fula", "id": 49}, {"name": "Romanian", "id": 50}, {"name": "Oromo", "id": 51}, {"name": "Igbo", "id": 52}, {"name": "Azerbaijani", "id": 53}, {"name": "Awadhi", "id": 54}, {"name": "Gan", "id": 55}, {"name": "Cebuano", "id": 56}, {"name": "Dutch", "id": 57}, {"name": "Kurdish", "id": 58}, {"name": "Serbo-Croatian", "id": 59}, {"name": "Malagasy", "id": 60}, {"name": "Saraiki", "id": 61}, {"name": "Nepali", "id": 62}, {"name": "Sinhalese", "id": 63}, {"name": "Chittagonian", "id": 64}, {"name": "Khmer", "id": 65}, {"name": "Assamese", "id": 66}, {"name": "Madurese", "id": 67}, {"name": "Somali", "id": 68}, {"name": "Marwari", "id": 69}, {"name": "Magahi", "id": 70}, {"name": "Haryanvi", "id": 71}, {"name": "Hungarian", "id": 72}, {"name": "Chhattisgarhi", "id": 73}, {"name": "Greek", "id": 74}, {"name": "Chewa", "id": 75}, {"name": "Deccan", "id": 76}, {"name": "Akan", "id": 77}, {"name": "Kazakh", "id": 78}, {"name": "Min Bei", "id": 79}, {"name": "Sylheti", "id": 80}, {"name": "Zulu", "id": 81}, {"name": "Czech", "id": 82}, {"name": "Kinyarwanda", "id": 83}, {"name": "Dhundhari", "id": 84}, {"name": "Haitian Creole", "id": 85}, {"name": "Min Dong", "id": 86}, {"name": "Ilokano", "id": 87}, {"name": "Quechua", "id": 88}, {"name": "Kirundi", "id": 89}, {"name": "Swedish", "id": 90}, {"name": "Hmong", "id": 91}, {"name": "Shona", "id": 92}, {"name": "Uyghur", "id": 93}, {"name": "Hiligaynon", "id": 94}, {"name": "Bulgarian", "id": 95}, {"name": "Mossi", "id": 96}, {"name": "Xhosa", "id": 97}, {"name": "Belarusian", "id": 98}, {"name": "Balochi", "id": 99}, {"name": "Konkani", "id": 100}];
    $scope.languages = languages.slice(0, languages.length);

    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $ionicSideMenuDelegate.canDragContent(false);

    $scope.page = {
      search_text: ''
    }

    $scope.removeGuruLanguageAndUpdate = function(language, index) {

      $scope.user.guru_languages.splice(index, 1);

      var confirmCallback = function() {
        LoadingService.showSuccess(language.short_name + ' successfully removed', 1000)
      }
      LoadingService.show();
      $scope.user.updateAttr('remove_guru_language', $scope.user, language, confirmCallback, $scope);
    }

    $scope.addSelectedGuruLanguage = function(language, input_text, $index) {


      //set the variable to this
      $scope.languages.splice($index, 1);

      $scope.search_text = null;
      // $scope.languageInput.value = '';

      //set the course text to what it should be
      // document.getElementById('language-input').value = '';

      $scope.user.guru_languages.push(language);
      $scope.user.updateAttr('add_guru_language', $scope.user, language, null, $scope);

    }

    $scope.clearSearchInput = function() {
      $scope.search_text = '';
    }

    $scope.saveLanguages = function() {
      if ($scope.desktopMode) {
          LoadingService.showSuccess('Saved!',2000);
          var languageModal = document.querySelector('#cta-modal-profile-languages');
          languageModal.classList.remove('show');
      }
    }

    $scope.$on('$ionicView.enter', function() {


        $timeout(function() {

          $scope.languageInput = document.getElementById('guru-language-input');

        });


    });

    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.languages && $scope.limit < $scope.languages.length) {
        $scope.limit += 10;
      }
    }

    $scope.query = function(input) {
      if (input.length === 0) {
        $scope.languages = languages;
      }
      $scope.languages = Utilities.nickMatcher(input, $scope.languages);
    }

  }


])