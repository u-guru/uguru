angular
.module('sharedServices')
.factory("SVGService", [
  SVGService
    ]);

function SVGService() {
  var supportedShapes = ['circle', 'rect', 'polygon', 'path', 'line']

  return {
    getTotalPathLength: getTotalPathLength,
    computeDrawDuration:computeDrawDuration,
    supportedShapes: supportedShapes,
    drawOneShape: drawOneShape
  }

  //step two
  //addEventToCalendar

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






