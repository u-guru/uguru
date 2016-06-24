angular.module('uguru.admin')
.directive("spec", ['$timeout', 'RootService', function($timeout, RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'admin/templates/components/spec.tpl',
            scope: {
                spec: '=data'
            },
            replace: true,
            restrict: 'E',
            link: function(scope, element, attr) {
                return
            }
        }
    }
])
.directive("animTools", ['$timeout', 'RootService', 'AnimToolService', function($timeout, RootService, AnimToolService) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/anim.tools.tpl',
        scope: {
            active: '=active',
            stage: '=ngModel'
        },
        replace: true,
        restrict: 'E',
        link: function(scope, element, attr) {
            AnimToolService.setStage(scope.stage);
            console.log('setting stage', scope.stage)
            scope.stage.recorder = AnimToolService.initRecorder(scope.stage, scope);
            console.log('recorder initialized', scope.stage.recorder)
            scope.stage.player = AnimToolService.initPlayer(scope.stage);
            scope.stage.recorder.start(scope.stage.recorder);
            console.log('starting..')
        }
    }
}])
.directive("docItem", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.tpl',
        transclude:true,
        replace:true,
        restrict: 'E',
        scope:true,
        controller: 'AdminDocItemController',
        controllerAs: 'doc_item',
        link: function preLink(scope, element, attr, ctrl, transclude) {
            ctrl.element = element;
        }
    }

}])
.directive("docTitle", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.title.tpl',
        transclude:true,
        replace:true,
        restrict: 'E',
        scope:false,
        link: function(scope, element, attr) {
            if ('doc' in scope) {
                scope.doc.title = element[0].querySelector('ng-transclude > span').innerHTML.trim();
            }
            return;
        }
    }
}])
.directive("docDescription", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.description.tpl',
        transclude:true,
        replace:true,
        restrict: 'E',
        scope:false,
        link: function(scope, element, attr) {
            if ('doc' in scope) {
                scope.doc.description = element[0].querySelector('ng-transclude > span').innerHTML.trim();
            }
            return;
        }
    }
}])
.directive("docDemo", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.demo.tpl',
        transclude:true,
        replace:true,
        scope:false,
        restrict: 'E',
        require:'^docItem',
        link: function(scope, element, attr, parent_controller) {
            scope.doc_item = scope.$parent.doc_item;
        }
    }
}])

.directive("docState", ['RootService', '$timeout', '$compile', function(RootService, $timeout, $compile) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.state.tpl',
        transclude:true,
        replace:true,
        scope:{doc:'='},
        restrict: 'E',
        link: {
            post: function(scope, element, attr) {
                scope.doc = scope.$parent.doc_item;

                var title = attr.name;
                var inherit = false;
                var html;
                if ('default' in attr) {
                    scope.doc.stateIndex = scope.doc.states.length
                    title = 'Default';
                }
                if ('inherit' in attr && scope.doc.states.length) {
                    html = scope['doc'].states[0].html;
                    inherit = true;
                }
                if (attr.name && !('default' in attr)) {
                    var dashedAttribute = attr.name.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
                    var selectedAttrElems = element[0].parentNode.querySelectorAll('[' + dashedAttribute + ']');
                }
                scope.state = {
                    title: title,
                    id: scope.doc && scope.doc.states.length,
                    html: html || element[0].innerHTML,
                    inherit: inherit
                }
                scope.doc && scope.doc.states.push(scope.state);
                // $compile(element[0])(scope);
            }
        }
    }
}])
.directive("docSnippet", ['RootService', '$timeout', '$compile', function(RootService, $timeout, $compile) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.snippet.tpl',
        transclude:true,
        replace:true,
        scope:{doc:'='},
        restrict: 'E',
        link: function(scope, element, attr) {
            scope.doc = scope.$parent.doc_item;
            var type = attr.type;
            var text;

            if ('default' in attr && 'doc' in scope) {
                scope.doc.snippetIndex = scope.doc.snippets.length
                title = 'Default';
            }
            scope.snippet = {
                type: type,
                id: scope.doc.snippets.length,
                text: text || element[0].innerHTML
            }
            if (scope.snippet.type === 'css') {
                scope.snippet.text = scope.snippet.text.replace('<span>', '').replace('}', '\n}').replace('</span>', '').trim();
            }
            scope.doc && scope.doc.snippets.push(scope.snippet);
        }
    }
}])
.directive("docStates", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.states.tpl',
        transclude:true,
        replace:true,
        scope:false,
        restrict: 'E',
        link: function(scope, element, attr) {
            scope.doc_item = scope.$parent.doc_item;
            scope.doc = scope.doc_item;
        }
    }
}])
.directive("docSnippets", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.snippets.tpl',
        transclude:true,
        replace:true,
        scope:false,
        restrict: 'E',
        link: function(scope, element, attr) {
            scope.doc_item = scope.$parent.doc_item;
            scope.doc = scope.doc_item;
            return;
        }
    }
}])