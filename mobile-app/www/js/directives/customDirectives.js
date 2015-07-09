angular.module('uguru.directives', []);

    angular.module('uguru.directives')

    .directive('focusMe', function ($timeout) {
     return {
        link: function(scope, element, attrs) {
          $timeout(function() {
            element[0].focus();
          }, 500);
            }
        };
    })
    
    .directive('isFocused', function($timeout) {
      return {
        scope: { trigger: '@isFocused' },
        link: function(scope, element) {
          scope.$watch('trigger', function(value) {
            if(value === "true") {
              $timeout(function() {
                element[0].focus();

                element.on('blur', function() {
                  element[0].focus();
                });
              });
            }

          });
        }
      };
    });
    // .directive("popup",function(){
    //   return {
    //     restrict: "E",
    //     template: '<script id="templates/welcomePopup.html" type="text/ng-template"> <div class="row"> <div class="col"> <div class="center"> <img style="background:rgba(105, 179, 165, 1)" src="./img/uguru-04.png" width="60%" class="uguru_glass center"> </div></div></div><div class="row"> <div class="col"> <p style="font-size:2.25em; color:rgba(0,0,0,0.7)"class="bold-font center font-24 line-height-120">Welcome!</p></div></div><div class="row"> <div class="col"> <p style="font-size:15px;"class="osreg-font center grey"> We d like to notify tou when your Guru s<br>accept your request for help.<br>Turn norifications on? </div></div><div class="row"> <div class="col"> <button id="popup-positive-btn" class="button button-full button-positive footer-button"> Get Started </button> <a class="button button-full button-outline" id="popup-cancel-btn" style="background-color:white; border:0px;color:rgba(105, 179, 165, 1); min-height:0px !important;height:30px;"> No Thanks </a> </div></div></script>'
    //   }
    // });
