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