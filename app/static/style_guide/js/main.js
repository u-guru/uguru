function isRetina() {
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
					  (min--moz-device-pixel-ratio: 1.5),\
					  (-o-min-device-pixel-ratio: 3/2),\
					  (min-resolution: 1.5dppx)";
	if (window.devicePixelRatio > 1)
		return true;
	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		return true;
	return false;
};
function retina() {
	if (!isRetina())
		return;
	$("img.2x").map(function(i, image) {
		var path = $(image).attr("src");
		path = path.replace(".png", "@2x.png");
		path = path.replace(".jpg", "@2x.jpg");
		$(image).attr("src", path);
	});
};

$(document).ready(retina);

$(function () {
	$('#main-menu a').on('click', function(e) {
		$("#main-menu a").removeClass("active");
		$(this).addClass("active");
	});
	var mq = window.matchMedia( "(min-width: 48em)" );
	if (mq.matches) {
		$('.color-sq').each(function() {
			var w = $(this).width();
			$(this).css("height", w/2);
		});
		$('.color-sq-lg').each(function() {
			var w = $(this).width();
			$(this).css("height", w*1.5);
		});
		$('.color-sq-md').each(function() {
			var w = $(this).width();
			$(this).css("height", w);
		});
	} else {
		$('.color-sq, .color-sq-md, .color-sq-lg').css("height", "150px");
	}
	$(window).resize(function(){
		if (mq.matches) {
			$('.color-sq').each(function() {
				var w = $(this).width();
				$(this).css("height", w/2);
			});
			$('.color-sq-lg').each(function() {
				var w = $(this).width();
				$(this).css("height", w*1.5);
			});
			$('.color-sq-md').each(function() {
				var w = $(this).width();
				$(this).css("height", w);
			});
		} else {
			$('.color-sq, .color-sq-md, .color-sq-lg').css("height", "150px");
		}
	});
});