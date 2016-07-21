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
      /*todo
             --> notify siblings + delay
             --> refactor code + apply to on-enter, etc
             --> does delay work?
             --> docs+demo
      */
      return {
        getElemPosition: getElemPosition,
        getTranslateToCoords: getTranslateToCoords,
        parseTransformArgs: parseTransformArgs
      }

      function parseTransformArgs(transform_dict, elem) {
        var resultDict = {};
        for (key in transform_dict) {
          switch (key) {
            case ('delay'):
              resultDict.delay = parseInt(transform_dict[key]);
              break;
            case ('scale'):
              resultDict.scaleX = transform_dict[key].replace('(', '').replace(')', '').split(',');
              resultDict.scaleY = transform_dict[key].replace('(', '').replace(')', '').split(',');
            case ('clearY'):
              resultDict.translateY = '0px';
            case ('clearX'):
              resultDict.translateX = '0px';
            case ('clear'):

              resultDict.translateX = '0px';
              resultDict.translateY = '0px';
              break;
            case ('clear' && transform_dict[key] === 'scale'):
              resultDict.scaleX = '0px';
              resultDict.scaleY = '0px';
            case ('duration'):
              resultDict.duration = transform_dict[key]
              break;
            case ('to'):
              resultDict.duration = transform_dict[key]
              var translateCoords = xyToElem(elem, transform_dict[key]);
              for (coordName in translateCoords) {
                resultDict[coordName] = translateCoords[coordName];
              }
              if (!translateCoords)  return;
              break;
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
