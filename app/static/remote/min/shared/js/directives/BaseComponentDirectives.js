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