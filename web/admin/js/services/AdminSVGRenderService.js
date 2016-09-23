angular
.module('uguru.admin', [])
.factory("AdminSVGRenderService", [
  '$state',
  '$timeout',
  '$localstorage',
  AdminSVGRenderService
  ]);

function AdminSVGRenderService($state, $timeout, $localstorage) {
    //render the text
    var removeAttrDict = {
        'todo': ['remove xml string text', 'paths '],
        'todoLater': ['initially set all IDs but later trim them once done animating'],
        'keep': {
            'svg': ['width', 'height', 'viewBox', 'style', 'xmlns', 'xmlns:xlink', 'version']
        },
        'remove': {
            'elems': ['title', 'desc']
        },
        'cache': {
            'elems': ['filter']
        }
    }

    var cache = {
        filter:{
            outerHTML: [],
            elem: []
        }
    }

    return {
        parseRawSVG: parseSVG

    }

    function parseSVG(elem) {
        var attr = elem[0].attributes;
        var ns = elem[0].getAttribute('xmlns');
        var uniqueGIDs = ['white', 'glow'];
        var allFilters = elem[0].querySelectorAll('filter');
        var allUses = elem[0].querySelectorAll('use');
        var allGs = elem[0].querySelectorAll('g');

        //parse svg
        var svgToRemove = [];
        var keepSVGAttrArr = removeAttrDict.keep.svg;
        for (var i = 0; i < attr.length; i++) {
            iAttrName = attr[i].name;
            if (keepSVGAttrArr.indexOf(iAttrName) === -1) {
                svgToRemove.push(iAttrName);
            }
        }

        svgToRemove.forEach(function(attr_name, _) {
            elem[0].removeAttributeNS(null, attr_name);
        });


        var svgChildren = elem[0].childNodes;
        for (var i = 0; i < svgChildren.length; i++) {
            var childName = svgChildren[i].nodeName.toLowerCase();
            if (removeAttrDict.remove.elems.indexOf(childName) > -1) {
                elem[0].removeChild(svgChildren[i]);
            }
        }

        var defParent = allFilters[0].parentNode;
        allFilters.forEach(function(filter, i) {
            var filterId = filter.getAttribute('id');
            filter.removeAttribute('id');
            if (cache.filter.outerHTML.indexOf(filter.outerHTML) === -1) {
                cache.filter.outerHTML.push(filter.outerHTML);
                filter.setAttribute('id', 'filter-' + (cache.filter.elem.length + 1));
                cache.filter.elem.push(filter);
            } else {
                defParent.removeChild(filter);
            }
        })

        allGs.forEach(function(g, i) {
            if (g.id.indexOf(uniqueGIDs[0]) > -1) {
                var useChild = g.querySelector('use[filter]');
                if (useChild) {
                    useChild.setAttribute('filter', 'url(#filter-1)');
                }
            } else {
                var useChild = g.querySelector('use[filter]');
                if (useChild) {
                    useChild.setAttribute('filter', 'url(#filter-2)');
                }
            }
        })

        //go through all the groups, and based on the # of unique filters I have, find the referencable "<use> tags" witin the <g> children, and for the




        return elem;



        // console.log(elem);
        // console.log(elem.contents());
        // console.log(elem.children())
    }
}