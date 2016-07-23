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
.directive('actionItem', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        var actionObj = constructObjFromAttr(attr);
        scope.$parent.root.milestones.push(actionObj);
        attr.$set('ngIf', 'false')
     }
    }
    function constructObjFromAttr(attr) {
        return {
            items: attr.items && UtilitiesService.removeAllOccurrancesArr(attr.items, ['[', ']', '"', "'"]),
            priority: parseInt(attr.priority),
            tested: attr.tested === 'true',
            time: attr.time,
            phase: attr.phase,
            type: attr.type,
            group: attr.group
        }
    }
}])
.directive('module', ['$timeout', function ($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    controller: function($scope) {
      $scope.module = {name: '', dimensions:'', workflows: [], teamArr: ['SM', 'GW', 'JO', 'JH']};
    },
    link : function preLink(scope, element, attr, ctrl, transcludeFn) {
        ctrl.element = element;
        if (!attr.name || !attr.dimensions) return;
        if (attr.columns) {
            scope.module.columns = attr.columns.split(',')
        }
        scope.module.name = attr.name
        scope.module.activePerson = attr.active;
        scope.module.dimensions = attr.dimensions;
        scope.module.toggleActivate = toggleActivate;
        $timeout(function() {
            scope.$parent.ms.modules.push(scope.module)
            scope.$parent.ms.activeModule = scope.module
        })
        function toggleActivate(workflow, module) {
            workflow.active = !workflow.active;
            for (var i = 0; i < module.workflows.length; i++) {
                var indexWorkflow = module.workflows[i];
                if (module.workflow !== indexWorkflow) {
                    indexWorkflow.active = false;
                }
            }
        }
     }
    }
}])
.directive('userWorkflow', [function () {
  return {
    replace: true,
    restrict: 'E',
    require: '^module',
    scope: true,
    link: function preLink(scope, element, attr, ctrl) {
        if (!attr.name) return;

        scope.workflow = {
            id: scope.module.workflows.length + 1,
            name: attr.name,
            url: attr.url,
            setup: {
                base: {},
                post: {},
            },
            stories:[],
            priority: parseFloat(attr.priority || 100.0),
            toggleActivate: scope.module.toggleActivate
        }
        if (!scope.module.workflows.length) {
            scope.workflow.active = true;
        }
        scope.$watch('module.activePerson', function(new_person) {
            scope.module.workflows.sort(function(w1, w2) {return w2.priority - w1.priority}).reverse();
        })

        function sortWorkflows() {
            scope.module.workflows.push(scope.workflow);
            scope.module.workflows.sort(function(w1, w2) {return w2.priority - w1.priority}).reverse();
            scope.module.workflows.forEach(function(option, index) {option.pID = index + 1})
        }

        sortWorkflows();
        // scope.module.workflows.reverse()

     }
    }
}])
.directive('userStories', ['$timeout', function ($timeout) {
  return {
    replace: true,
    restrict: 'E',
    require: '^module',
    scope: true,
    controller: function($scope) {
        $scope.workflow = $scope.$parent.workflow;
    },
    link : function(scope, element, attr) {
        // scope.stories = scope.$parent.workflow;
        scope.stories = [];
        scope.personDict = {};
        $timeout(function() {
            scope.$parent.workflow.stories = scope.stories;
            scope.$apply();
                $timeout(function() {
                    scope.$watch('module.activePerson', function(new_person, old_person) {
                    if (new_person in scope.personDict) {
                        scope.personDict[new_person].sort(sortStoryByPriority(new_person));
                        scope.stories = scope.personDict[new_person];
                        scope.$parent.workflow.stories = scope.stories;
                    }
                })
            }, 1000)
        });
     }
    }
}])
.directive('story', ['$timeout', function ($timeout) {
  return {
    replace: true,
    restrict: 'E',
    require: '^module',
    scope: true,
    link : function(scope, element, attr) {
        scope.story = {
            name: attr.name ||attr.desc,
            desc:attr.desc,
            progress: null,
            func: attr.func === 'true',
            tested: attr.tested === 'true',
            cross_platform: attr.crossPlatform === 'true',
            responsive: attr.responsive === 'true',
            streams: [],
            priority: parsePriority(attr.priority) || {SM:100},
            bugs: []
        }
        if (!attr.name) scope.story.desc = '';
        // scope.$watchCollection('story', function(story, old_story) {
        //     scope.story.bugsLength
        // })
        $timeout(function() {
            scope.$parent.stories.push(scope.story)
            // scope.$apply();
            scope.story.priority && updateUserStoriesPriority(scope.$parent, scope.story, scope.module.activePerson);

        })
     }
    }
}])
.directive('uiStream', ['$timeout', function ($timeout) {
  return {
    replace: true,
    restrict: 'E',
    require: ['^module'],
    scope: true,
    link : function postLink(scope, element, attr) {
        scope.stream = {
            desc: attr.desc
        }
        $timeout(function() {
            scope.$parent.story.streams.push(scope.stream);
        })

     }
    }
}])
.directive('bug', ['$timeout', function ($timeout) {
  return {
    replace: true,
    restrict: 'E',
    require: ['^module'],
    scope: true,
    link : function postLink(scope, element, attr) {
        scope.bug = {
            desc: attr.desc,
            type: attr.type
        }
        $timeout(function() {
            scope.$parent.story.bugs.push(scope.bug);
        })

     }
    }
}])
.directive('setup', ['$timeout', function ($timeout) {
  return {
    replace: true,
    restrict: 'E',
    require: ['^module'],
    scope: false,
    link : function postLink(scope, element, attr) {
        var type = attr.type;
        scope[type] = {components:[], directives: [], specs: []}
        $timeout(function() {
            scope.workflow.setup.base = scope[type];
        })
     }
    }
}])
.directive("docItem", ['RootService', '$timeout', '$filter', function(RootService, $timeout, $filter) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.tpl',
        transclude:true,
        replace:true,
        restrict: 'E',
        scope:true,
        controller: 'AdminDocItemController',
        controllerAs: 'doc_item',
        link: function preLink(scope, element, attr, ctrl, transcludeFn) {
            ctrl.element = element;
            element[0].setAttribute('doc-item-id', ctrl.id);
            scope.hide = false;
            if ('keywords' in attr) {
                ctrl.keywords = attr.keywords.split(', ');
            }
            if ('type' in attr) {
                ctrl.type = attr.type;
            }
            $timeout(function() {
                var docItems = RootService.getDocItems();
            }, 1000)

            scope.$watch(function() {
              return element.attr('class');
            }, function(new_value, old_value) {
                $timeout(function() {
                    if (new_value && new_value.indexOf('hide-doc-item') > -1) {
                        element[0].classList.remove('hide-doc-item');
                        scope.hide = true;
                    }
                    if (new_value && new_value.indexOf('show-doc-item') > -1) {
                        element[0].classList.remove('show-doc-item');
                        scope.hide = false;
                    }
                })
            });
        }
    }

}])
.directive("docTitle", ['RootService', '$timeout', function(RootService, $timeout) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.title.tpl',
        transclude:true,
        replace:true,
        restrict: 'E',
        require:'^docItem',
        scope:false,
        link: function(scope, element, attr) {
            scope.doc_item = scope.$parent.doc_item;
            var elementTitle = element[0].querySelector('ng-transclude span:last-child');
            if (!elementTitle) {
                console.log('missing doc title', element[0]);
                return;
            }
            scope.doc_item.title = elementTitle.innerHTML.trim();
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
        require:'^docItem',
        scope:false,
        link: function(scope, element, attr) {
            scope.doc_item = scope.$parent.doc_item;
            var elementDescription = element[0].querySelector('ng-transclude span:last-child');
            if (!elementDescription) {
                console.log('missing doc title', element[0]);
                return;
            }
            scope.doc_item.description = elementDescription.innerHTML.trim();
            return;
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
.directive("docSpec", ['RootService', '$timeout', '$compile', function(RootService, $timeout, $compile) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/admin.doc.spec.tpl',
        transclude:true,
        replace:true,
        scope:{doc:'=', spec:'='},
        restrict: 'E',
        link: function(scope, element, attr, ctrl, transcludeFn) {
            scope.doc = scope.$parent.doc_item;

            if ('spec' in attr && 'doc' in scope) {
                scope.doc.snippetIndex = scope.doc.snippets.length || 0;
                title = 'Default';
            }
            console.log(scope.spec);
            scope.doc && scope.doc.snippets.push(scope.spec);
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
        link: function(scope, element, attr, ctrl, transcludeFn) {
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

            // transcludeFn(function(transEl, transScope) {
            //     var preBlock = document.createElement('pre');
            //     preBlock.appendChild(transEl);
            //     element.append(preBlock);
            //     preBlock.firstChild.innerHTML = transEl.contents();
            // });

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
.directive("debug", ['$timeout', 'RootService',  '$compile', 'AdminDebugService', function($timeout, RootService, $compile, AdminDebugService) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/debug.tpl',
        priority: 10,
        restrict: 'E',
        link: {
            pre: function(scope, element, attr) {
                attr.highlight && AdminDebugService.applyHighlight(rootViewElem);
                element.css({height: '10%', position: 'fixed', width: '100%'});
                element[0].firstChild.style.cssText = element[0].style.cssText;
                var rootViewElem = element[0].parentNode;
                var parentScopeName = AdminDebugService.getParentScope(rootViewElem)
                if (parentScopeName) {
                    scope.parent = scope[parentScopeName];
                    scope.parent.name = parentScopeName;
                    scope.debug = {states:[], options: AdminDebugService.processOptions(attr)};
                    console.log(scope.debug.options.toggles);
                    scope.debug.states = AdminDebugService.getAllDebugElems(element[0].parentNode);
                    console.log(scope.debug.states);
                    if (scope.debug.states.length) {
                        scope.debug.options.showToolbar = true && !('hide' in attr);
                    }
                }
                scope.playAllStates = function() {
                    AdminDebugService.playAllStates(scope.debug.states, scope.debug.options, scope);
                }

                scope.playState = function(state) {
                    AdminDebugService.playState(state, scope);
                }

                if ('autoplay' in attr) {
                    element.ready(function() {
                        scope.playAllStates()
                    })
                }
            // AnimToolService.setStage(scope.stage);

            // scope.stage.recorder = AnimToolService.initRecorder(scope.stage, scope);

            // scope.stage.player = AnimToolService.initPlayer(scope.stage);
            // scope.stage.recorder.start(scope.stage.recorder);
            }
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

function parsePriority(str) {
    var resultDict = {};
    if (str && str.length) {
        var strArr = str.split('|')
        for (var i = 0; i < strArr.length; i++) {
            var indexPriority = strArr[i];
            if (indexPriority.indexOf(':') > -1) {
                indexPrioritySplit = indexPriority.split(':');
                personName = indexPrioritySplit[0];
                personPriority = parseFloat(indexPrioritySplit[1]);
                resultDict[personName] = personPriority;
            }
            else {
                personName = 'SM';
                personPriority = parseFloat(indexPriority);
                resultDict[personName] = personPriority;
            }
        }
        return resultDict;
    }

}

function updateUserStoriesPriority(parent, story, initial) {
    storiesArr = parent.stories;
    personDict = parent.personDict;
    priority = story.priority;
    for (person in priority) {
        if (!(person in personDict)) {
            personDict[person] = [story];
        } else {
            personDict[person].push(story);
            personDict[person].sort(sortStoryByPriority(person))
        }

        person_initial = initial || 'SM';
        if (person_initial) {
            if (!('default' in parent.personDict)) {
                parent.personDict['default'] = parent.stories;
            }
            parent.stories = parent.personDict[person];
        }
    }

}

function sortStoryByPriority(person) {
    return function(story_2, story_1) {
        return (story_2.priority[person] || 100) - (story_1.priority[person] || 100)
    }
}