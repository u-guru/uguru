angular.module('uguru.shared.services')
.factory("ElementService", [
    '$timeout',
    '$state',
    ElementService
        ]);

function ElementService($timeout, $state) {
      return {
        scaleSvgCSS:scaleSvgCSS,
        isSVGElement: isSVGElement,
        getSVGParent: getSVGParent
      }

      function scaleSvgCSS(svg_elem, _window, absolute) {
        var viewBStr = svg_elem.getAttribute('viewBox');
        var viewBStrSplit = viewBStr.split(' ');

        viewBStrSplit.forEach(function(num, i) {viewBStrSplit[i] = parseFloat(viewBStrSplit[i])});

        var viewDict = {minX: viewBStrSplit[0], minY: viewBStrSplit[1], width: viewBStrSplit[2], height: viewBStrSplit[3]};
        var ratio = viewDict.width/viewDict.height;

        if (_window) {
          svg_elem.style.width = _window.width/(ratio/5) + 'px';
          svg_elem.style.height = _window.height/(ratio/5) + 'px';
        }
        if (absolute) {
          svg_elem.classList.add('absolute');
          svg_elem.style.left = _window.width * 0.4  + 'px';
        }

        return svg_elem;
      }

      function isSVGElement(name) {
        return ['path', 'g', 'rect', 'svg', 'polygon', 'line', 'circle'].indexOf(name) > -1;
      }
      function getSVGParent(elem) {

        if (isSVGElement(elem.nodeName.toLowerCase()) && elem.nodeName === 'svg') return elem;

        return getSVGParent(elem.parentNode)
      }

}


