angular.module('uguru.preApp')
.controller('SplashMadlibController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'CategoryService',
  'UniversityService',
  'ContentService',
  'RootService',
  'UtilitiesService',
  function($scope, $state, $timeout, CategoryService, UniversityService, ContentService, RootService, UtilitiesService) {
    var madlib = this;


    madlib.category = ($scope.splash && $scope.splash.category) || CategoryService.getLocalCategories()[0];
    madlib.category.tags_data = ContentService.splashCategoryOptions[madlib.category.name].madlib;
    madlib.options = {one: madlib.category.tags_data.blank_one_options, two: madlib.category.tags_data.blank_two_options}

    madlib.university = UniversityService.getBerkeleyLocal();

    // $scope.$watch('splash.category', function(category)
    //   {
    //     madlib.category.tags_data = ContentService.splashCategoryOptions[category.name].madlib;
    //     madlib.options = {one: madlib.category.tags_data.blank_one_options, two: madlib.category.tags_data.blank_two_options}
    //     console.log(madlib.options.two[0])
    //   }
    // );


    var rowOneElems = document.querySelectorAll('a.adlib-1');
    var rowTwoElems = document.querySelectorAll('a.adlib-2');

    madlib.tagClicked = function(i_row, i_index, $event) {
      var grandParent = $event.target.parentNode.parentNode;
      var parent = $event.target.parentNode;
      var numWordIndice = ['One', 'Two', 'Three', 'Four']
      var rowWordIndice = numWordIndice[parseInt(i_row)];
      var wordIndice = numWordIndice[parseInt(i_index)];
        delay = 0;

          if (grandParent.className.indexOf('active') > -1 || parent.className.indexOf('active') > -1) {

            grandParent.classList.remove('active');
            parent.classList.remove('active');
            $timeout(function() {
              if (grandParent.className.indexOf('active') > -1 || parent.className.indexOf('active') > -1) {
                grandParent.classList.remove('active');
                parent.classList.remove('active');
              }

            });
          }

          for (var i = 0; i < 4; i++) {
            if (i !== parseInt(i_index)) {
                if (parseInt(i_row) === 0) {
                    rowOneElems[i].style['webkitTransform'] = '';
                    rowOneElems[i].style['transform'] = '';
                    rowOneElems[i].classList.remove('active');
                } else if (parseInt(i_row) === 1) {
                  rowTwoElems[i].style['webkitTransform'] = '';
                    rowTwoElems[i].style['transform'] = '';
                  rowTwoElems[i].classList.remove('active');
                }
            }
          }



          if (madlib.rowOneActive || madlib.rowTwoActive) {
            delay = 250;
          } else {
            if (!madlib.rowOneActive && parseInt(i_index) === 0) {
              madlib.rowOneActive = true;
            }
            if (!madlib.rowTwoActive && parseInt(i_index) === 1) {
              madlib.rowTwoActive = true;
            }
          }
        $timeout(function() {

          $scope.root.public.customStates.when['whenSplash' + rowWordIndice + wordIndice + 'ClickActive'] = true;
        })
      return;
    }

    madlib.updateOptionByIndex = function(category, index, cb) {
      index = (index && parseInt(index)) || 0
      var blankNum = 'one';
      if (index > 3) {
        blankNum = 'two';
        index = index - 4
      }
      var newElem = ContentService.splashCategoryOptions[category.name].madlib['blank_' + blankNum + '_options'][index];
      madlib.options[blankNum][index] = newElem;
    }


  }
])
