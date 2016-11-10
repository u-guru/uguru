angular
    .module('uguru.shared.services')
    .factory('CompService', [
    '$timeout',
    '$compile',
    '$parse',
    '$rootScope',
    CompService
    ]);

function CompService($timeout, $compile, $parse, $rootScope) {
  var genOptionSpec = ['type', 'when-*', 'as*', '']
  var flexAlignMapping = {'bottom': 'flex-end', 'left': 'flex-start', 'right': 'flex-end', 'top': 'flex-start'}
  var itemSpec = [];
  var globals= {attr: {}, attrWithValue:{}, _class:{}}
  var css = initCSSObj();
  return {
    getBaseSpec: getBaseSpec,
    getOptions: getOptions,
    getCompTemplateType: getCompTemplateType,
    getAndParseDimensions: getAndParseDimensions,
    applyDelayToWord: applyDelayToWord,
    parseSrcUrl: parseSrcUrl,
    getMediaElemOfType: getMediaElemOfType,
    renderAlign: renderAlign,
    renderAllStyleAttributes: renderAllStyleAttributes,
    initializeModalAttr: initializeModalAttr,
    globals: globals,
    css: css
  }

  function isSVGElement(name) {
    name = name.toLowerCase();
    return ['path', 'g', 'rect', 'svg', 'polygon', 'line', 'circle'].indexOf(name) > -1;
  }

  function initCSSObj() {
    return {
      render: {
        width: renderWidthFunc,
        height: renderHeightFunc
      }
    }
  }

  function renderHeightFunc(elem, attr, scope) {
    if (attr.height && !isSVGElement(elem[0].nodeName.toLowerCase())) {
        if (attr.height.indexOf('%') === -1 && attr.height.indexOf('px') === -1) {
            elem.css('height', attr.height + '%')
        } else {
            elem.css('height', attr.height)
        }
    }
  }

  function renderWidthFunc(elem, attr, scope) {
    if (attr.width && !isSVGElement(elem[0].nodeName.toLowerCase())) {
      if (attr.width.indexOf('%') === -1 && attr.width.indexOf('px') === -1) {
          elem.css('width', attr.width + '%')
      } else {
          elem.css('width', attr.width)
      }
    }
    //ideal
    // var extraUnit = ((attr.width.indexOf('%')>-1 || attr.width.indexOf('px')>-1 || attr.width.indexOf('em')>-1 )&& '') || '%';
    //         var attrWidth = attr.width;
    //         ['%', 'px', 'em', 'vw', 'vh'].forEach(function(unit) {
    //             if (attrWidth.indexOf(unit) > 0) {
    //                 extraUnit = unit;
    //                 attrWidth = attrWidth.replace(unit, '')
    //             }
    //         })
    //         attrWidth = $parse(attrWidth)($rootScope);
    //         console.log(attrWidth)
    //         element.css('width', attrWidth + extraUnit);
  }

  function initializeModalAttr(p_elem, attr, _window) {
    validDirections = ['top', 'bottom', 'left', 'under'];

    // if (validDirections.indexOf(attr) > -1) {
      // 'top' in attr && p_elem.css('transform', ('translateY(-' + _window.height + 'px'))
      // 'bottom' in attr && p_elem.css('transform', ( 'translateY('+ _window.height + 'px'))
      // 'left' in attr && p_elem.css('transform', ('translateX(' + _window.width + 'px'))
      // 'right' in attr  && p_elem.css('transform', ('translateX(-' + _window.width + 'px'))
    // }

    // if (attr.linkCoordsWith && attr.linkCoordsWith.length) {
    //   scope.root.
    // }

    if (attr.name && attr.name.length) {

      var statePrecursor = 'when-modal-' + attr.name.toLowerCase() + '-requested';

      for (key in attr.$attr) {
        if (key.indexOf('when') === 0) {
          var whenStateNameContents = attr[key];

          if (key.toLowerCase().indexOf('requested')>-1) {

            if (whenStateNameContents.toLowerCase().indexOf('z-index') === -1) {
              var postAnimationStr = whenStateNameContents.split('a:[')[1];
              var animationStr = postAnimationStr.split(']')
              var newContents = "a:[" +  animationStr[0] + ',' + "z-index:-10:100:50:linear:0:1:f]" + animationStr.slice(1).join("]")
              attr.$set(key, newContents)
              console.log(attr)
            }
          }
          if (key.toLowerCase().indexOf('close')>-1) {
            if (whenStateNameContents.toLowerCase().indexOf('z-index') === -1) {
              var postAnimationStr = whenStateNameContents.split('a:[')[1];
              var animationStr = postAnimationStr.split(']')
              var newContents = "a:[" +  animationStr[0] + ',' + "z-index:100:-10:1000:linear:0:1:f]" + animationStr.slice(1).join("]")
              attr.$set(key, newContents)
            }
          }
          // console.log(whenStateNameContents)
        }
        // "when-modal-" + attr.name  + "-requested=a:[z-index:-10:100:50:linear:0:1:f]|p:[opacity:0]"
        // "when-modal-" + attr.name  + "-closed=a:[z-index:-10:100:50:linear:0:1:f]"
      }

    }

    // for (_attr in attr) {
    //   console.log(attr, _attr)
    // }
    // else if (_window.mobile) {
    //     p_elem.css('transform', 'translateY(' + _window.height + 'px)');
    // } else if (){
    //     p_elem.css('transform', 'translateY(-' + _window.height + 'px');
    // }
  }


  function renderAllStyleAttributes(elem, attr) {
    if (attr.fontWeight) {
      elem.css('font-weight', attr.fontWeight);
    }
    if (attr.border) {
      elem.css('border', attr.border);
    }
    if (attr.letterSpacing) {
      elem.css('letter-spacing', attr.letterSpacing);
    }
    if (attr.textDecoration || attr.tD) {
      elem.css('text-decoration', attr.textDecoration || attr.tD);
    }

    if ('pointer' in attr) {
      elem.css('cursor', 'pointer')
    }



    if (attr.type && attr.type === 'row') {
        elem.addClass('flex-wrap-center', 'flex-wrap')
    }

    // if (attr.width && elem[0].nodeName.toLowerCase() !== 'svg') {
    //   if (attr.width.indexOf('%') === -1 && attr.width.indexOf('px') === -1) {
    //       elem.css('width', attr.width + '%')
    //   } else {
    //       elem.css('width', attr.width)
    //   }
    // }

    // if (attr.height && elem[0].nodeName.toLowerCase() !== 'svg') {
    //     if (attr.height.indexOf('%') === -1 && attr.height.indexOf('px') === -1) {
    //         elem.css('height', attr.height + '%')
    //     } else {
    //         elem.css('height', attr.height)
    //     }
    // }

    if ((attr.layer && attr.layer.length) || (attr.depth && attr.depth.length))  {
      var intLayer = 0;
      if (attr.layer) {
          intLayer = parseInt(attr.layer);
      } else if (attr.depth) {
        intLayer = parseInt(attr.depth);
      }


      elem.css('zIndex', intLayer);
    }

    attr.align && renderAlign(elem, attr.align || 'center center');
    attr.padding && renderPadding(elem, attr.padding);
    attr.margin && renderMargin(elem, attr.margin);
    attr.fontSize && renderFontSize(elem, attr.fontSize);
    attr.bgUrl && renderBgImage(elem, attr, attr.bgUrl)
    'fixed' in attr && elem.css('position', 'fixed')
    'absolute' in attr && elem.css('position', 'absolute')
    attr.alignSelf && renderAlignSelf(elem, attr.alignSelf)
    attr.alignSelf2 && renderAlignSelf(elem, attr.alignSelf)
  }

  function renderBgImage(elem, attr, url) {
    if (url && url.length) {
      elem.css('background-image', 'url("' +  url + '")');
      !attr.bgPos && elem.css('background-position', 'center');
      !attr.bgSize && elem.css('background-size', 'cover');
    }
    if (attr.bgPos && attr.bgPos.length) {
      elem.css('background-position', attr.bgPos)
    }
  }

  function renderAlignSelf(elem, align_args) {
    var selfAlignArgSplit = align_args.split(' ');
    console.log(selfAlignArgSplit)
    align_args = selfAlignArgSplit[0];
    if (selfAlignArgSplit.length > 1 && ['top', 'bottom', 'right', 'left'].indexOf(selfAlignArgSplit[1])) {
      elem.css(selfAlignArgSplit[1], 0)
    }
    if (align_args in flexAlignMapping) {
      elem.css('align-self', flexAlignMapping[align_args])
    } else {
      elem.css('align-self', align_args)
    }
  }

  function renderFontSize(elem, font_args) {
    elem.css('font-size', font_args);
  }

  function renderMargin(elem, margin_args) {
    elem.css('margin', margin_args);
  }

  function renderPadding(elem, padding_args) {
    elem.css('padding', padding_args);
  }

  function renderAlign(elem, align_args) {

    var alignArgSplit = align_args.split(' ');
    var vertArg = alignArgSplit[0];
    var horizArg = alignArgSplit[1];
    if (horizArg in flexAlignMapping) horizArg = flexAlignMapping[horizArg];
    if (vertArg in flexAlignMapping) vertArg = flexAlignMapping[vertArg];
    console.log(horizArg, vertArg)
    elem.css('display', 'flex');
    elem.css('align-items', horizArg);
    elem.css('justify-content',vertArg);
  }

  function getMediaElemOfType(type, data_url, attributes, scope, attr, element) {
    var mDict = {};
    var import_type = attr.import;
    if (type === 'img') {
      if (import_type) {
        var elem  = element[0].querySelector('[media-child]')
        console.log(elem)
      } else {
        mDict.elem = document.createElement('img');
        for (var i = 0; i < attributes.length; i++) {
          mDict.elem.setAttribute(attributes[i].name, attributes[i].value);
        }
        mDict.elem.src =  data_url;
        mDict.elem = angular.element(mDict.elem);
        mediaDict.elem.attr('u', '');
        $compile(mediaDict.elem)(scope);
        element.replaceWith(mediaDict.elem);
      }




    }
    return mDict;
  }

  function getSpacingFunctions() {
    return {

    }
  }

  function parseSrcUrl(obj_str) {
    var elem = obj_str.split('.');
  }

  function applyDelayToWord(elem, delay) {
    var elemAttr = elem[0].attributes;
    for (var i = 0; i <  elemAttr.length; i++) {
      var iValue = elemAttr[i].value;
      if (iValue && iValue.indexOf('p:[') > -1) {
        elemAttr[i].value = elemAttr[i].value + ':delay-' + delay;
      }
    }
  }

  function getAndParseDimensions(dim) {
    if (!dim) return;
    var resultDim = {rows:0, cols: 0};

    var resultDimSplit = dim.split('x')
    resultDim.rows = parseFloat(resultDimSplit[0]);
    resultDim.cols = parseFloat(resultDimSplit[1]);
    var items = [];

    if (resultDim && resultDim.rows && resultDim.cols) {
      var count = 1;
        for (var row = 0; row < resultDim.rows; row ++) {
            for (var col = 0; col < resultDim.cols; col ++) {
                items.push({
                  id: count,
                  row: row + 1,
                  col: col + 1,
                  width: 100/resultDim.cols,
                  height: 100/resultDim.rows
                });
                count++;
            }
        }
        items.forEach(function(i, index) {console.log(i)})
    }

    // console.log(dim.rows, dim.columns);
    return items;
  }


  function getCompTemplateType(element_type, type_elem) {
    return function(element, attr) {
      var type = (attr.type && (attr.type + '.')) || '';
      var defaultCompRoutes = {
        'grid': "<div class='flex-wrap-center full-xy absolute'></div>",
        'letter': "shared/templates/components/base/text/letter." + type + "tpl",
        "input": "shared/templates/components/base/inputs/text." + type + "tpl"
      }
      if (element_type && type_elem) {
        return defaultCompRoutes[element_type + '.' + type_elem]
      }
      else if (element_type && !type_elem) {

        return defaultCompRoutes[element_type]
      }
      return defaultCompRoutes[element_type]
    }
  }

  // function getOptionSpec(name) {

  // }

  function getBaseSpec(name) {
    return {
      grid: {options: ['dim', 'style'], children: ['list', 'item']},
      list: {options: ['list', 'style'], parent:'grid'},
      item: {options:['ignore', 'offset'], parent: ['grid'], types: getAllItemTypes()}
    }
  }

  function getOptions(name) {

  }

  function getAllItemTypes() {
    // return getItemTypes()
  }
}

function getItemTypes() {

}

function getCustomItems() {
  return [
    'grid'
  ]
}

function getItems() {
  return [
    'grid'
  ]
}