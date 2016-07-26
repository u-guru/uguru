angular.module('uguru.admin')

.controller('AdminPlaygroundController', [
  '$scope',
  '$state',
  '$timeout',
  '$interval',
  '$localstorage',
  '$window',
  'AnimationService',
  'SpecService',
  '$compile',
  'DirectiveService',
  function($scope, $state, $timeout, $interval, $localstorage, $window, AnimationService, SpecService, $compile, DirectiveService) {
    var apc = this;
    apc.options = {
      transform: {
        args: [
          {name: 'scale[XYZ]'},
          {name: 'translate[XYZ]'},
          {name: 'rotate[XYZ]'},
          {name: 'skew[XY]', value: 'coord'},
          // {name: 'origin', value:'coord'},
          {name: 'perspective(VAL)'},
          {name: 'to(#select)', value: 'selector'},
          // {name: 'clear', value: ['arg', 'all']},
        ],
        options: {
          coords: ['px', 'vp', '%', 'deg'],
          time: ['s'],
          func: ['timing func']
        },
        clear: getClearingFunction,
        examples: [
          {
            args: ['skewX', 'skewY'],
            str: 'transform:[skew:(0.5rad, 30deg), duration:1000]'
          },
          {
            args: ['to', 'duration', 'delay'],
            str: 'transform:[to:(#title), duration:250, delay:500]'
          },
          {
            args: ['rotateX', 'rotateY', 'rotateZ'],
            str: 'transform:[rotate:(45deg,50deg,0.75turn), p:500px, duration:500]'
          },
          {
            args: ['translate3d'],
            str: 'transform:[translate:(20%,20%,100px), p:500px, duration:500]'
          },
          {
            args: ['scale', 'scaleZ', 'scaleY', 'scaleX'],
            str: 'transform:[scale:(1.5,1.9,1.9), p:500px, duration:500]'
          },

        ]
      }
    }

    // $timeout(function() {
      initPlaygroundVars($scope.name, apc);
    // }, 1000)

    function initPlaygroundVars(name, index) {
      if (name in apc.options) {
        var examples = apc.options[name]['examples'];
        var element = document.querySelector('#playground-view rect');

        if (!element || !examples) return;
        for (var i = 0; i < examples.length; i++) {
          if (i === 0) {
            apc.example =  apc.options[name]['examples'][0];
            apc.exampleIndex = 0;
          }

            examples[i].id = i;
            examples[i].play = getPlayingFunction(examples[i], element.parentNode);
            examples[i].clear = apc.options[name].clear(name, examples[i], element.parentNode)
        }
      }
    }


    function getPlayingFunction(example_obj, element) {
      return function() {
        var args = DirectiveService.parseArgs(example_obj.str);
        for (key in args) {
          DirectiveService.activateArg(key, args[key], $scope, angular.element(element));
        }
        example_obj.showReset = true;
        // for (arg in args) {
        //   arg && DirectiveService.activateArg(arg);
        // }
        // console.log(element, example_obj);
      }
    }

    function getClearingFunction(name, example_obj, element) {
      if (name === 'transform') {
        return function() {
          element.style['transform'] = '';
          element.style['transition'] = '';
          element.style['webkitTransform'] = '';
          element.style['webkitTransition'] = '';
          example_obj.showReset = false;
        }
      }
    }

    apc.updateElement = function(str, example_obj) {
      element = document.querySelector('#playground-view svg rect');
      element.parentNode.setAttribute('init-with', str);
      // element.parentNode.removeAttribute('init-later');
      // element.parentNode.setAttribute('init-later', null);
      $compile(angular.element(element.parentNode))($scope);
      element.classList.add('init-with')
      example_obj.play = getPlayingFunction(example_obj, element.parentNode);
      example_obj.clear = getClearingFunction($scope.name, example_obj, element.parentNode);

    }

    console.log('name', $scope.name)
    // playground.sections = processPlaygrounds(playgroundDict);
    // playground.activeSection = playground.sections[0];
    // playground.updateActiveSection = updateActiveSection

    function updateActiveSection(section) {
      playground.activeSection = section;
      $timeout(function() {
        $scope.$apply()
      });
    }
    function processPlaygrounds(_dict) {
      var result_arr = [];
      var index =0;
      for (key in _dict) {
        var sectionDict = _dict[key];
        sectionDict.id = index;
        sectionDict.title = key;
        result_arr.push(sectionDict);
        index ++;
      }
      return result_arr;
    };

  }

])

