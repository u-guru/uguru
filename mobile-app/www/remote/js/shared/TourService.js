angular
.module('sharedServices')
.factory('TourService', [
	'$ionicBackdrop',
	TourService
    ]);

function TourService($ionicBackdrop) {

    var tooltips = [];
    var defaultLocation = 0;

    var windowRect = document.body.getBoundingClientRect();

	return {
        initTooltip:initTooltip
	};



    function initTooltip(text, direction, elemSelector)  {

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
        document.body.appendChild(initTipElem('text tooltip', 'left', elemDiv.style.width, elemDiv.style.top ))
    }

    function initTipElem(text, direction, posX, posY) {
        var elemDiv = document.createElement('div');
        elemDiv.className = "guru-tip guru-tip-center guru-tip-" + direction;
        var childElemDiv = document.createElement('div');
        childElemDiv.innerHTML = text;
        elemDiv.appendChild(childElemDiv);
        elemDiv.style.zIndex = 10006;
        elemDiv.style.top = posY;
        elemDiv.style.left = posX;
        elemDiv.style.position = "absolute";
        return elemDiv;
    }

    function injectBackDrop() {
        var elemDiv = document.createElement('div');
        elemDiv.style.cssText = 'position:absolute;width:100%;top:0;height:100%;opacity:0.3;z-index:1000;background:#000;';
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

}