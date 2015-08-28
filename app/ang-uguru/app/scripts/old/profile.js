'use strict';
$(window).imagesLoaded(function() {
	$("#profile").fadeIn();
});

$(function () {
	$(".top-link-menu").on("click", function(e) {
		$("#side-menu, #overlay").toggleClass("active");
		e.preventDefault();
	});
	$(".top-link-start").on("click", function(e) {
		$("#start-modal, #overlay").toggleClass("active");
		e.preventDefault();
	});
	$(".top-link-close").on("click", function(e) {
		$("#side-menu, #overlay, #start-modal").removeClass("active");
		e.preventDefault();
	});
});