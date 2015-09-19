$(function () {
	$('#nav-menu').on('click', function(e) {
		$('#nav-bar, #music, #play-bar, #main-menu, canvas').toggleClass("left");
		e.preventDefault();
	});
	$('#play-button').on('click', function(e) {
		$('#play-button-play, #play-button-pause').toggleClass("active");
		e.preventDefault();
	});
	$('.play-popup').on('click', function(e) {
		$('#play-bar').hide();
		$('#now-playing').css("margin-top", "-1136px");
		e.preventDefault();
	});
	$('#now-popdown').on('click', function(e) {
		$('#now-playing').css("margin-top", "0");
		$('#play-bar').show();
		e.preventDefault();
	});
	$('.now-type').each(function() {
		$(this).on('click', function(e) {
			$(this).children('a').children('img').toggleClass("active");
			e.preventDefault();
		});
	});
});