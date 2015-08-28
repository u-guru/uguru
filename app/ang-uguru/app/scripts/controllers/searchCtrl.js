"use strict";

function searchCtrl($scope) {

	var searchSlide = $("#search");

 //    $(window).on("load resize orientationchange", function() {
 //    setPaneDimensions();
 //    //updateOffset();
 //    });

 //    function setPaneDimensions() {
	//     searchSlide.width(document.body.width());
	//     // searchSlide.style.height = document.body.height();
	// }

	// var animateSearchBoxResults = function(color, callback) {

	//     $('#search-box').css('height', $('#search-box').height() + 'px');
	//     $('#search-box p').hide();
	//     $('#search-container').hide();
	//     $('#search-box-loader').css('visibility','visible');

	//     $('#search-box-loader svg').css('fill', color);

	//     setTimeout(function() {
	//         $("#search-box").addClass('animated zoomOut');
	//         $('#search-box-loader').css('visibility','hidden');
	//     }, 1000);

	//     setTimeout(function() {
	//         $('#top-school-banner').css("width","20%");
	//         $('#search-box').hide().removeClass('animated zoomOut')
	//         $(".search-results").show().addClass('animated bounceInDown');
	//         callback();
	//     }, 1600);
	// }

	


}

angular
	.module("app");
	.controller("searchCtrl", ["$scope", searchCtrl]);