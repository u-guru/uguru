angular
    .module('uguru.shared.services')
    .factory('CompService', [
    '$timeout',
    '$compile',
    CompService
    ]);

function CompService($timeout, $compile) {
  var genOptionSpec = ['type', 'when-*', 'as*', '']
  var flexAlignMapping = {'bottom': 'flex-end', 'left': 'flex-start', 'right': 'flex-end', 'top': 'flex-start'}
  var itemSpec = [];
  return {
    getBaseSpec: getBaseSpec,
    getOptions: getOptions,
    getCompTemplateType: getCompTemplateType,
    getAndParseDimensions: getAndParseDimensions,
    applyDelayToWord: applyDelayToWord,
    parseSrcUrl: parseSrcUrl,
    getMediaElemOfType: getMediaElemOfType,
    renderAlign: renderAlign,
    renderAllStyleAttributes: renderAllStyleAttributes
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

    if (attr.width) {
        if (attr.width.indexOf('%') === -1 && attr.width.indexOf('px') === -1) {
            elem.css('width', attr.width + '%')
        } else {
            elem.css('width', attr.width)
        }
    }
    if (attr.height) {
        if (attr.height.indexOf('%') === -1 && attr.height.indexOf('px') === -1) {
            elem.css('height', attr.height + '%')
        } else {
            elem.css('height', attr.height)
        }
    }
    if (attr.type && attr.type === 'row') {
        elem.addClass('flex-wrap-center', 'flex-wrap')
    }

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