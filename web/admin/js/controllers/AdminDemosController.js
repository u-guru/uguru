angular.module('uguru.admin')

.controller('AdminDemosController', [
  '$scope',
  '$state',
  '$timeout',
  '$interval',
  '$localstorage',
  '$window',
  'AnimationService',
  '$compile',
  function($scope, $state, $timeout, $interval, $localstorage, $window, AnimationService, $compile) {
    var demo = this;
    demo.showTextArgument = function($event) {
      var strArgs = $event.target.getAttribute('on-click');
      demo.lastSelectedText = strArgs;
      console.log(demo.lastSelectedText)
    }

    $timeout(function() {

      var buttons = document.querySelectorAll('.guru-switch-container .button');

        for (var i = 0; i < buttons.length; i++) {
            var iButton = angular.element(buttons[i]);
            var moveClass = iButton[0]

            iButton[0].addEventListener('click', function($event) {
              var iButton = angular.element($event.target);
              var moveClass = iButton[0];
              var moving = iButton[0].getBoundingClientRect().width;
              console.log(moveClass, moving)
                var moveIndex = parseInt(moveClass.getAttribute("data-index")) + 1;
                var moveAmt = parseInt(moveClass.getAttribute("data-move")) - moving;
                setTimeout(function() {
                  var glasses = document.querySelector('.glasses');
                    if (moveIndex == (glasses.children.length + 1)) {
                        moveClass.getAttribute('data-move', 0);
                        moveClass.getAttribute('data-index', 1);
                        iButton.css("transform", "translateX(" + 0 + "px)")
                    } else {
                        moveClass.setAttribute('data-move', moveAmt);
                        moveClass.setAttribute('data-index', moveIndex);
                        iButton.css("transform", "translateX(" + moveAmt + "px)")
                    }
                }, 50);
            });
            $compile(iButton)($scope)
        }

    }, 1000)
  }
])