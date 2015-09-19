//show loader if dom is not loaded
var onDomLoadSuccess = function() {
	setTimeout(function() {
		bodyLoadingDiv.parentNode.removeChild(bodyLoadingDiv);
        setTimeout(function() {
            launchIntercomeSetActive()
        }, 2000);
	}, 2000);
}

var launchIntercomeSetActive = function() {
    if (!$('#intercom-container:visible').length) {
        console.log('setting intercom to active..');
        $('#intercom-container').addClass('active');
        $('#intercom-container').css('display', 'block');
    } else {
        console.log('intercome still does not exist.. trying again');
        setTimeout(function() {
            launchIntercomeSetActive();
        }, 1000)
    }
}
// how to create angular
// 1. Render the dom once

var animateSearchBoxResults = function(color, callback) {

    $('#search-box p').hide();
    $('#search-container').hide();
    $('#search-box-loader').css('visibility','visible');
    $('#search-box-loader svg').css('fill', color);

    setTimeout(function() {
        $("#search-box").addClass('animated zoomOut');
        $('#search-box-loader').css('visibility','hidden');
    }, 1000);

    setTimeout(function() {
        $('#top-school-banner').css("width","20%");
        $('#search-box').hide().removeClass('animated zoomOut')
        $(".search-results").show().addClass('animated bounceInDown');
        callback();
    }, 1600);
}

var hideUniversityModalShowSearchBox = function() {

    // $(".search-results").hide();
    $('#search-box').show();
    $('#search-box').addClass('animated slideInUp active').show();
    $('#search-box p').show();
    $('#search-container').show();
    // $('#search-box-loader').css('visibility','visible');
    // $('#search-box-loader svg').css('fill', color);

    setTimeout(function() {
        $("#search-box").removeClass('animated slideInUp');
    }, 250);
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
    // console.log ( transitionOffsetX +" = "+ targetElem.offsetLeft+"+ "+targetElem.getBoundingClientRect().width/2+" - "+sliderElem.offsetLeft+" - "+sliderElem.getBoundingClientRect().width/2)
    moveElement(sliderElem, transitionOffsetX);
    if (successCallback) {
        successCallback();
    }
}

var countupElement = function(elemId, start, end, duration) {
    var countAnimation = new CountUp(elemId, start, end, 1, duration);
    $(elemId).show();
    countAnimation.start();
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