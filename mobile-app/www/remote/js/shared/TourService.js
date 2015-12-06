angular
.module('sharedServices')
.factory('TourService', [
	'$ionicBackdrop',
	TourService
    ]);

function TourService($ionicBackdrop) {

    var tooltips = [];
    var defaultLocation = 0;
    var toolTipTrackerDict = {}
    var backdrop;

    var windowRect = document.body.getBoundingClientRect();

	return {
        initTooltip:initTooltip,
        initTooltipTour:initTooltipTour
	};



    function initTooltip(text, btnText, direction, elemSelector)  {

        var origElem = document.querySelector(elemSelector);
        if (!origElem) {
            return;
        }

        var tourElem = cloneElement(origElem);
        tourElem.setAttribute("style", window.getComputedStyle(origElem).cssText);



        var tourElemRect = origElem.getBoundingClientRect();
        var elemDiv = document.createElement('div');
        elemDiv.style.position = 'absolute';
        elemDiv.style.top = parseInt(tourElemRect.top - windowRect.top) + 'px';
        elemDiv.style.left = parseInt(tourElemRect.left - windowRect.left) + 'px';
        elemDiv.style.zIndex = 10005;
        elemDiv.style.width = tourElemRect.width + 'px';
        elemDiv.style.height = tourElemRect.height + 'px';

        injectBackDrop();
        var clonedNode = origElem.cloneNode(true);
        clonedNode.style.cssText = window.getComputedStyle(origElem).cssText;
        elemDiv.appendChild(clonedNode);
        document.body.appendChild(elemDiv);


        var coords = {
            posX: elemDiv.style.width,
            posY: elemDiv.style.top,
            rectOrig: tourElemRect
        }

        var htmlTipElem = initTipElem(text, btnText, 'left', coords, clonedNode )
        toolTipTrackerDict[elemSelector] = htmlTipElem;
        document.body.appendChild(toolTipTrackerDict[elemSelector])
    }

    function initTipElem(text, btnText, direction, coords, clonedNode) {
        var elemDiv = document.createElement('div');
        elemDiv.className = "guru-tip guru-tip-center guru-tip-" + direction;

        var buttonDiv = document.createElement('button');
        buttonDiv.innerHTML = btnText;

        var childElemDiv = document.createElement('div');
        buttonDiv.addEventListener('click', function(e) {
            e.target.parentNode.remove(elemDiv);
            clonedNode.parentNode.remove(clonedNode)
            backdrop.style.cssText ='visibility:hidden;'

        })
        childElemDiv.innerHTML = text;
        elemDiv.appendChild(childElemDiv);
        elemDiv.appendChild(buttonDiv);
        elemDiv.style.zIndex = 10006;
        if (direction === 'top') {
            elemDiv.style.top = coords.posY;
            elemDiv.style.left = coords.posX;
        } else if (direction === 'left') {
            console.log('orig elem rect', coords.rectOrig)
            elemDiv.style.height = 'auto';
            elemDiv.style.top = coords.rectOrig.top + (coords.rectOrig.height / 2) + 'px';
            elemDiv.style.paddingLeft = coords.rectOrig.width + coords.rectOrig.left + 20 + 'px';
            elemDiv.style.width = 100 + '%';
            // elemDiv.style.left = '0px';
        }
        elemDiv.style.position = "absolute";
        return elemDiv;
    }

    function injectBackDrop() {
        var elemDiv = document.createElement('div');
        backdrop = elemDiv;
        elemDiv.style.cssText = 'position:absolute;width:100%;top:0;height:100%;opacity:0.7;z-index:1000;background:#000;';
        document.body.appendChild(elemDiv);
    }

    function cloneElement(element) {
        // var oldElem = element;
        var el = element.cloneNode(true); // true == clone descendents too

        var els = element.getElementsByTagName("*");
        el.setAttribute("style", window.getComputedStyle(element).cssText);
        for(var i = -1, l = els.length; ++i < l;){
            els[i].setAttribute("style", window.getComputedStyle(els[i]).cssText);
        }
        return el;
    }

    function initTooltipTour(arrTooltipOptions) {
        for (var i = 0; i < arrTooltipOptions.length; i++) {
            var optionsIndex = arrTooltipOptions[i];
            console.log('tooltip options', optionsIndex);
            initTooltip(optionsIndex.text, optionsIndex.btnText, optionsIndex.direction, optionsIndex.selector)
        }
    }

}