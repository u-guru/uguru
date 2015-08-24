//show loader if dom is not loaded
var onDomLoadSuccess = function() {
	setTimeout(function() {
		bodyLoadingDiv.parentNode.removeChild(bodyLoadingDiv);
	}, 2000);
}
// how to create angular
// 1. Render the dom once

var animateSearchBoxResults = function(color, callback) {

    $('#search-box').css('height', $('#search-box').height() + 'px');
    $('#search-box p').hide();
    $('#search-container').hide();
    $('#search-box-loader').css('visibility','visible');

    $('#search-box-loader svg').css('fill', color);

    setTimeout(function() {
        $("#search-box").addClass('animated zoomOut');
    }, 1000);

    setTimeout(function() {
        $('#top-school-banner').css("width","20%");
        $(".search-results").show().addClass('animated bounceInDown');
        callback();
    }, 1600);
}

var moveElement = function(elem, xOffset, yOffset, options) {
    options = {
        translateX: xOffset,
        translateY: yOffset
    }
    $(elem).velocity(options);
}

var getElemWidth = function(elem) {
    var elemRect = elem.getBoundingClientRect();
    return elemRect.width;
}

var getElemHeight = function(elem) {
    var elemRect = elem.getBoundingClientRect();
    return elemRect.height;
}

var moveHorizontalSlider = function(sliderElem, targetElem, successCallback) {

    transitionOffsetX =  targetElem.offsetLeft + targetElem.getBoundingClientRect().width/2 - sliderElem.offsetLeft - sliderElem.getBoundingClientRect().width/2;

    moveElement(sliderElem, transitionOffsetX);
    if (successCallback) {
        successCallback();
    }
}



// sliderItem = document.querySelector('#slider-triangle');
//         destinationLink = this;
//         var index = $('#work-slider ul li').index($(this).parent());
//         currentSliderRect = sliderItem.getBoundingClientRect();
//         currentPosX = currentSliderRect.left;
//         currentSliderWidth = currentSliderRect.width / 2;

//         destinationLinkRect = destinationLink.getBoundingClientRect() ;
//         if (destinationLinkRect.left > currentPosX) {
//             translateXOffset = destinationLinkRect.left + (destinationLinkRect.width / 2) - currentPosX;
//             if (index > 1) {
//                 // translateXOffset += 135;
//             } else {
//                 translateXOffset -= currentSliderWidth;
//             }
//         } else {
//             translateXOffset = destinationLinkRect.left - currentPosX + (destinationLinkRect.width / 2) + (135 * (index + 1)) ;
//         }

//          translateXOffset = translateXOffset.toString() + 'px';
//          console.log(translateXOffset);