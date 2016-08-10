angular.module('uguru.shared.directives.base.components', []);
angular.module('uguru.shared.directives.base.components')
    .directive("uInput", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/input.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("svgTable", [function() {
        return {
            templateUrl: 'shared/templates/components/base/grid/svg.table.tpl',
            scope: {},
            restrict: 'E',
            replace: true,
            transclude: true,
            priority:2,
            link: {
                pre: function(scope, element, attr) {
                    scope.vb = {};
                    var parentDim = element.parent()[0].getBoundingClientRect();

                    if (parentDim.width > parentDim.height) {
                        scope.vb.height = Math.round(((parentDim.height/parentDim.width)*100), 2)
                        scope.vb.width = 100;
                        console.log(scope.vb)
                    } else {
                        scope.vb.height = 100;
                        scope.vb.width = Math.round(((parentDim.width/parentDim.height)*100), 2)
                    }
                    element[0].setAttribute('viewBox', '0 0 ' + scope.vb.width + ' ' + scope.vb.height);
                    scope.rows = parseInt(attr.rows);
                }
            }
        }
    }])
    .directive('svgItem', ['$compile', function ($compile) {
        return {
        restrict: 'AE',
        scope: {rows:'=rows'},
        template: '<rect rows=rows columns=columns ng-transclude></rect>',
        replace: true,
        transclude: true,
        priority:0,
        compile: function(element, attr) {
            return function preLink(scope, element, attr) {

                var dim = element.parent()[0].getAttribute('dim');
                var columns = parseInt(dim.split('x')[0])
                var rows = parseInt(dim.split('x')[1])
                var parent = element[0].parentNode;
                var index = Array.prototype.indexOf.call(parent.children, element[0]);
                //column
                var rowIndex = parseInt(index/rows) % rows;

                var columnIndex = index % columns;
                element[0].setAttribute('width', 100/rows + '%');
                element[0].setAttribute('x', rowIndex * (100/rows) + '%');
                element[0].setAttribute('y', columnIndex * (100/columns) + '%');
                element[0].setAttribute('height', 100/columns + '%');
            }
        }
      };
    }])
    // .directive('text', [function () {
    //   return {
    //     restrict: 'AE',
    //     priority: 0,
    //     compile: function(elem, attr) {
    //       !('fill' in attr) && attr.$set('fill', 'white');
    //       !('x' in attr) && attr.$set('x', '50%');
    //       !('y' in attr) && attr.$set('y', '50%');
    //       !('fontSize' in attr) && attr.$set('font-size', '33%');
    //       !('textAnchor' in attr) && attr.$set('text-anchor', 'middle');
    //       return function postLink(scope, elem, attr) {
    //         var gRect = elem.parent()[0].getBoundingClientRect();
    //         var gWidth = gRect.width;
    //         var gHeight = gRect.height;
    //         console.log(elem);

    //       }
    //     }
    //   };
    // }])
    .directive("bar", ["RootService", "$timeout", function(RootService, $timeout) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/grid/bar.tpl',
            restrict: 'E',
            scope: {
                overflowX:'=',
                options: '=ngModel',
                title: '=title',
                key: '=key',
            },
            link: {
                pre: function(scope, element, attr) {
                }
            }
        }
    }])
    .directive("uBody", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/body.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uButton", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/button.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uBody", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/body.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uCheckbox", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/checkbox.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uDropdown", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/dropdown.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uHeader", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/header.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uImage", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/image.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uRadio", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/radio.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uToggle", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/toggle.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uTooltip", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/tooltip.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])