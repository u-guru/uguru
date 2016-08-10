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
      animation: {
        args: [
          {name: 'template'},
          {name: 'name', default: 'bounceInUp'},
          {name: 'duration', default: '1500ms'},
          {name: 'func', default: 'func'}
        ]
      },
      transform: {
        args: [
          {name: 'scale[XYZ]'},
          {name: 'translate[XYZ]'},
          {name: 'rotate[XYZ]', shortNames:['r[xyz]', 'r-[xyz]', 'ro-[xyz]']},
          {name: 'skew[XY]', value: 'coord'},
          // {name: 'origin', value:'coord'},
          {name: 'perspective(VAL)'},
          {name: 'to(#select)', value: 'selector'},
          {name: 'backface-visibility', shortNames: ['b-v'], valueType: 'string', animatable:false, default:'visible', range: {values: ['visible', 'hidden']}},
          {name: 'perspective-origin', shortNames: ['p-o'], valueType: 'string', animatable:true, default:'50% 50%', range: {values:['*-x-position', '*-y-position'], description: 'one-value, two-value syntax of x/y position'}},
          {name: 'transform-style', shortNames: ['t-s'], valueType: 'string', animatable:false, default:'flat', range: {values:['flat', 'preserve-3d', 'initial', 'inherit'], description: 'let the transformed child preserve the 3d transformation'}},
          {name: 'transform-origin', shortNames: ['t-o'], valueType: 'string', animatable:true, default:'50% 50% 0', range: {values:['*-x-position', '*-y-position', 'z|length|!%'], description: "Set a rotated element's base placement"}},

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
            args: ['rotate-z', 'translate-x', 'scale-y'],
            str: 'transform:[rotatez:-0.75turn, tx:100%, sc-y:2.0, t-o:75% 25% -125px, duration:20000, p:500px, tf:cb(0.230,1.000, 0.320,1.000)]'
          },
          {
            args: ['sk-z', 'sk-x', 'ro-z', 't-o'],
            str: 'transform:[ro-z:-0.75turn, sk-x:100deg, sk-y:-100deg, t-o:75% 25% 125px, duration:1000, p:500px]'
          },
          {
            args: ['backface-visibility'],
            str: 'transform:[b-v:visible, t-o:50% 50% 0, t-s:preserve-3d, p-o:50% 50%]'
          },
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
      $timeout(function() {
        apc.example && apc.example.play();
      })
      $scope.$watch('apc.exampleIndex', function(value) {
        var elem = document.querySelector('svg rect');
        var player = document.querySelector('#transition-player');
        if (player) {

          player.parentNode.removeChild(player);
          $timeout(function() {
            apc.example.play();
            elem.parentNode.classList.remove('inspect');
            elem.parentNode.classList.add('inspect');
            $compile(elem)($scope);
            $scope.$apply();

          })
        }
      })

    function initPlaygroundVars(name, index) {
      apc.type = name;

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

