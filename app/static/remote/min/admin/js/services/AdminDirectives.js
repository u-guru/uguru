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
.directive("animationPlayer", ['$timeout', 'RootService', function($timeout, RootService) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/animation.player.tpl',
        restrict: 'E',
        scope: {anim:'=anim'},
        replace: true,
        link: function(scope, element, attr) {
            var browserPrefix = RootService.getBrowserPrefix() || '';
            scope.player = {idle: true, playing:false, refreshable: false};
            var startListener = scope.anim.listeners.start();
            // var endListener = scope.anim.listeners.end(function() {scope.anim.playState = 'paused';});
            scope.play = function() {
                console.log('clicked');
                scope.anim.element.css('-webkit-animation-name', '');
                scope.anim.playState = 'running';

                $timeout(function() {
                    scope.anim.element.css('-webkit-animation-name', scope.anim.name);
                    scope.$apply();
                })
            }

            var animStartEvent = 'animation';
            if (browserPrefix) {
                animStartEvent = browserPrefix.toLowerCase() + 'Animation'
            }
        }
    }
}])
.directive("player", ['$timeout', 'RootService', function($timeout, RootService) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/player.tpl',
        restrict: 'E',
        scope: {root:'=root', state:'=state', startOffset:'=startOffset', duration: '=duration', props:'=props', play:'=play', pause:'=pause', update: '=update'},
        replace: true,
        link: function(scope, element, attr) {
            scope.playerPos = scope.startOffset;
            scope.activeAttrIndex = -1
            scope.activateAttr = function($index, key) {

                scope.activeAttrIndex = $index;
                scope.activeAttrArr = scope.props.attr[key].arr;
                console.log(scope.activeAttrArr);
                if (key !== 'style') {
                    scope.activeAttrArr = scope.activeAttrArr[0];
                }


                $timeout(function() {
                    scope.$apply();
                });
            }
            scope.goBackOneLevel = function() {
                scope.activeAttrIndex = -1;
                scope.activeAttrArr = null;
            }
        }
    }
}])
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
.directive('module', ['$timeout', '$stateParams', function ($timeout, $stateParams) {
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

        scope.module.typeFilter = $stateParams.type;
        scope.module.activePerson = attr.active;
        scope.module.dimensions = attr.dimensions;
        scope.module.toggleActivate = toggleActivate;
        $timeout(function() {
            scope.$parent.ms.modules.push(scope.module);
            scope.$parent.ms.activeModule = scope.module;
            $timeout(function() {
                scope.$watch('module.workflows', function(workflows) {

                    for (var i = 0; i < workflows.length; i++) {
                        var iWorkflow = workflows[i];
                        iWorkflow.progress = iWorkflow.calculateProgress(iWorkflow.stories);
                    }
                    $timeout(function() {
                        scope.module.progress = calcModuleProgress(scope.module.workflows);
                    })


                })
            })
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
.directive('userWorkflow', ['UtilitiesService','$timeout', '$stateParams', function (UtilitiesService, $timeout, $stateParams) {
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
            filter: {options: ['stories','streams', 'bugs', 'states'], tags:[], tagsUpdated: false, activeIndex: 0},
            sort_tags: {functional: false, cp: false},
            columns: {
                bugs: ['id', 'name', 'description', 'platform', 'by', 'tested'],
                streams: ['name', 'tags/status', 'progress'],
                stories: ['name', 'tags/status', 'progress'],
                states: ['name', 'tags/status', 'progress']
            },
            bugs:[],
            access: checkInitialAccess(scope.module, scope.module.activePerson),
            streams: [],
            states: [],
            url: attr.url,
            completed: 'completed' in attr,
            setup: {
                base: {},
                post: {},
            },
            complete: 'complete' in attr,
            priority: ('priority' in attr && parseFloat(attr.priority)) || 100,
            stories:[],
            calculateProgress: calcWorkflowProgress,
            progress: {},
            personDict: {},
            enabled: $stateParams.type && $stateParams.type === attr.type,
            priority: parseFloat(attr.priority || 100.0),
            toggleActivate: scope.module.toggleActivate
        }

        if (!scope.module.workflows.length) {
            scope.workflow.active = true;
        };

        function parseDefaultFilters(str_defaults, active_person, all_tags) {
            if (!all_tags) return;
            var strDefaultsSplit = UtilitiesService.replaceAll(str_defaults, ', ', ',').split(',');
            var personFilterDict = {};
            strDefaultsSplit.forEach(
                function(option, index) {
                    var initial = option.split(':')[0]
                    var formattedTags = option.split(':').splice(1).join(":");
                    formattedTags = UtilitiesService.removeAllOccurrancesArr(formattedTags, ['[', ']'])
                    var tagArr = formattedTags.split('|');
                    tagArr.forEach(function(option, index) {tagArr[index] = UtilitiesService.replaceAll(option, ':', '|')})
                    personFilterDict[initial] = {tags: tagArr};
                }
            );
            if (active_person in personFilterDict && personFilterDict[active_person]) {
                var activeTags = personFilterDict[active_person].tags;
                var selectedTags = [];
                for (var i = 0; i < activeTags.length; i++) {
                    var iTag = activeTags[i];
                    all_tags.forEach(function(tag, index) {

                        if (tag.kvStr === iTag) {
                            tag.active = true;
                            selectedTags.push(tag);
                        } else if (tag.kvStr.indexOf(iTag.split('|')[1]) > -1) {
                            var tagArgSplit = tag.kvStr.split('|');
                            var iTagArgSplit = iTag.split('|');
                            if (tagArgSplit[0] === iTagArgSplit[0]) {
                                tagArg2 = tagArgSplit[1]
                                iTagArg2 = iTagArgSplit[1];
                                if (tagArg2.indexOf(iTagArg2) > -1) {
                                    tag.active = true;
                                    selectedTags.push(tag);
                                }
                            }
                        }
                    })
                }
                return selectedTags;
            }
        return []
        }

        scope.$watch('module.activePerson', function(new_person) {
            scope.module.workflows.sort(function(w1, w2) {return w2.priority - w1.priority}).reverse();
        })
        scope.$watch('workflow.filter.activeIndex', function(new_index) {
            scope.workflow.filter.tags = getCommonTagsAndFunc(scope.workflow, attr.tags, scope.module.activePerson);
            scope.workflow.filter.selectedTags = attr.defaultFilters && parseDefaultFilters(attr.defaultFilters, scope.module.activePerson, scope.workflow.filter.tags);
            scope.workflow.filter.tagsUpdated = true;
            $timeout(function() {
                scope.$apply();
            });
        })

        $timeout(function() {
            scope.$watch('workflow.filter.tagsUpdated', function(update) {
                if (!update) return;
                scope.workflow.filter.tagsUpdated = false;
                var activeFilterName = scope.workflow.filter.options[scope.workflow.filter.activeIndex];
                var activeFilterArr = scope.workflow[activeFilterName];
                var activeTags = [];
                scope.workflow.filter.tags.forEach(function(tag, index) {if (tag.active) activeTags.push(tag.kvStr)});

                for (var i = 0; i < activeFilterArr.length; i++) {
                    var iFilterObj = activeFilterArr[i];
                    iFilterObj.activeTagCount = 0;
                    if (iFilterObj.tags && iFilterObj.tags.length) {
                        iFilterObj.tags.forEach(function(tag, index) {
                            if (activeTags.indexOf(tag.kvStr) > -1) {
                                iFilterObj.activeTagCount += 1;
                                iFilterObj.tags[index].active = true;
                            } else {
                                iFilterObj.tags[index].active = false;
                            }
                        })
                    }
                    if (iFilterObj.activeTagCount) {
                        iFilterObj.inactive = false;
                    } else {
                        iFilterObj.inactive = true;
                    }
                }
                scope.workflow[activeFilterName].sort(function(item_1, item_2) {return item_2.activeTagCount - item_1.activeTagCount});
            });
            $timeout(function() {

                scope.workflow.filter.tagsUpdated = false;
                scope.workflow.filter.tagsUpdated = true;
            })

        })



        function sortWorkflows() {
            scope.module.workflows.push(scope.workflow);
            scope.module.workflows.sort(function(w1, w2) {if (w2.access) w2.priority = 10000; if (w1.access) w1.priority = 10000; return w2.priority - w1.priority}).reverse();
            var filterdWorkflows = scope.module.workflows.filter(function(w, i) {return w.enabled && !w.completed})
            filterdWorkflows.forEach(function(option, index) {option.pID = index + 1})
            scope.module.workflows = filterdWorkflows;
            for (var i = 0; i < scope.module.workflows.length; i++) {
                var iWorkflow = scope.module.workflows[i];
                var length1 = iWorkflow.stories.length;
                iWorkflow.stories = iWorkflow.stories && iWorkflow.stories.filter(function(s, i) { return !('type' in s) || s['type'] === $stateParams.type})
                var length2 = iWorkflow.stories.length;
            }
        }

        function checkInitialAccess(module, workflow_id, initial) {
            var result = (attr.access && attr.access.length && attr.access.indexOf(initial) === -1)

            for (var i = 0; i < module.workflows.length; i++) {

            }
            return result;
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
        scope.stories = [];
        scope.personDict = {};
        $timeout(function() {
            scope.workflow = scope.$parent.workflow;
            scope.workflow.stories = scope.stories;
            scope.workflow.personDict = scope.personDict;
            scope.$apply();
                $timeout(function() {
                    scope.$watch('module.activePerson', function(new_person, old_person) {
                    if (new_person in scope.personDict) {
                        scope.personDict[new_person].sort(sortStoryByPriority(new_person));
                        scope.stories = scope.personDict[new_person];
                    }
                    scope.$watch('workflow.stories', function(new_value) {
                        var activePerson = scope.module.activePerson;
                        for (var i = 0; i < scope.workflow.stories.length; i++) {
                            var iStory = scope.workflow.stories[i];
                            iStory.progress = iStory.calculateProgress(iStory.streams);
                            for (var j = 0; j < iStory.streams.length; j ++) {
                                var jStream = iStory.streams[j];
                                scope.workflow.states.sort(function(s1, s2) {
                                    s1 = parseFloat(s1);
                                    s2 = parseFloat(s2);
                                    if (s1.complete) {
                                        s1.priority = 101;
                                    }
                                    if (s2.complete) {
                                        s2.priority = 101;
                                    }
                                    return s2.priority - s1.priority;
                                }).reverse();
                                scope.workflow.states.forEach(function(s, i) {s.pID = i+1})
                            }
                        }
                        if (scope.workflow.progress && scope.workflow.stories.length) {
                            scope.workflow.progress.stories = {total: scope.workflow.stories.length, complete : scope.workflow.stories.filter(function(s, i) {return s.complete}).length}
                            var workflowStateProgress = {total: 0, complete: 0};

                            scope.workflow.stories && scope.workflow.stories.forEach(function(s, i) {
                                workflowStateProgress.total += (s.states && s.states.length) || 0;
                                workflowStateProgress.complete += (s.states && s.states.length && s.states.filter(function(st, i) {return st.complete}).length) || 0;
                            })
                            scope.workflow.progress.states = workflowStateProgress;

                        }
                        scope.workflow.stories.forEach(function(s, i) {s.pID = i + 1})
                    })
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
            calculateProgress: calcStoryProgress,
            func: attr.func === 'true',
            tested: attr.tested === 'true',
            cross_platform: attr.crossPlatform === 'true',
            responsive: attr.responsive === 'true',
            children: ['streams', 'states', 'bugs'],
            streams: [],
            priority: 'priority' in attr && parseFloat(attr['priority']) || 100,
            progress: {},
            complete: 'complete' in attr,
            states: [],
            type: 'type' in attr && attr.type || null,
            priority: parsePriority(attr.priority) || {SM:100},
            bugs: []
        }
        if (scope.story.complete) {
            scope.story.progress = scope.story.calculateProgress(scope.story.streams);
            scope.story.progress.states.total = 1;
            scope.story.progress.states.complete = 1;
        }
        if (!attr.name) scope.story.desc = '';
        // scope.$watchCollection('story', function(story, old_story) {
        //     scope.story.bugsLength
        // })

        $timeout(function() {
            scope.stories = scope.$parent.stories;
            scope.stories.push(scope.story);

            scope.story.id = scope.stories.length + 1;
            // scope.$apply();
            scope.story.priority && updateUserStoriesPriority(scope.$parent, scope.story, scope.module.activePerson);
             scope.$watch('story.streams', function(streams) {
                var activePerson = scope.module.activePerson;
                for (var i = 0; i < scope.story.streams.length; i++) {
                    var iStream = scope.story.streams[i];
                    iStream.progress = iStream.calculateProgress(iStream.states);
                }
            })

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
            desc: attr.desc,
            states:[],
            bugs: [],
            progress:{},
            type: 'type' in attr && attr['type'],
            cp: ('cp' in attr && attr['cp']) || false,
            func: ('func' in attr && attr['func']) || false,
            calculateProgress: calcStreamProgress
        }
        $timeout(function() {
            scope.story = scope.$parent.story;
            scope.story.streams.push(scope.stream);
            scope.stream.id = scope.story.streams.length + 1;
            scope.story_id = scope.story.id;
            $timeout(function() {

                scope.$parent.workflow.streams.push(scope.stream);
                // console.log();
                // scope.$parent.workflow.states.push(scope.state);
                scope.$watch('stream.states', function(states) {
                    states.forEach(function(s, index) { if (s.complete) {s.priority = 101; }});
                    states && states.sort(function(s1, s2) {
                        return s2.priority - s1.priority;
                    })
                    states && states.forEach(function(s, index) { s.pID = index + 1;})
                })
            })
        })

     }
    }
}])
.directive('uiState', ['$timeout', 'AdminDebugService', function ($timeout, AdminDebugService) {
  return {
    replace: true,
    restrict: 'E',
    require: ['^module'],
    scope: true,
    link : function postLink(scope, element, attr) {
        scope.state = {
            desc: attr.desc,
            name: attr.name,
            testId: attr.testId,
            bugs:[],
            complete: 'complete' in attr,
            testObj: null,
            tags: [],
            type: 'type' in attr && attr['type'],
            func: 'func' in attr && (attr['func'] === 'true' || attr['functional'] === 'true'),
            cp: 'cp' in attr && attr['cp'] === 'true',
            tested: 'tested' in attr && attr['test'] === 'true',
            priority: 'priority' in attr && parseFloat(attr['priority']) || 100,

        }
        $timeout(function() {
            scope.stream = scope.$parent.stream;
            if (!scope.state.type && scope.stream && scope.stream.type) {
                scope.state.type = scope.stream.type;
            }
            else if (!scope.state.type && (!scope.stream || !scope.stream.type)) {
                scope.state.type = scope.$parent.story.type;
            }
            $timeout(function() {
                if (scope.stream && scope.stream.states) {
                    scope.state.id = scope.stream.states.length + 1;
                    scope.state.stream_id = scope.stream.id;
                    scope.stream.progress = scope.stream.calculateProgress(scope.stream.states);
                    scope.stream.states.push(scope.state);
                }
            })


            $timeout(function() {
                if (scope.$parent.workflow.type) {
                    console.log('has type');
                    scope.state.type = scope.$parent.story.type;
                }
                scope.$parent.story.states.push(scope.state);
                scope.$parent.workflow.states.push(scope.state);

                scope.$parent.story.progress = scope.$parent.story.calculateProgress(scope.story.streams);
            })
            //@jason
            if ('testId' in attr && attr.testId.length) {
                // passes the scope so you can update it immediately (you pulled all the bugs locally)
                scope.state.testObj = AdminDebugService.getTestStateObj(parseInt(attr.testId), scope.state);

                // three checks in the if statement?
                //check 1, does it return something immediately
                //check 2, does it return a dictionary
                //check 3, does the dictionary have the ID in it
                if (scope.state.testObj && typeof(scope.state.testObj) === 'object' && 'id' in scope.state.testObj) {
                    attr.testId = scope.state.testObj.id;
                    console.log('test state id', attr.testId, scope.state.testObj);
                } else {
                    //if it doesnt return something immediately, b/c i passed u the scope, if you make a server request to get the object,
                    scope.$watch('state.testObj', function(updated_obj) {
                        if (updated_obj && typeof(updated_obj) === 'object' && 'id' in updated_obj) {
                            attr.testId = updated_obj.id;
                            console.log('test state id', attr.testId, scope.state.testObj);
                        } else {
                            console.log('returned object from BugService getTestStateObj', updated_obj);
                        }
                    })
                }
            }

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
        var supportedTypes = ['functional', 'static', 'animation'];
        scope.bug = {
            desc: attr.desc || attr.description,
            type: attr.type,
            platform: attr.platform,
            by: attr.by,
            id: attr.id,
            tested: attr.tested === 'true',
            open: 'open' in attr,
            tested: ('tested' in attr && attr.tested === 'true') || false,
        }
        $timeout(function() {

            scope.state = scope.$parent.state;

            scope.state.bugs.push(scope.bug);
            // scope.state.stream.bugs.push(scope.bug);
            // scope.state.story.bugs.push(scope.bug);
            $timeout(function() {
                if (scope.bug.type === 'functional') {
                    scope.bug.id = scope.$parent.$parent.workflow.bugs.length + 1;
                    scope.bug.state_id = scope.state.id;
                    scope.bug.stream_id = scope.state.stream_id;
                    // scope.bug.name = (scope.$parent.stream.name || '') + ' ' + scope.state.name;
                    scope.$parent.$parent.workflow.bugs.push(scope.bug);
                }
            })

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
                scope.doc.snippetIndex = scope.doc.snippets.length;
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
            // personDict[person].push(story);
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

function calcWorkflowProgress(story_arr) {
    var resultDict = {func: 0, total: story_arr.length, cp: 0, responsive:0, tested: 0};
    for (var i = 0; i < story_arr.length; i++) {
        var iStory = story_arr[i];
        if (iStory.progress && iStory.progress.total > 0) {
            resultDict.func += iStory.progress.func;
            resultDict.cp += iStory.progress.cp;
            resultDict.tested += iStory.progress.tested;
            resultDict.responsive += iStory.progress.responsive;
        }
    }
    return resultDict;
}

function sortStoryByPriority(person) {
    return function(story_2, story_1) {
        return (story_2.priority[person] || 100) - (story_1.priority[person] || 100)
    }
}

function calcModuleProgress(workflows) {
    var resultDict = {workflows: { func: 0, total: workflows.length, cp: 0, responsive:0, tested: 0}, states: {}};
    resultDict.states.total = 0;
    resultDict.states.func = {total: 0, complete: 0, bugs: 0};
    resultDict.states.cp = 0;
    resultDict.states.tested = 0;
    resultDict.states.mTested = 0;
    for (var i = 0; i < workflows.length; i++) {
        var iWorkflow = workflows[i];
        if (iWorkflow.func) resultDict.workflows.func += 1;
        if (iWorkflow.tested) resultDict.workflows.tested += 1;
        if (iWorkflow.cp) resultDict.workflows.cp += 1;
        if (iWorkflow.response) resultDict.workflows.responsive += 1;
        iWorkflow.states.forEach(
            function(state, index)
            {
                if (isStateOfType(state, 'func'))  {
                        resultDict.states.func.total += 1;
                    if (state['func']) {
                        resultDict.states.func.complete += 1;
                    }
                    if (state.bugs && state.bugs.length) {
                        state.bugs.forEach(function(bug, index) {
                            if (bug && isStateOfType(bug, 'func')) {
                                resultDict.states.func.bugs += 1;
                            }
                        })
                    }
                }
            }
        )
    }
    console.log(resultDict.states);

    return resultDict;
}

function isStateOfType(state, _type) {
    if (_type === 'func') {
        return ('func' in state || ('type' in state && state['type'] && state['type'].indexOf('func') > -1))
    }
}

function calcStreamProgress(state_arr) {
    var resultDict = {func: 0, total: state_arr.length, cp: 0, responsive:0, tested: 0};
    for (var i = 0; i < state_arr.length; i++) {

        var iState = state_arr[i];
        if (iState.func) resultDict.func += 1;
        if (iState.tested) resultDict.tested += 1;
        if (iState.cp) resultDict.cp += 1;
        if (iState.response) resultDict.responsive += 1;
    }
    return resultDict;
}

function calcStoryProgress(stream_arr) {
    var resultDict = {func: 0, cp: 0, tested: 0, responsive: 0, total: stream_arr.length, states: {total:0, complete:0}};
    for (var i = 0; i < stream_arr.length; i++) {
        var iStream = stream_arr[i];
        if (iStream.progress && iStream.progress.total > 0) {
            resultDict.func += iStream.progress.func;
            resultDict.cp += iStream.progress.cp;
            resultDict.tested += iStream.progress.tested;
            resultDict.responsive += iStream.progress.responsive;
            resultDict.states.total += iStream.states.length;
            resultDict.states.complete += iStream.states.filter(function(s, i) { return s.complete}).length
        }
    }
    return resultDict;
}

function getCommonTagsAndFunc(workflow, attr_tags, person) {
    var resultTags = [];
    var defaultFilterAttr = ['type', 'func', 'cp']
    var activeFilter = workflow.filter.options[workflow.filter.activeIndex];

    if (!activeFilter || (!workflow[activeFilter])) {
        return resultTags;
    }
    var activeFilterArr = workflow[activeFilter]
    for (var i = 0; i < activeFilterArr.length; i++) {
        var iFilterObj = activeFilterArr[i];

        if (!iFilterObj) continue;
        iFilterObj.tags = [];
        //going through type =

        for (var j = 0; j < defaultFilterAttr.length; j++) {
            var iFilterAttr = defaultFilterAttr[j];
            if (iFilterAttr in iFilterObj && (typeof(iFilterObj[iFilterAttr]) === 'boolean' || (iFilterObj[iFilterAttr] && iFilterObj[iFilterAttr].length))) {;
                if (typeof(iFilterObj[iFilterAttr]) === 'string') {
                    var tagAttrSplit = iFilterObj[iFilterAttr].split(',');
                    tagAttrSplit.forEach(function(item, index) {tagAttrSplit[index] = item.replace(' ', '').trim()})
                    for (var k = 0; k < tagAttrSplit.length; k++) {
                        var indexTag = tagAttrSplit[k];
                        var tagDict=  {};
                        tagDict[iFilterAttr] = indexTag;
                        tagDict['kvStr'] = iFilterAttr + '|' + iFilterObj[iFilterAttr];
                        resultTags.push(tagDict);
                        iFilterObj.tags.push(tagDict)
                    }

                } else if (typeof(iFilterObj[iFilterAttr]) === 'boolean') {
                    var tagDict=  {};
                    tagDict[iFilterAttr] = iFilterObj[iFilterAttr];
                    tagDict['kvStr'] = iFilterAttr + '|' + iFilterObj[iFilterAttr];
                    resultTags.push(tagDict);
                    iFilterObj.tags.push(tagDict);
                }
            }
        }
        iFilterObj.stringTags = iFilterObj.tags.splice().forEach(function(tag, index) {tag = tag.kvStr});
    }
    resultDict = {};
    resultTags.forEach(function(tag_dict, index) {
        if (!tag_dict) {return}
        var key = Object.keys(tag_dict)[0];
        var strKey = Object.keys(tag_dict)[1];

        var kvStr = tag_dict[strKey];
        var tag_value = tag_dict[key] + '';

        if (key in resultDict) {
            if (!(tag_value in resultDict[key])) {
                resultDict[key][tag_value] = {count:1, kvStr:kvStr};
            } else {
                resultDict[key][tag_value].count += 1;
            }
        } else {
            resultDict[key] = {};
            resultDict[key][tag_value] = {count: 1, kvStr:kvStr};
        }
    })
    resultArr = [];

    for (key in resultDict) {
        for (nested_key in resultDict[key]) {
            resultArr.push({name: key, value: nested_key, kvStr: resultDict[key][nested_key].kvStr, count: resultDict[key][nested_key].count, active:false})
        }
    }
    return resultArr;
}