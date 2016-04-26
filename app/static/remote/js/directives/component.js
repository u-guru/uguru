'use strict';

//////////
// CONTAINERS
//////////
angular.module('uguru.components', [])
/////////
///Capitalize first character of the word
/////////
.directive("charsMode",function()
{
    return{
      require : 'ngModel',
      scope:{
        'localModel':'=ngModel'
      },
      link: function(scope, element, attrs,modelCtrl) {
          console.log("Attrs :",modelCtrl)
          console.log("scope localModel :")

      }
    };
})
.directive("capitalize",function($parse){
  return{
    require : 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
    var capitalize = function(inputValue) {
           if (inputValue === undefined) { inputValue = ''; }
           var arryInput = inputValue.split(' ')
           var capitalizeValue = arryInput[0].charAt(0).toUpperCase() + arryInput[0].substring(1);
           for(var i = 1 ; i < arryInput.length; ++ i)
           {
              arryInput[i] = arryInput[i].charAt(0).toUpperCase() + arryInput[i].substring(1);
              capitalizeValue = capitalizeValue.concat(" "+arryInput[i])
           }
           if(capitalizeValue !== inputValue) {
              modelCtrl.$setViewValue(capitalizeValue);
              modelCtrl.$render();
            }         
            return capitalizeValue;
         }
         modelCtrl.$parsers.push(capitalize);
         // capitalize(scope[attrs.ngModel]); // capitalize initial value
         capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
    }
  };
})
.directive("doc", function() {
  return {
    templateUrl: BASE + 'templates/elements/containers/info/docs.tpl',
    scope: {
        header: '=header',
        steps: '=steps'
    },
    restrict: 'E'
  };
})
.directive("stepByStep", function() {
  return {
    templateUrl: BASE + 'templates/elements/containers/info/steps.tpl',
    scope: {
        header: '=header',
        steps: '=steps'
    },
    restrict: 'E'
  };
})
.directive("demo", ['$compile', '$timeout', function($compile, $timeout) {
  return {
    restrict: 'E',
    scope: '=',
    link: function(scope, element, attr) {
      $timeout(function() {
        if (attr.template && attr.template.length) {
          element.html(attr.template.replace(/\\"/g, "'"));
          $compile(element.contents())(scope);
        }
      }, 1000);
    }
  };
}])

//////////
// End-CONTAINERS
//////////
    .directive("dropdown", ['$timeout', function($timeout) {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'color') {
                return BASE + 'templates/elements/components/inputs/dropdowns/color.tpl'
            } else {
                return BASE + 'templates/elements/components/inputs/dropdown.tpl'
            }
        }
        return {
            templateUrl: getTemplateURL,
            scope: {
                dropdown: '=ngModel'
                    // tests:'=testArr',
            },
            replace: true,
            restrict: 'E',
            link: function(scope, element, attr) {
                if (!scope.size) {
                    scope.size = 'small';
                }
                if (attr.type && attr.type.toLowerCase() === 'color') {
                    scope.type = 'color';
                } else {
                    scope.type = '';
                }
                scope.click = function(option, index) {

                    scope.dropdown.selectedIndex = index;

                    $timeout(function() {
                        scope.$apply();
                    })

                    if (scope.dropdown.onOptionClick) {
                        scope.dropdown.onOptionClick(option, index);
                    }

                    scope.toggle();

                }
                scope.toggle = function() {
                    scope.dropdown.active = !scope.dropdown.active;
                    if (scope.dropdown.onToggle) {
                        scope.dropdown.onToggle(scope.dropdown.active);
                    }
                }
            }
        };
    }])
    .directive("userIcon", ['$compile', function($compile) {
        return {
            templateUrl: BASE + 'templates/elements/components/info/user.icon.tpl',
            scope: {
                url: '=url',
                size: '=size'
            },
            replace: true,
            restrict: 'E',
            link: function(scope, element, attr) {
                if (scope.size && scope.size === 'small') {
                    scope.size = '32'
                } else if (scope.size && scope.size === 'medium') {
                    scope.size = '64'
                }
                if (!scope.url || !scope.url.length) {
                    scope.url = 'https://uguru.me/static/remote/img/avatar.svg';
                }
                var request = new XMLHttpRequest();
                request.open('GET', scope.url, true);
                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        if (request.status === 404) {
                            scope.url = 'https://uguru.me/static/remote/img/avatar.svg';
                            // element.attr('url',scope.url);
                            // $compile(element.contents())(scope);
                            // scope.$apply();
                            // console.log('Check',scope.url, typeof(scope.url))

                        }
                    }
                };
                // request.send()

            }
        };
    }])
    .directive("profileThumb", function() {
        return {
            templateUrl: BASE + 'templates/elements/components/cards/profile.mini.tpl',
            scope: {
                color: '=color',
                url: '=url',
                size: '=size'
            },
            replace: true,
            restrict: 'E'
        };
    })
    .directive("checkbox", function() {
        return {
            templateUrl: BASE + 'templates/elements/components/inputs/checkbox.tpl',
            scope: {
                onPropChange: '=onPropChange',
                label: '=label',
                value: '=value',
                checked: "=checked"
            },
            restrict: 'E',
            link: function(scope, element, attr) {

                if (!scope.label || !scope.label.length) {
                    scope.label = 'Checkbox Label'
                }
                scope.checked = scope.checked || false;
                // if (scope.onPropChange) {
                //   // scope.onPropChange(scope, )
                // }
            }
        }
    })
    .directive("radio", function() {
        return {
            templateUrl: BASE + 'templates/elements/components/inputs/radio.tpl',
            scope: {
                onPropChange: '=onPropChange',
                label: '=label',
                value: '=value',
                checked: "=checked"
            },
            restrict: 'E',
            link: function(scope, element, attr) {

                if (!scope.label || !scope.label.length) {
                    scope.label = 'Radio Label'
                }
                scope.checked = scope.checked || false;
                // if (scope.onPropChange) {
                //   // scope.onPropChange(scope, )
                // }
            }
        }
    })
    .directive("tooltip", function() {
        return {
            templateUrl: BASE + 'templates/elements/components/info/tooltip.tpl',
            scope: {
                content: '=content',
                button: '=button',
                direction: '=direction'
            },
            replace: true,
            restrict: 'E',
            link: function(scope, element, attr) {
                if (!scope.text || !scope.text.length) {
                    scope.text = null;
                }
                if (!scope.direction) {
                    scope.direction = 'top';
                }
            }
        };
    })
    .directive("rating", function() {
        return {
            templateUrl: BASE + 'templates/elements/components/info/rating.tpl',
            scope: {
                avg: '=avg',
            },
            replace: true,
            restrict: 'E',
            link: function(scope, element, attr) {
                if (!scope.avg || typeof(scope.avg) !== "number") {
                    scope.avg = 5;
                }
                scope.total_full_stars = getArraySize(Math.floor(scope.avg));
                scope.total_empty_stars = getArraySize(5 - scope.total_full_stars.length);
                scope.show_half = (Math.ceil(scope.avg) - scope.avg) <= 0.99 && (Math.ceil(scope.avg) - scope.avg) >= 0.25;
                if (scope.show_half) {
                    scope.total_empty_stars.splice(0, 1)
                }

                function getArraySize(num) {
                    var arr = [];
                    for (var i = 0; i < num; i++) {
                        arr.push(i);
                    }
                    return arr;
                }
            }
        };
    })
    .directive("tabs", function() {

        return {
            templateUrl: BASE + 'templates/elements/containers/collections/tabs.tpl',
            scope: {
                options: '=options',
                key: '@?key',
                tabIndex: '=index'
            },
            restrict: 'E',
            replace: true,
            link: function(scope, element, attr) {
                if (!('index' in attr)) {
                    scope.tabIndex = 0;
                }
                scope.updateTabIndex = function($index) {
                    scope.tabIndex = $index;
                }
            }
        };
    })
    .directive('toast', function() {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'overlay') {
                return BASE + 'templates/elements/components/info/toast.overlay.tpl'
            }  else {
                return BASE + 'templates/elements/components/info/toast.tpl'
            }
        }
        return {
            templateUrl: getTemplateURL,
            restrict: 'E',
            replace: true,
            scope: {
                toast: '=ngModel'
            },
            link: function(scope, elem, attr) {
                if (attr.type && attr.type.toLowerCase() === 'overlay') {
                    scope.type = 'overlay';
                } else {
                    scope.type = '';
                }
            }
        }
    })
    .directive('inputStandard', function() {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'material') {
                return BASE + 'templates/elements/components/inputs/material.tpl'
            }  else {
                return BASE + 'templates/elements/components/inputs/text.tpl'
            }
        }
        return {
            templateUrl: getTemplateURL,
            restrict: 'E',
            replace: true,
            scope: {
                input: '=ngModel'
            },
            link: function(scope, elem, attr) {
                if (attr.type && attr.type.toLowerCase() === 'material') {
                    scope.type = 'material';
                } else {
                    scope.type = '';
                }
            }
        }
    })
    .directive('courseCard', function() {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'hover') {
                return BASE + 'templates/elements/components/cards/course.hover.tpl'
            } else
            if (attr.type && attr.type === 'link') {
                return BASE + 'templates/elements/components/cards/course.link.tpl'
            } else
            if (attr.type && attr.type === 'check') {
                return BASE + 'templates/elements/components/cards/course.check.tpl'
            } else {
                return BASE + 'templates/elements/components/cards/course.tpl'
            }
        }
        return {
            templateUrl: getTemplateURL,
            scope: {
                course: '=ngModel'
            },
            restrict: 'E',
            replace: true,
            link: function(scope, elem, attr) {
                if (attr.type && attr.type.toLowerCase() === 'hover') {
                    scope.type = 'hover';
                } else if (attr.type && attr.type.toLowerCase() === 'link') {
                    scope.type = 'link';
                } else if (attr.type && attr.type.toLowerCase() === 'check') {
                    scope.type = 'check';
                } else {
                    scope.type = '';
                }
            }
        }
    })
    .directive("pennant", function() {
        return {
            templateUrl: BASE + 'templates/elements/components/info/pennant.tpl',
            scope: {
                animation: '=animation',
                pennantFill: '=mainFill',
                pennantText: '=text',
                textColor: '=textColor'
            },
            restrict: 'E',
            replace: true,
            link: function(scope, element, attr) {
                return;
            }
        };
    })
    .directive("colorPicker", function() {
        return {
            templateUrl: BASE + 'templates/elements/components/inputs/pickers/color.tpl',
            scope: {
                selectedColor: '=',

            },
            restrict: 'E',
            replace: true,
            link: function(scope, element, attr) {
                scope.defaultColorOptions = ['auburn', 'orange', 'gold', 'moola', 'shamrock', 'azure', 'lake', 'cobalt', 'eggplant', 'campus', 'taupe', 'slate', 'charcoal'];
                scope.showColorPicker = true;
                if (!scope.selectedColor || !scope.defaultColorOptions.length) {
                    scope.selectedColor = 'shamrock';
                }
                scope.setSelectedColor = function(color_option) {
                    scope.selectedColor = color_option;
                }
                scope.setAndClose = function(color_option) {
                    scope.selectedColor = color_option;
                    scope.showColorPicker = false;
                }
            }
        };
    })
    .directive("tag", ['$compile', '$timeout', function($compile, $timeout) {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'splash') {
                return BASE + 'templates/elements/components/inputs/tags/splash.tpl'
            } else
            if (attr.type && attr.type === 'input') {
                return BASE + 'templates/elements/components/inputs/text/tag.tpl'
            } else {
                return BASE + 'templates/elements/components/inputs/tags/base.tpl'
            }

        }

        return {
            templateUrl: getTemplateURL,
            scope: {
                innerText: '=',
                category: '=',
                blankNum: '=',
                animArgs: '=',
                placeholder: '@',
                desktopMode: '=desktop',
                click: "=ngClick"
            },
            restrict: 'E',
            replace: true,
            link: function(scope, element, attr) {
                if (attr.type && attr.type.toLowerCase() === 'splash') {
                    scope.type = 'splash';
                }

                if (scope.blankNum && scope.blankNum.length) {
                    scope.blankNum = 1
                }


                // scope.resetMadLibBlankIfActive = function($event) {
                //     // console.log("WTF")
                //     var indexTranslateElem = $event.target.parentNode;
                //     var hasBlankOne = indexTranslateElem.className.indexOf('translate-blank-1') > -1;
                //     var hasBlankTwo = indexTranslateElem.className.indexOf('translate-blank-2') > -1;
                //     if (indexTranslateElem && indexTranslateElem.className.indexOf('recently-active') === -1 && (hasBlankOne || hasBlankTwo)) {
                //         var addLibContainer = document.querySelector(".splash-adlib");
                //         if (hasBlankOne) {
                //             var blankOneElem = document.querySelector('#blank-1 b');
                //             $timeout(function() {
                //                 addLibContainer.classList.remove('blank-1-filled');
                //                 blankOneElem.classList.remove('opacity-0-impt');
                //                 indexTranslateElem.classList.remove('translate-blank-1', 'active');
                //             }, 100);
                //             blankOneElem.opacity = 1;
                //         }
                //         if (hasBlankTwo) {
                //             var blankTwoElem = document.querySelector('#blank-2 b');
                //             $timeout(function() {
                //                 addLibContainer.classList.remove('blank-2-filled');
                //                 blankTwoElem.classList.remove('opacity-0-impt');
                //                 indexTranslateElem.classList.remove('translate-blank-2', 'active');
                //             }, 100);

                //             blankTwoElem.opacity = 1;
                //         }
                //         indexTranslateElem.style.webkitTransform = null;
                //         indexTranslateElem.style.MozTransform = null;
                //         indexTranslateElem.style.msTransform = null;
                //         indexTranslateElem.style.OTransform = null;
                //         indexTranslateElem.style.transform = null;
                //     }

                // }



            }
        }
    }])
    .directive('svgi', '$timeout', function($timeout) {
        return {
            templateUrl: BASE + 'templates/elements/assets/svg.tpl',
            restrict: 'E',
            replace: true,
            link: function(scope, elem, attr) {
                if (attr.size && attr.size.length) {
                    var svgElem = elem[0].querySelector('svg');
                    if (svgELem) {
                        svgElem.style.width = attr.size.split('x')[0] + 'px;';
                        svgElem.style.height = attr.size.split('x')[1] + 'px;';
                    }
                }
            }
        }

        function getTemplateURL(elem, attr) {
            if (attr && attr.name && attr.name.length) {
                var svgPathSplit = attr.name.split('.');
                if (svgPathSplit.length > 1) {
                    svgPath = attr.name.replace('.', '/') + '.tpl';
                    return BASE + 'templates/elements/assets/svg/' + svgPath;
                }
            }
        }
    })
    .directive('albumTile', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/tiles/album.tpl',
            restrict: 'E',
            replace: true,
            scope: {
                album: '=ngModel'
            }
        }
    })
    .directive('profileWidgetCard', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/cards/profile.widget.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('profileTile', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/tiles/profile.tpl',
        }
    })
    .directive('profileCard', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/cards/profile.tpl'
        }
    })
    .directive('universityCard', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/cards/university.tpl'
        }
    })
    .directive('userIdCard', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/cards/user.id.tpl'
        }
    })
    .directive('mapMarker', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/links/map.marker.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('badge', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/info/badge.tpl',
            restrict: 'E',
            replace: true,
            scope: {
                color: '=color',
                label: '=label',
                direction: '=direction',
                count: '=count'
            }
        }
    })
    .directive('attachList', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/info/attachment.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('rangeSlider', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/inputs/slider.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('tabsArrow', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/progress/arrow.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('progressBar', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/progress/bar.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('progressBarCircles', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/progress/circular.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('categoryTile', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/tiles/category.tpl',
            restrict: 'E',
            replace: true,
            scope: {
                tile: '=ngModel',
                img_base: '=imgBase'
            },
        }
    })
    .directive('pricingTile', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/tiles/pricing.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('requestTile', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/tiles/request.tpl',
            restrict: 'E',
            replace: true
        }
    })
    // .directive("toggle", ['$timeout', function($timeout) {
    //     return {
    //         templateUrl: BASE + 'templates/elements/containers/',
    //         scope: {
    //             label: '=label',
    //             labelPos: '=labelPos',
    //             isOn: '=on',
    //             isOff: '=off'
    //             // tests:'=testArr',
    //         },
    //         replace: true,
    //     }
    // }])
    .directive('toggle', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/inputs/toggle.tpl',
            restrict: 'E',
            replace: true
        }
    })
    .directive('inputsGallery', function() {
        return {
            templateUrl: BASE + 'templates/elements/components/inputs/text/all_inputs.tpl',
            restrict: 'E',
            replace: true
        }
    })
    // .directive('toast', function() {
    //     return {
    //         templateUrl: BASE + 'templates/elements/components/info/toast.tpl',
    //         restrict: 'E',
    //         replace: true
    //     }

    // })
