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
  var cssDirectiveShortcuts = getCSSDirectiveShortcuts();
  var cssDefaultPropValues = getCSSDefaultPropValues();
  var platformSpecificProperties = getPlatformSpecificProperties();
  var browserPlatform;
  var specialProperties = {
    'display': 'flex'
  }
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

  function getCrossPlatformProperty(property, platform) {

    return property;
  }

  function getCSSDefaultPropValues() {
    return {
      "end": "flex-end",
      "start": "flex-start",
      "left": "flex-start",
      "right": "flex-end",
      "center": "center",
      "stretch": "stretch",
      "space-between": "space-between",
      "space-around": "space-around",
      "sA": "space-around",
      "sB": "space-between",
      "yEnd": "flex-end",
      "yStretch": "stretch",
      "yStart": "flex-start",
      "yCenter": "center",
      "xEnd": "flex-end",
      "ySpaceBetween": "space-between",
      "ySpaceAround": "space-around",
      "spaceBetween": "space-between",
      "spaceAround": "space-around",
      "ySa": "space-around",
      "ySB": "space-between",
      "row": "row",
      "rowReverse": "row-reverse",
      "column": "column",
      "columnReverse": "column-reverse",
      "rR": "row-reverse",
      "cR": "column-reverse",
      "wrap": "wrap",
      "nowrap": "nowrap",
      "wrapReverse": "wrap-reverse"
    }
  }

  function getPlatformSpecificProperties() {
    return {
      "flex-direction": {},
      "flex": {},
      "order": {},
      "flex-grow": {},
      "flex-shrink": {},
      "flex-wrap": {},
      "justify-content": {},
      "align-content": {},
      "align-items": {},
      "flex-basis": {},
      "flex-flow": {},
      "align-self": {}
    }
  }

  function getCSSDirectiveShortcuts() {
    return {
        'm': 'margin',
        'mX': 'margin-left margin-right',//
        'mY': 'margin-top margin-bottom',
        'mTop': 'margin-top',
        'mBottom': 'margin-bottom',
        'mLeft': 'margin-left',
        'mRight': 'margin-right',
        "marginX": "margin-left margin-right",
        "marginY": "margin-top margin-bottom",
        "p": "padding",
        "padding": "padding",
        "margin": "margin",
        "pX": "padding-left padding-right",
        "pY": "padding-bottom padding-top",
        "pTop": "padding-top",
        "pBottom": "padding-bottom",
        "pLeft": "padding-left",
        "pRight": "padding-right",
        "paddingX": "padding-left padding-right",
        "paddingY": "padding-top padding-bottom",
        "basis": "flex-basis",
        "shrink": "flex-shrink",
        "grow": "flex-grow",
        "order": "order",
        "wrapReverse": "flex-wrap",
        "wrap": "flex-wrap",
        "nowrap": "flex-wrap",
        "end": "align-self",
        "start": "align-self",
        "left": "align-self",
        "right": "align-self",
        "center": "align-self",
        "stretch": "align-self",
        "spaceBetween": "align-self",
        "spaceAround": "align-self",
        "sA": "justify-content",
        "sB": "justify-content",
        "xEnd": "justify-content",
        "yEnd": "align-content align-items",
        "yStretch": "align-content align-items",
        "yStart": "align-content align-items",
        "yCenter": "align-content align-items",
        "xEnd": "justify-content",
        "ySpaceBetween": "align-content",
        "ySpaceAround": "align-content",
        "ySa": "align-content",
        "ySb": "justify-content",
        "row": "flex-direction",
        "rowReverse": "flex-direction",
        "rR": "flex-direction",
        "column": "flex-direction",
        "cR": "flex-direction",
        "x": "display justify-content",
        "y": "display align-content align-items"

    }
  }

  function initCSSObj() {
    return {
      render: {
        width: renderWidthFunc,
        height: renderHeightFunc,
        general: renderGeneralFunc
      },
      apply: applyCrossPlatformCSSFunc(_browser)
    }
  }

  function applyCrossPlatformCSSFunc(browser) {
    browserPlatform = browser.engine.replace('blink', 'webkit');

    return function(element, prop, value) {

      if (prop in cssPrefixedProperties) {
        console.log(browserPlatform)
        prop = formatPrefixedCSSByEngine(prop, browserPlatform);
      }

      if (prop in cssPrefixedPropertyValues) {
        var valueFilter = cssPrefixedPropertyValues[prop];
        if (value.indexOf(valueFilter) > -1) {
          value = formatPrefixedCSSByEngine(value, browserPlatform)
        }
      }
      console.log('applying', element, prop, value)
      element.css(prop, value)

    }
  }

  // $timeout(function() {
  //   css.apply()
  // })

  function formatPrefixedCSSByEngine(value, browserPlatform) {
    var supportedPlatforms = ["blink", "moz", "ms", "webkit"];
    if (supportedPlatforms.indexOf(browserPlatform) > -1 ) {
      return "-" + browserPlatform + "-" + value;
    }
    return value;
  }

  function getPlatformSpecificPropName(prop_name, browser) {
    // console.log('detected platform specific', prop_name)
    return prop_name
  }



  function renderGeneralFunc(elem, value, options) {
    var svgOnlyProps = ['x', 'y', 'width', 'height'];
    if (options.propName && options.propName in cssDirectiveShortcuts) {
      var propNames = cssDirectiveShortcuts[options.propName];
      if (svgOnlyProps.indexOf(options.propName.toLowerCase()) > -1 && isSVGElement(elem[0].nodeName)) {
        return;
      }
      propNames.split(" ").forEach(function(property) {

        var currentValue = value;
        if (value.length === 0 && options.propName in cssDefaultPropValues) {
          currentValue = cssDefaultPropValues[options.propName];
        }
        if (property in specialProperties) {
          currentValue = specialProperties[property]
        }

        if (property in platformSpecificProperties) {
          property = getPlatformSpecificPropName(property);
        }
        // console.log('setting', property, currentValue)
        css.apply(elem, property, value);
      })
    }
  }

  function renderHeightFunc(elem, value, scope) {

    if (value && !isSVGElement(elem[0].nodeName.toLowerCase())) {
        if (value.indexOf('%') === -1 && value.indexOf('px') === -1) {
            elem.css('height', value + '%')
        } else {
            elem.css('height', value)
        }
    }
  }

  function renderWidthFunc(elem, value, scope) {
    if (value && !isSVGElement(elem[0].nodeName.toLowerCase())) {
      if (value.indexOf('%') === -1 && value.indexOf('px') === -1) {
          elem.css('width', value + '%')
      } else {
          elem.css('width', value)
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