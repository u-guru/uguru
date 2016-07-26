angular.module('uguru.shared.services')
.factory("TransformService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'AnimationService',
    'RootService',
    TransformService
        ]);

function TransformService($timeout, $state, UtilitiesService, AnimationService, RootService) {

      // ---- transform ----
      // backface-visibility
      // perspective-origin
      // transform-box
      // transform-origin
      // transform-style

      // shorthand syntax
      // timing state
      // clear
      // special coordinates
      // special element properties
      // tweener
      // consecutive
      // animation directive




      // multiple animations at once

      return {
        getElemPosition: getElemPosition,
        getTranslateToCoords: getTranslateToCoords,
        parseTransformArgs: parseTransformArgs,
        getSupported: getSupported
      }

      function getSupported() {
          return ['to', 'translate', 'p-o', 'perspective-origin', 'transform-box', 't-b', 'transform-origin', 'transform-style', 't-s', 't-o',  'backface-visibility', 'b-v', 'perspective-origin', 'p-origin', 'rotate', 'skew', 'skewX', 'skewY', 'duration', 'delay', 'clear', 'tz', 'sz', 'sx', 'sy', 'scale', 'sc', 'moveX', 'moveY', 'moveZ', 'scaleX', 'scaleY', 'scaleZ', 'perspective', 'p'];
      }

      function parse2d(coord_string) {

      }

      function detectTransformDictKey(str) {
        if (['sc', 'scale'].indexOf(str) > -1) {
          return "scale"
        }
        if ('p' === str) {
          return 'perspective'
        }
        if ('sk' === str) {
          return 'skew'
        }
        if ('p-o' === str) {
          return 'perspective-origin'
        }
        if ('t-b' === str) {
          return 'transform-box'
        }
        if ('b-v' === str)  {
          return 'backface-visibility'
        }
        if ('t-o' === str) {
          return 'transform-origin'
        }
        if ('t-s' === str) {
          return 'transform-style'
        }
        if (['tr', 'translate'].indexOf(str) > -1) {
          return "translate"
        }
        if (['r', 'rotate', 'ro'].indexOf(str) > -1) {
          return "rotate";
        }
        return str;
      }
      function parseTransformDictKey(key, str, resultDict) {
        var strSplit = str.split(',');
        if (key === 'scale') {
          var args = ['X', 'Y', 'Z'];
          strSplit.forEach(function(arg, index) {
            resultDict['scale' + args[index]] = parseFloat(arg)
          })
        }
        if (key === 'translate') {
          var args = ['X', 'Y', 'Z'];
          strSplit.forEach(function(arg, index) {
            resultDict['translate' + args[index]] = arg
          })
        }
        if (key === 'rotate') {
          var args = ['X', 'Y', 'Z'];
          strSplit.forEach(function(arg, index) {
            resultDict['rotate' + args[index]] = arg
          })
        }
        if (key === 'skew') {
          var args = ['X', 'Y'];
          strSplit.forEach(function(arg, index) {
            resultDict['skew' + args[index]] = arg
          })
        }
      }

      function parseTransformArgs(transform_dict, elem) {
        var resultDict = {};
        var extra_args = ['t-s', 'transform-style', 'transform-box', 't-b', 'b-v', 'backface-visibility', 't-o', 'transform-origin', 't-s', 'transform-style', 'p-o', 'perspective-origin']
        for (key in transform_dict) {
          parsedKey = detectTransformDictKey(key);
          switch (parsedKey) {
            case ('delay'):
              resultDict.delay = parseInt(transform_dict[key]);
              break;
            case ('scale'):
              parseTransformDictKey(parsedKey, transform_dict[key], resultDict)
              break;
            case ('perspective'):
              resultDict['perspective'] = transform_dict[key];
              break;
            case ('skew'):
              parseTransformDictKey(parsedKey, transform_dict[key], resultDict)
            case ('translate'):
              console.log(parsedKey)
              parseTransformDictKey(parsedKey, transform_dict[key], resultDict);
              break;
            case ('rotate'):
              console.log(parsedKey);
              parseTransformDictKey(parsedKey, transform_dict[key], resultDict);
            case ('clear'):
              resultDict.translateX = '0px';
              resultDict.translateY = '0px';
              break;
            case ('clear' && transform_dict[key] === 'scale'):
              resultDict.scaleX = '0px';
              resultDict.scaleY = '0px';
            case ('to'):
              resultDict.duration = transform_dict[key]
              var translateCoords = xyToElem(elem, transform_dict[key]);
              for (coordName in translateCoords) {
                resultDict[coordName] = translateCoords[coordName];
              }
              break;
            case ('duration'):
              resultDict.duration = transform_dict[key]
              break;
          }

          if (extra_args.indexOf(key) > -1) {
            var formattedArg = detectTransformDictKey(key);
            console.log(formattedArg);
            if (!('ext' in resultDict)) {
              resultDict.ext = {};
            }
            resultDict.ext[formattedArg] = transform_dict[key];
          }

        }

        return resultDict
      }

      function xyToElem(elem, selector) {
        var translateToElem = document.querySelector(selector);
        if (translateToElem) {
          var to_coords = getElemPosition(translateToElem);
          var from_coords = getElemPosition(elem[0]);
          return getTranslateToCoords(to_coords, from_coords);
        }
      };

      function getElemPosition(elem) {
        var elemRect = elem.getBoundingClientRect();
        return {height: elemRect.height, width: elemRect.width, top: elemRect.top, left: elemRect.left};
      }


      function getTranslateToCoords(from_elem_coords, to_elem_coords, x_offset, y_offset) {
        var translateY = parseInt(from_elem_coords.top - to_elem_coords.top) + ((y_offset && parseInt(y_offset )) || 0);
        var translateX = parseInt(from_elem_coords.left - to_elem_coords.left) + ((x_offset && parseInt(x_offset)) || 0);
        return {translateX: translateX + 'px', translateY: translateY + 'px'};
      }

}
