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
        link: function(scope, element, attr) {
            scope.doc = {onSnippetClicked: onSnippedClicked(scope, element), onStateClicked: onStateClicked(scope, element), keywords: keywordArr, states: [], snippets: [], stateIndex: 0, snippetIndex:0};
            if ('keywords' in attr && attr['keywords']) {
                var keywords = attr['keywords'];
                var keywordArr = keywords.split(', ');
                RootService.appendDocItem(scope.doc);
            }
            return;
        }
    }
    function onSnippedClicked(scope, element) {
        return function(index) {
            scope.doc.snippetIndex = index;
        }
    }
    function onStateClicked(scope, element) {
        return function(index) {
            var nextState = scope.doc.states[index];
            if (!scope.doc.states[index].inherit) {
                scope.doc.stateIndex = index;
                scope.doc.inheritedIndex = false;
                console.log(scope.doc.stateIndex, 'state index clicked');
            } else {
                // scope.doc.stateIndex = index;
                scope.doc.states[scope.doc.stateIndex].inheritedIndex = true;
                console.log(nextState);
                var dashedAttribute = nextState.title.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
                console.log(dashedAttribute);
                var selectedAttrElems = element[0].parentNode.querySelectorAll('[' + dashedAttribute + ']');
                if (selectedAttrElems.length) {
                    for (var i = 0; i < selectedAttrElems.length; i++) {
                        if (dashedAttribute.split('activate').length > 1) {
                            selectedAttrElems[i].classList.add('activate');
                        } else {
                            selectedAttrElems[i].classList.add(dashedAttribute);
                        }
                    }
                }

            }
        }

    }
}])
.directive("docTitle", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.title.tpl',
        transclude:true,
        replace:true,
        restrict: 'E',
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
        link: function(scope, element, attr) {
            console.log(scope.doc);
        }
    }
}])

.directive("docState", ['RootService', '$timeout', '$compile', function(RootService, $timeout, $compile) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.state.tpl',
        transclude:true,
        replace:true,
        scope:false,
        restrict: 'E',
        link: function(scope, element, attr) {
            var title = attr.name;
            var inherit = false;
            var html;
            if ('default' in attr && 'doc' in scope.$parent) {
                scope.doc.stateIndex = scope.doc.states.length
                title = 'Default';
            }
            if ('inherit' in attr && 'doc' in scope && scope.doc.states.length) {
                html = scope.doc.states[0].html;
                inherit = true;
            }
            if (attr.name && !('default' in attr)) {
                var dashedAttribute = attr.name.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
                var selectedAttrElems = element[0].parentNode.querySelectorAll('[' + dashedAttribute + ']');


            }
            console.log('inner html', element[0]);
            scope.state = {
                title: title,
                id: scope.doc.states.length,
                html: html || element[0].innerHTML,
                inherit: inherit
            }
            scope.doc.states.push(scope.state);
            // $compile(element[0])(scope);
        }
    }
}])
.directive("docSnippet", ['RootService', '$timeout', '$compile', function(RootService, $timeout, $compile) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.snippet.tpl',
        replace:true,
        scope:true,
        transclude:true,
        restrict: 'E',
        link: function(scope, element, attr) {
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
                console.log(scope.snippet.text);
                scope.snippet.text = scope.snippet.text.replace('<span>', '').replace('}', '\n}').replace('</span>', '').trim();
            }
            scope.doc.snippets.push(scope.snippet);
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
            return;
        }
    }
}])
.directive("docSnippets", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.snippets.tpl',
        transclude:true,
        replace:true,
        restrict: 'E',
        link: function(scope, element, attr) {
            console.log('snippet index rendered', element[0])
            return;
        }
    }
}])