angular.module('uguru.shared.services')
.factory("AdminElementService", [
    '$timeout',
    '$state',
    AdminElementService
        ]);

function AdminElementService($timeout, $state) {
      return {
        scaleSvgCSS:scaleSvgCSS,
        isSVGElement: isSVGElement,
        getSVGParent: getSVGParent,
        isSVG: isSVG,
        formatElement: formatElement,
        createBlind: createBlind
      }

      function formatElement(elem, _type, _window) {
        if (_type === 'player') {
          //svg
          if (elem.viewBox) {
            var ratio = elem.viewBox.baseVal.width/elem.viewBox.baseVal.height;
            elem.style.height = _window.height*0.5 * (1/ratio);
            elem.style.width = _window.width*0.5 * (1/ratio);

            return elem


          } else if (isSVG(elem)) {
            svgElem = getSVGParent(elem)
            var ratio = svgElem.viewBox.baseVal.width/svgElem.viewBox.baseVal.height;
            var svgClone = svgElem.cloneNode(true);
            svgClone.innerHTML = '';
            svgClone.appendChild(elem.cloneNode(true));
            svgClone.style.height = _window.height/0.5;
            svgClone.style.width = _window.width/0.5;
            return svgClone
          }
        }
        return elem
      }

      function createBlind(elem) {
        console.log(elem)
        var elemParent = getSVGParent(elem)

        // elem.parentNode.appendChild(blindElem);
      }

      function scaleSvgCSS(svg_elem, _window, absolute) {
        console.log('element', svg_elem);
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

      function isSVG(elem) {
        name = elem.nodeName.toLowerCase();
        return ['path', 'g', 'rect', 'svg', 'polygon', 'line', 'circle'].indexOf(name) > -1;
      }

      function isSVGElement(name) {
        name = name.toLowerCase();
        return ['path', 'g', 'rect', 'svg', 'polygon', 'line', 'circle'].indexOf(name) > -1;
      }
      function getSVGParent(elem) {

        if (isSVGElement(elem.nodeName.toLowerCase()) && elem.nodeName === 'svg') return elem;

        return getSVGParent(elem.parentNode)
      }

}


