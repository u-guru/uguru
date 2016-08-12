angular
.module('sharedServices')
.factory('TourService', [
	'$ionicBackdrop',
	TourService
    ]);

function TourService($ionicBackdrop) {
    var defaultLocation = 0;
    var toolTipTrackerDict = {}
    var backdrop;
    var tooltipCount = 0;
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
        var tourElemRect = origElem.getBoundingClientRect();
        var elemDiv = document.createElement('div');
        elemDiv.style.position = 'absolute';
        elemDiv.style.top = parseInt(tourElemRect.top - windowRect.top) + 'px';
        elemDiv.style.left = parseInt(tourElemRect.left - windowRect.left) + 'px';
        elemDiv.style.zIndex = 10005;
        elemDiv.style.width = tourElemRect.width + 'px';
        elemDiv.style.height = tourElemRect.height + 'px';

        backdrop || injectBackDrop();
        var clonedNode = origElem.cloneNode(true);
        clonedNode.style.cssText = window.getComputedStyle(origElem).cssText;
        elemDiv.appendChild(clonedNode);
        document.body.appendChild(elemDiv);


        var coords = {
            posX: elemDiv.style.width,
            posY: elemDiv.style.top,
            rectOrig: tourElemRect
        }

        var htmlTipElem = initTipElem(text, btnText, direction, coords, clonedNode)
        toolTipTrackerDict[elemSelector] = htmlTipElem;
        document.body.appendChild(toolTipTrackerDict[elemSelector])
    }
    function removeBackdrop() {
        backdrop.style.cssText ='visibility:hidden; display:none;'
    }
    function initTipElem(text, btnText, direction, coords, clonedNode) {
        var elemDiv = document.createElement('div');
        elemDiv.className = "tooltip tooltip-center tooltip-" + direction;

        var buttonDiv = document.createElement('button');
        buttonDiv.innerHTML = btnText;

        var childElemDiv = document.createElement('div');
        buttonDiv.addEventListener('click', function(e) {
            e.target.parentNode.remove(elemDiv);
            clonedNode.parentNode.remove(clonedNode)

            tooltipCount = tooltipCount - 1;
            if (!tooltipCount) {
                removeBackdrop();
            }

        })
        childElemDiv.innerHTML = text;
        elemDiv.appendChild(childElemDiv);
        elemDiv.appendChild(buttonDiv);
        elemDiv.style.zIndex = 10006;
        if (direction === 'top') {
            elemDiv.style.top = coords.posY;
            elemDiv.style.left = coords.posX;
        } else if (direction === 'left') {
            elemDiv.style.height = 'auto';
            elemDiv.style.top = coords.rectOrig.top + (coords.rectOrig.height / 2) + 'px';
            elemDiv.style.paddingLeft = coords.rectOrig.width + coords.rectOrig.left + 20 + 'px';
            elemDiv.style.width = 100 + '%';
        } else if (direction === 'right') {
            elemDiv.style.height = 'auto';
            elemDiv.style.top = coords.rectOrig.top + (coords.rectOrig.height / 2) + 'px';
            elemDiv.style.paddingRight = coords.rectOrig.width + 20 + 'px';
            elemDiv.style.width = 100 + '%';
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
    function initTooltipTour(arrTooltipOptions) {
        for (var i = 0; i < arrTooltipOptions.length; i++) {
            var optionsIndex = arrTooltipOptions[i];
            initTooltip(optionsIndex.text, optionsIndex.btnText, optionsIndex.direction, optionsIndex.selector)
        }
        tooltipCount = arrTooltipOptions.length;
    }
}