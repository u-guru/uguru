angular.module('uguru.admin')

.controller('AdminDocsController', [
  '$scope',
  '$state',
  '$timeout',
  '$filter',
  '$stateParams',
  'XHRService',
  'DataService',
  function($scope,  $state, $timeout, $filter, $stateParams, XHRService, DataService) {
    var docs = this;
    var listener = $scope.$watch('data', function(value) {
      if (value) {
        docs.data = value;
        listener();
        DataService.parseAppDataJson(docs.data);
      }
    })


    // if (!$scope.root||!$scope.root.docs) {
    //   $scope.root = {};
    //   $scope.root.docs = {items: RootService.getDocItems(), searchText:'', resultIds: [], resultItems:[]};
    // }

    // docs.items = [];

    // docs.main  = {index: 0, options: ["Notes", "Utility", "Components", "Directives", "Status/Tools", "Research"]};

    // docs.search = function(letters) {
    //     console.log(letters);
    // }

    // docs.debugDirectives = {};
    // docs.debugDirectives.debug_args = [
    //   {name: 'highlight'},
    //   {name: 'hide'},
    //   {name: 'pause-at'},
    //   {name: 'speed'}
    // ]

    // docs.directives = AdminDirectiveService.getAllDirectives()
    // docs.stateDirectives = {
    //   states: [
    //     {name: 'init-later', tags: ['internal'], syntax:'<ELEM init-later>', description: 'Dont even bother rendering it until later, treat it like a comment or a display:none'},
    //     {name: 'init-with', tags: ['internal']},
    //     {name: 'on-init', tags: ['internal']},
    //     {name: 'on-click', type: ['internal', 'default']},
    //     {name: 'on-hover', type: ['internal', 'default'], syntax:'<button on-hover="...." on-hover-delay="1000"/>', description: 'A <b>on-hover-delay</b> directive extension (extension is when the original directive, i.e. on-hover, must also be present for the extension to function.'},
    //     {name: 'on-mouse-enter', type: ['internal', ]},
    //     {name: 'on-mouse-leave', type: ['internal', 'default']},
    //     {name: 'on-exit', type: external},
    //     {name: 'on-enter', type: external}
    //   ],
    //   arg_options: [
    //     {name: 'set', cases: ['Only applies to states that change (or could change) property over a period of time (class, anim).<br><br> Must be within parentheticals, multiple properties separated with "#", and property values that contain commas (such as "Cubic-bezier") should replace each comma with "##" (2nd layer of nesting)'], syntax:'<ELEM on-init="anim:[bounceInUp:set(opacity:0#animation-timing-function:cubic-bezier(1.0##0.0##0.5))]"'},
    //     {name: 'send', cases: ['For now everything is public. Might as well clarify with public when you are not sure since at least one scope is required'], syntax: '<ELEM on-init="anim:[bounceInUp:set(opacity:0#animation-timing-function:cubic-bezier(1.0##0.0##0.5))]'}
    //   ],
    //   shortcuts: [
    //     {name: 'arg-shortcut', options: ['replace', 'with'], description: 'Enables shortcut creation for state arguments such as [anim, trigger, send, class, prop], with a word or letter of your choice.', syntax: '<arg-shortcut replace="prop" with="p"/>'},
    //     {name: 'prop-shortcut', options: ['replace', 'with'], description: 'Enables shortcut creation for CSS property names, such as [opacity-0, animation-timing-function, background-color], with a word or letter of your choice.', syntax: '<prop-shortcut replace="opacity" with="o"/>'},
    //     {name: 'prop-value-shortcut', options: ['replace', 'with'], description: 'Enables shortcut creation for <b>ONE</b> {property:value} CSS pairing', syntax: '<prop-value-shortcut replace="op:0" with="o-0"/>'},
    //     {name: 'cmd-shortcut', options: ['replace', 'with'], description: 'Enables shortcut creation for enter state values, such as anything in quotations after the default applicable states.', syntax: '<cmd-shortcut replace="prop:[opacity:0, z-index:-1000]" with="backstage"/>'}
    //   ],
    //   state_args: [
    //     {
    //       name: 'prop',
    //       full_name: 'Properties',
    //       description:'setting 1 to several properties when a state occurs',
    //       syntax: '<div on-init="prop:[opacity:1:delay-100, opacity:0.5:delay-500, ...]:delay-1000"><div>',
    //       options: ['delay'],
    //       special_notes: ['For situations where there is an extra comma within the VALUE of the CSS property, use a <b>"#"</b>']
    //     },
    //     {
    //       name: 'class',
    //       full_name: 'Class',
    //       description:'adding/removing a class and (optionally) overriding specific properties for that class',
    //       syntax: '<div on-init="class:[opacity-0:add:delay-500, bounceInUp:add:set:(animation-timing-function:linear)]"></div>',
    //       options: ['add', 'remove', 'set','delay']
    //     },
    //     {
    //       name: 'anim',
    //       full_name: 'Animations',
    //       description: "Applying 1 to several pre-defined animations at a particular state, with the option to set overrideable properties before[default] or after, animate in/0 (set opacity = 1/0)",
    //       syntax: '<div on-enter="anim:[bounceInUp:set:(animation-duration:5s), scaleOutX:out:set:(animation-timing-function:ease):delay-2500]">',
    //       options: ['set', 'in', 'out', 'after', 'before', 'delay'],
    //       upcoming: ['[send]ing a message before/after/@T= for an animation']
    //     },
    //     {
    //       name: 'send',
    //       full_name: 'send',
    //       description: 'The communication protocol between two html elements. Sends a message to 1 to several elements of a particular scope (optional to clarify, public for now).',
    //       syntax: '<div on-enter="send:[div-has-entered:children:delay-500, div-has-entered:parent:delay-1000]"></div>',
    //       options: ['public', 'delay', 'children', 'parent', 'siblings'],
    //       special_notes: ['Must include <i>at least</i> one <b>SCOPE-SPECIFIC</b> (either children, parent, siblings, parent) option'],
    //       upcoming: ['send to multiple scoped audiences with () syntax vs repeating', 'left neighbor', 'right neighbor', 'stagger-ed sending', 'N-th levels up', 'public']
    //     },
    //     {
    //       name: 'trigger',
    //       full_name: 'Trigger',
    //       description: 'Trigger any already-available HTML event on any INTERNAL state such as click, hover, mouse-enter, mouse-leave',
    //       syntax: '<div on-init="trigger:[on-enter:delay-250]">',
    //       options: ['children', 'parent', 'siblings']
    //     }
    //   ]
    // }

    // docs.getSearchTerms = function() {
    //   docs.items = RootService.getDocItems();
    // }

    // docs.searchText = '';

    // $scope.$watch('root.docs.searchText', function(value) {
    //   $timeout(function() {
    //     $scope.root.docs.resultItems = $filter('filter')($scope.root.docs.items, {keywords: value}, true);
    //       $scope.root.docs.resultIds = $scope.root.docs.resultItems.map(function(item, index) { return item.id});
    //       var docItemElems = document.querySelectorAll('[doc-item-id]');
    //       for (var i = 0; i < docItemElems.length; i++) {
    //         var elemId = parseInt(docItemElems[i].getAttribute('doc-item-id'));
    //         if (!($scope.root.docs.resultIds.indexOf(elemId) > -1)) {
    //            docItemElems[i].classList.add('hide-doc-item');
    //         } else {
    //           docItemElems[i].classList.add('show-doc-item');
    //         }
    //       }
    //   })
                // for (var i = 0; i < results.length; i++) {
                //   $scope.root.docs.items
                // }

  //   })

  }

])
