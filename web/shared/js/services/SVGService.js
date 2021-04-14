angular
.module('uguru.shared.services')
.factory("SVGService", [
  'AnimationService',
  SVGService
    ]);

function SVGService(AnimationService) {
  var supportedShapes = ['circle', 'rect', 'polygon', 'path', 'line']

  return {
    getTotalPathLength: getTotalPathLength,
    computeDrawDuration:computeDrawDuration,
    supportedShapes: supportedShapes,
    drawOneShape: drawOneShape,
    convertPolyToPath: convertPolyToPath,
    getShapeWidthHeight: getShapeWidthHeight,
    generateCSSObjFromPath: generateCSSObjFromPath,
    svgShapeToPath: svgShapeToPath,
    initSVGElem: initSVGElem
  }

  //step two
  //addEventToCalendar

  function initSVGElem(x, x2, y, y2) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    svg.setAttributeNS('http://www.w3.org/2000/svg', 'viewBox', [x, y, x2, y2].join(" "));
    return svg
  }

  function generateCSSObjFromPath(anim_name, path, shape_offset, rotate) {
    var numKeyframes = 60;
    var startPoint = path.getPointAtLength(0);
    var totalPathLength = path.getTotalLength();
    var shapeOffset = shape_offset;
    // console.log(startPoint, path, shapeOffset);
    if (!startPoint || !path || (!shapeOffset && shapeOffset !== 0)) return;

    var cssAnimObj = AnimationService.initCSSAnimation(anim_name);
    // cssAnimObj.appendRule('0% {transform: translate(' + (startPoint.x - shapeOffset) + 'px, ' + (startPoint.y-shapeOffset) +'px) rotate(' +180 + 'deg);}', i);
    // console.log('starting animation obj...');
    for (var i = 0; i < numKeyframes; i++) {
       var indexPoint = path.getPointAtLength(i/numKeyframes *totalPathLength);
       var indexPreviousPoint = path.getPointAtLength((i+1)/numKeyframes * totalPathLength);


       var translateX = indexPoint.x - shapeOffset;
       var translateY = indexPoint.y - shapeOffset;
       var translateAng = Math.atan2(indexPoint.y - indexPreviousPoint.y, indexPoint.x - indexPreviousPoint.x) * (180/Math.PI);
       var cssRuleString = (100/60.0 * i) + '% {transform: translate(' + translateX + 'px, ' + translateY +'px)';
       if (rotate) {
        cssRuleString = cssRuleString + ' rotate(' + (translateAng + 180) + 'deg);}';
       } else {
        cssRuleString = cssRuleString + ';}';
       }
        cssAnimObj.appendRule(cssRuleString, i);
    }
    cssAnimObj.appendRule('100% {transform: translate(' + (startPoint.x - shapeOffset) + 'px, ' + (startPoint.y-shapeOffset) +'px);}', i);
    return cssAnimObj;
  }

  function getShapeWidthHeight(shape_elem) {
    if (shape_elem.nodeName === 'circle') {
      return {width: shape_elem.r.animVal.value, height: shape_elem.r.animVal.value};
    } else {
      return {width: shape_elem.getBoundingClientRect().width/2, height: shape_elem.getBoundingClientRect().height/2}
    }
  }

  function getTotalPathLength(elem) {
    var elemType = elem && elem.nodeName && elem.nodeName.toLowerCase();
    switch (elemType) {
      case "circle":
        return getCircleLength(elem);
        break
      case "path":
        return getPathLength(elem);
        break
      case "rect":
        return getRectLength(elem);
        break
      case "polygon":
        return getPolygonLength(elem);
        break
      case "line":
        return getLineLength(elem);
        break
    }
  }

  function drawOneShape(elem, current_frame, total_frames, path_length) {
      drawShape();

      var requestFrameHandle = 0;
      function drawShape() {
        var progress = current_frame/total_frames;
          if (progress > 1) {
             window.cancelAnimationFrame(requestFrameHandle);
          } else {
            current_frame++;
            elem.style.strokeDashoffset = Math.floor(path_length * (1 - progress));
            requestFrameHandle = window.requestAnimationFrame(drawShape);
          }
        }
    }

  function computeDrawDuration(time_str) {

    if (!time_str || !time_str.length) return;

    if (time_str.indexOf('ms') > -1) {
      time_str = time_str.replace('ms', '');
      time_str = parseInt(time_str)
      return (time_str / 1000.0) * 60
    }

    if (time_str.indexOf('s') > -1) {
      time_str = time_str.replace('s', '');
      time_str = parseInt(time_str)
      return (time_str * 60);
    }
  }

  function getCircleLength(elem){
      var r = elem.getAttribute('r');
      var circleLength = 2 * Math.PI * r;
      return circleLength;
  }

  function getLineLength(elem){
      var x1 = elem.getAttribute('x1');
      var x2 = elem.getAttribute('x2');
      var y1 = elem.getAttribute('y1');
      var y2 = elem.getAttribute('y2');
      var lineLength = Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1),2));
      return lineLength;
  }

  function convertPolyToPath(poly){
    var svgNS = poly.ownerSVGElement.namespaceURI;
    var path = document.createElementNS(svgNS,'path');
    var points = poly.getAttribute('points').split(/\s+|,/);
    var x0=points.shift(), y0=points.shift();
    var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
    if (poly.tagName=='polygon') pathdata+='z';
    path.setAttribute('d',pathdata);
    // poly.parentNode.replaceChild(path,poly);
    return path;
  }

  function convertPointStringToPathString(point_str) {
    var path = "";
    var p = point_str;
    for( var i = 0, len = p.length; i < len; i++ ){
        path += (i && "L" || "M") + p[i]
    }
    return path.replace(',', ' ') + 'z';
  }

  function getPolygonLength(elem){
      var points = elem.getAttribute('points');
          points = points.split(" ");
          var x1 = null, x2, y1 = null, y2 , lineLength = 0, x3, y3;
          for(var i = 0; i < points.length; i++){
              var coords = points[i].split(",");
              if(x1 == null && y1 == null){

                  if(/(\r\n|\n|\r)/gm.test(coords[0])){
                      coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm,"");
                      coords[0] = coords[0].replace(/\s+/g,"");
                  }

                  if(/(\r\n|\n|\r)/gm.test(coords[1])){
                      coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm,"");
                      coords[0] = coords[1].replace(/\s+/g,"");
                  }

                  x1 = coords[0];
                  y1 = coords[1];
                  x3 = coords[0];
                  y3 = coords[1];

              }else{

                  if(coords[0] != "" && coords[1] != ""){

                      if(/(\r\n|\n|\r)/gm.test(coords[0])){
                          coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm,"");
                          coords[0] = coords[0].replace(/\s+/g,"");
                      }

                      if(/(\r\n|\n|\r)/gm.test(coords[1])){
                          coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm,"");
                          coords[0] = coords[1].replace(/\s+/g,"");
                      }

                      x2 = coords[0];
                      y2 = coords[1];

                      lineLength += Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1),2));

                      x1 = x2;
                      y1 = y2;
                      if(i == points.length-2){
                          lineLength += Math.sqrt(Math.pow((x3-x1), 2)+Math.pow((y3-y1),2));
                      }

                  }
              }

          }
          return lineLength;
  }

  function getRectLength(el){
      var w = el.getAttribute('width');
      var h = el.getAttribute('height');
      return (w*2)+(h*2);
  }

  function getPathLength(elem){
      var pathLength = elem.getTotalLength();
      return pathLength;
  }
}

function findParentSVG(elem) {
    return (elem.nodeName === 'svg' && elem) || findParentSVG(elem.parentNode);
}

function svgShapeToPath(elem, parent) {
  if (!parent) {
    parent = findParentSVG(elem);
    if (!parent) return;
  }
  return pathify(elem, parent);
}

// Takes any arbitrary element sub-tree(s) and converts it/them into an array of
// <path> elements suitable for appending on `root` (the <svg> root, by default)
// Original implementation by Phrogz -- http://phrogz.net/SVG/transformations.js
function pathify(elem, root) {
  var node   = 'nodeType' in elem ? elem : elem[0]
    , doc    = node.ownerDocument
    , svg    = node.ownerSVGElement
    , svg_ns = svg.getAttribute('xmlns')
    , normal = (root||svg).getScreenCTM().inverse() // root scaling compensation
    , matrix = normal.multiply(node.getCTM()) // transform, relative to svg root

    , output = []
    , makers = { path: function() {
                         path.setAttribute('d', elem.getAttribute('d'));
                       }
               , line: line
               , rect: rect
               , circle: circle
               , ellipse: ellipse
               , polygon: polygon
               , polyline: polygon
               }
    , i, len, path, make, transform
    ;

  if (elem.tagName == 'g' || 'function' === typeof elem.push) {
    for (i = 0; node = (elem.childNodes || elem)[i]; i++) {
      if (node.nodeType == 1) {
        output = output.concat(pathify(node, root));
      }
    }
  }
  else {
    path = document.createElementNS(elem.parentNode.namespaceURI || 'http://www.w3.org/2000/svg' ,"path");
    make = makers[elem.tagName];
    if (make) make(); else path = null;
    if (path) {
      // console.log(path)
      // transform = svg.createSVGTransform();
      // transform.setMatrix(matrix);
      // if (path.transform) {
      //   path.transform.baseVal.initialize(transform);
      // }

      // temp: set its reference environment so applyTransforms knows what to do
      // elem.parentNode.appendChild(path);
      // path.setAttribute('d', applyTransforms(path));
      // path.removeAttribute('transform');
      // elem.parentNode.removeChild(path);

      copyPresentation(elem, path);
      output.push(path);
    }
  }
  return output;

  function line() {
    var x1 = +elem.getAttribute('x1')
      , y1 = +elem.getAttribute('y1')
      , x2 = +elem.getAttribute('x2')
      , y2 = +elem.getAttribute('y2')
      ;
    path.setAttribute('d', 'M'+ x1 +','+ y1 +'L'+ x2 +','+ y2);
  }

  function rect() {
    var x  = +elem.getAttribute('x')
      , y  = +elem.getAttribute('y')
      , w  = +elem.getAttribute('width')
      , h  = +elem.getAttribute('height')
      , rx = Math.min(w/2, +elem.getAttribute('rx') || 0)
      , ry = Math.min(h/2, +elem.getAttribute('ry') || 0)
      , r  = rx || ry
      , arc_to;
    if (rx && !elem.hasAttribute('ry')) ry = rx;
    else if (ry && !elem.hasAttribute('rx')) rx = ry;
    arc_to = 'A '+ rx +','+ ry +',0,0,'+ (rx * ry < 0 ? 0 : 1) +',';
    var pathString = 'M '+ (x+rx) +' '+ y + ' '
                     + 'H '+ (x+w-rx) + ' '
                          + (r ? arc_to + (x+w) +','+ (y+ry) + ' ': ' ')
                     + 'V '+ (y+h-ry) + ' '
                          + (r ? arc_to + (x+w-rx) +','+ (y+h) + ' ' : ' ')
                     + 'H '+ (x+rx) + ' '
                          + (r ? arc_to + x +','+ (y+h-ry) + ' ' : ' ')
                     + 'V '+ (y+ry)+ ' '
                          + (r ? arc_to + (x+rx) +','+ y : '') + ' Z';
    pathString = pathString.split(',').join(' ');
    path.setAttribute( 'd'
                     , pathString
                     );
  }

  function circle() {
    var cx = +elem.getAttribute('cx')
      , cy = +elem.getAttribute('cy')
      , r  = +elem.getAttribute('r')
      , y0 = cy - r, y1 = cy + r
      ;
      path.setAttribute( 'd'
                       , 'M' + cx +','+ y0
                       + 'A' + [r,r,0,0,0,cx,y1,r,r,0,0,0,cx,y0].join(',')
                       );
  }

  function ellipse() {
    var cx = +elem.getAttribute('cx')
      , cy = +elem.getAttribute('cy')
      , rx = +elem.getAttribute('rx')
      , ry = +elem.getAttribute('ry')
      , y0 = cy - ry, y1 = cy + ry
      ;
    path.setAttribute( 'd'
                     , 'M' + cx +','+ y0
                     + 'A' + [rx,ry,0,0,0,cx,y1,rx,ry,0,0,0,cx,y0].join(',')
                     );
  }

  function polygon() {
    for (var i = 0, l = [], pts = elem.points, p; i < path.numberOfItems; i++) {
      p = pts.getItem(i);
      l[i] = p.x+','+p.y;
    }
    path.setAttribute( 'd'
                     , 'M' + l.shift()
                     + 'L' + l.join(' ')
                     + (elem.tagName == 'polygon') ? 'Z' : ''
                     );
  }
}

// Copies all presentational-only attributes of element `src` to `dst`.
// NOTE: when using stylesheets with node or id selectors, those styles are lost
function copyPresentation(src, dst) {
  [ 'alignment-baseline'
  , 'baseline-shift'
  , 'clip'
  , 'clip-path'
  , 'clip-rule'
  , 'color'
  , 'color-interpolation'
  , 'color-interpolation-filters'
  , 'color-profile'
  , 'color-rendering'
  , 'cursor'
  , 'direction'
  , 'display'
  , 'dominant-baseline'
  , 'enable-background'
  , 'fill'
  , 'fill-opacity'
  , 'fill-rule'
  , 'filter'
  , 'flood-color'
  , 'flood-opacity'
  , 'font-family'
  , 'font-size'
  , 'font-size-adjust'
  , 'font-stretch'
  , 'font-style'
  , 'font-variant'
  , 'font-weight'
  , 'glyph-orientation-horizontal'
  , 'glyph-orientation-vertical'
  , 'image-rendering'
  , 'kerning'
  , 'letter-spacing'
  , 'lighting-color'
  , 'marker-end'
  , 'marker-mid'
  , 'marker-start'
  , 'mask'
  , 'opacity'
  , 'overflow'
  , 'pointer-events'
  , 'shape-rendering'
  , 'stop-color'
  , 'stop-opacity'
  , 'stroke'
  , 'stroke-dasharray'
  , 'stroke-dashoffset'
  , 'stroke-linecap'
  , 'stroke-linejoin'
  , 'stroke-miterlimit'
  , 'stroke-opacity'
  , 'stroke-width'
  , 'text-anchor'
  , 'text-decoration'
  , 'text-rendering'
  , 'unicode-bidi'
  , 'visibility'
  , 'word-spacing'
  , 'writing-mode'
  , 'class'
  , 'style'
  ].forEach(function(attr) {
    if (src.hasAttribute(attr)) dst.setAttribute(attr, src.getAttribute(attr));
  });
}