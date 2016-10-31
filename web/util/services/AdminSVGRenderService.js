angular
.module('uguru.admin', [])
.factory("AdminSVGRenderService", [
  '$state',
  '$timeout',
  '$localstorage',
  'UtilitiesService',
  AdminSVGRenderService
  ]);

function AdminSVGRenderService($state, $timeout, $localstorage, UtilitiesService) {
    //-- defs related
    // 1. [x] filter at the top
    // 2. [x] sort all the paths based their id name
    //-- end defs related
    // ---
    //-- Def ~ <G>
    //1. [x] Remove the id for page, keep fill/fill-rule
    //2. [x] Remove extraneous groups entirely
    //2.5 [x] // 1. Clarify global attributes + attribute values for the list [stroke-linecap] to applied group after the defs, strip any child that has itbefore tranversing global <g>, apply all necessary attributes clarified
    //3. [x] Go in order sequentially and create a group of the first child's attributes, for all subsequent siblings w/ same attributes, strip
    //4. Replace all <uses> that reference, <path> in defs with
    //5. //3. [ ] Filter & replace all <use> Within the first group, sort all def references aside from filter for all types of elements, look if they exist in the defs, if so, replace.
    //6. Pricing checkout prefixes
    //-- Wrapup
    // -- Export the new svg file
    // 1. Figure out simple exportable means
    // 2. clean up code so they can use it + properly debug
    // 3. clarify your prefix
    // 4. Optimize defs + path repititions based on their D;
    // 5. Element g-global = "stroke-linecap:round"
    // 6. removing the comments
    //sort paths by the id number
    //eliminate un-necessary
    //Any ids with the page in it
    //
    var removeAttrDict = {
        'todo': ['remove xml string text', 'paths '],
        'todoLater': ['initially set all IDs but later trim them once done animating'],
        'keep': {
            'svg': ['width', 'height', 'viewBox', 'xmlns', 'xmlns:xlink', 'version']
        },
        'remove': {
            'elems': ['title', 'desc']
        },
        'cache': {
            'elems': ['filter']
        }
    }

    var globalAttr = {
        'g': [{'stroke-linecap': 'round', 'stroke-linejoin': 'round'}]
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
    function orderChildrenByType(elem, ordering_arr) {
        var elemChildren = elem.childNodes;
        var elemOrder = ordering_arr[0].split(',');
        var elemDict = {};

        elemOrder.forEach(function(elem_type, i) {
            elemDict[elem_type] = [];
            for (var j = 0; j < elemChildren.length; j++) {
                var iElem = elemChildren[j];

                if (iElem.nodeName && iElem.nodeName.toLowerCase().indexOf(elem_type) > -1) {
                    elemDict[elem_type].push(iElem.cloneNode(true));
                }
            }
        });
        var elemAttrOrder = ordering_arr.length > 1 && ordering_arr[1].split(',') || ['id'];
        elem.innerHTML = '';
        var elemKeysReverse = Object.keys(elemDict)
        elemKeysReverse.forEach(function(key, i) {
            var elemKeyArr = elemDict[key];
            elemKeyArr.forEach(function(key_elem, j) {
                elem.appendChild(key_elem);
            })
        })

    }

    function getElementAttributeNumber(e1, attr) {
        var attrValue = e1 && e1.getAttribute(attr);
        var numArr = UtilitiesService.getArrayOfDecimals(attrValue);
        return (numArr && numArr.length && Math.abs(parseFloat(numArr[0]))) || 0
    }

    function sortElemsByAttr(elem_arr, attr_arr, reverse) {
        reverse = reverse || false;
        attr_arr.forEach(function(attr_name, i) {
            elem_arr.sort(function(e1, e2) {
                var indOne = getElementAttributeNumber(e1, attr_name)
                var indTwo = getElementAttributeNumber(e2, attr_name);
                return indTwo - indOne
            })
        })
        return (reverse && elem_arr.reverse()) || elem_arr;
    }

    function parseSVG(elem) {
        _elem = elem[0];
        _def = _elem.querySelector('defs');
        if (!_def) {

            _elem.appendChild(document.createElementNS('http://www.w3.org/2000/svg',"def"));
        }
        var attr = _elem.attributes;
        var ns = _elem.getAttribute('xmlns');
        var uniqueGIDs = ['white', 'glow'];
        var allFilters = _elem.querySelectorAll('filter');
        // var defParent = allFilters[0].parentNode;
        var allUses = _elem.querySelectorAll('use');
        var allGs = _elem.querySelectorAll('g');

        //parse root svg
        parseRootSvg(_elem, removeAttrDict.keep.svg)

        //remove all titles, defs
        filterChildrenOfType(_elem.childNodes, removeAttrDict.remove.elems);

        //order children by element type clarified






        function parseRootSvg(elem, whitelist_arr) {
            var svgToRemove = [];
            for (var i = 0; i < attr.length; i++) {
                iAttrName = attr[i].name;
                if (whitelist_arr.indexOf(iAttrName) === -1) {
                    svgToRemove.push(iAttrName);
                }
            }
            svgToRemove.forEach(function(attr_name, _) {
                _elem.removeAttributeNS(null, attr_name);
            });
        }



        function filterChildrenOfType(children, blacklist_arr) {
            var svgChildren = children;
            for (var i = 0; i < svgChildren.length; i++) {
                var childName = svgChildren[i].nodeName.toLowerCase();
                if (blacklist_arr.indexOf(childName) > -1) {
                    _elem.removeChild(svgChildren[i]);
                }
            }
        }


        allFilters.forEach(function(filter, i) {
            var filterId = filter.getAttribute('id');
            filter.removeAttribute('id');
            if (cache.filter.outerHTML.indexOf(filter.outerHTML) === -1) {
                cache.filter.outerHTML.push(filter.outerHTML);
                filter.setAttribute('id', 'filter-' + (cache.filter.elem.length + 1));
                cache.filter.elem.push(filter);
            } else {
                _def.removeChild(filter);
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

        var ordering_arr = ['filter,path,circle,rect,text', 'id'];

        _def.childNodes.forEach(function(child, i) {
            var nodeName = child.nodeName.toLowerCase()
            if (ordering_arr[0].split(',').indexOf(nodeName) === -1) {
                ordering_arr[0] = ordering_arr[0] + ',' + nodeName;
            }
        })
        console.log(ordering_arr);
        orderChildrenByType(_def, ordering_arr)

        var firstG = _elem.querySelector('g');
        var firstGKeepOnly = ['fill', 'fill-rule'];

        if (firstG.id && firstG.id.length && firstG.id.toLowerCase().indexOf('page') > -1) {
            firstG.removeAttribute('id');
            var attrToRemove = [];
            for (var i = 0; i < firstG.attributes.length; i++) {
                var attrName = firstG.attributes[i].name
                 if (firstGKeepOnly.indexOf(attrName) === -1) {
                    attrToRemove.push(attrName);
                 };
            }
            attrToRemove.forEach(function(attr_rm, i) {
                firstG.removeAttributeNS(null, attr_rm);
            })
        }
        if (firstG.children.length === 1 && firstG.children[0].attributes.length === 1 && firstG.children[0].nodeName.toLowerCase() === 'g') {
            firstG.innerHTML = firstG.children[0].innerHTML;
        }
        for (elem_type in globalAttr) {
            globalAttr[elem_type].forEach(function(attr_dict, i) {
                for (key in attr_dict) {
                    firstG.setAttribute(key, attr_dict[key]);
                }
            })
        }

        var groupElemToIgnore = ['id', 'class', 'd', 'transform', 'points', 'x', 'y', 'width', 'height', 'cx', 'cy', 'r', 'rx', 'cr'];
        if (firstG.children.length > 1 && elemChildrenHasConsecutiveUniquePatterns(firstG, groupElemToIgnore)) {

            getUniqueChildDict(firstG, groupElemToIgnore);
        } else {
            firstG.children[0].removeAttribute('id')
        }

        function elemChildrenHasConsecutiveUniquePatterns(elem, ignore_attr) {
            for (var i = 0; i < elem.children.length - 1; i++) {
                var uniquePattern = constructUniqueIDString(elem.children[i], ignore_attr);
                var nextUniquePattern = constructUniqueIDString(elem.children[i + 1], ignore_attr);
                if (uniquePattern === nextUniquePattern) {
                    return true;
                }
            }

            return false;
        }

        function getUniqueChildDict(elem, ignore_attr) {
            var children = elem.children;
            var childrenLength = children.length;
            var childDict = {};
            var currentChunkStr = constructUniqueIDString(children[0], ignore_attr);
            var uniqueStr;
            var currentChunkArr = [];
            var groupChunks = [];

            for (var i = 0; i < childrenLength; i++) {
                var iChild = children[i];

                uniqueStr = constructUniqueIDString(iChild, ignore_attr)

                if (uniqueStr.length && uniqueStr !== currentChunkStr) {
                    groupChunks.push({elems: currentChunkArr.slice(), attrStr: currentChunkStr + ""});
                    currentChunkStr = uniqueStr;
                    currentChunkArr = [{elem: iChild, attrStr: currentChunkStr + ""}];
                    continue;
                } else {
                    currentChunkArr.push({elem: iChild, attrStr: currentChunkStr + ""});
                }
            };

            var stripAttr = [];
            globalAttr['g'].forEach(function(kv, i) {for (k in kv) {stripAttr.push(k)}});
            var elemToAppend = [];
            for (var i = 0; i < groupChunks.length; i++) {
                iChunk = groupChunks[i];
                var g = document.createElementNS('http://www.w3.org/2000/svg',"g");
                var attrStrSplit = iChunk.attrStr.split(',');
                attrStrSplit.forEach(function(attr, i) {
                    var attrSplit = attr.split('|');
                    var key = attrSplit[0];
                    if (!key.length) return;
                    if (stripAttr.indexOf(key) > -1) {
                        return;
                    } else {
                        var value = attrSplit[1]
                        if (key && value && key.length && value.length) {
                            g.setAttribute(key, value);
                        }
                    }
                })
                if (iChunk.elems && iChunk.elems.length) {
                    iChunk.elems.forEach(function(e, i) {
                        attrStr = e.attrStr.split(',');
                        attrStr.forEach(function(attr_str, j) {
                            var kv = attr_str.split('|');
                            if (kv.length > 1) {
                                e.elem.removeAttribute(kv[0]);
                            }
                        })
                        g.appendChild(e.elem);
                    })
                }
                elemToAppend.push(g);
            }
            firstG.innerHTML = '';
            elemToAppend.forEach(function(elem, i) {
                firstG.appendChild(elem);
            })
        }
        function constructUniqueIDString(elem, ignore_attr) {

            var attrLength = elem.attributes.length;
            var resultStr = '';
            for (var i = 0; i < attrLength; i++) {
                var attr = elem.attributes[i];
                var attrD = {name: attr.name, value: attr.value};
                if (ignore_attr.indexOf(attrD.name.toLowerCase()) === -1) {
                    resultStr += attrD.name + '|' + attrD.value + ',';
                }
            }
            return resultStr.substring(0, resultStr.length - 1).trim();
        }

        return elem;
    }
}