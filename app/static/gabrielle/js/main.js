slideLeft = function() {
	$('.slide').each(function() {
		var left = $(window).width();
		var number = $(this).attr("data-number");
		$(this).css("left", left * number);
	});
}
menuBG = function() {
	var left = $(window).width();
	var scroll = $(window).scrollLeft();
	if ($(window).width() >= 768) {
		if (scroll > left / 2) {
			$("#top-school-logo, #top-school-banner").css("width", "30%");
			$("#top-menu").css("background", "rgba(0,0,0,.5)");
		} else {
			$("#top-school-logo, #top-school-banner").css("width", "100%");
			$("#top-menu").css("background", "none");
		}
	} else {
		$("#top-school-logo, #top-school-banner").css("width", "50%");
		$("#top-menu").css("background", "none");
	}
}
menuStyle = function() {
	$("#top").css("width", $(window).width());
	$("#slide-breadcrumbs").css({
		"bottom": "auto",
		"top": $(window).height() - 28
	});
	$(window).scroll(function(){
		var left = $(window).width();
		var scroll = $(window).scrollLeft();
		menuBG();
		$('.slide').each(function() {
			var number = $(this).attr("data-number");
			if (scroll >= left * number) {
				$("a[data-number=" + number + "]").addClass("active");
				$("a").not("a[data-number=" + number + "]").removeClass("active");
			} else if (scroll < left) {
				$("a[data-number=0]").addClass("active");
				$("a").not("a[data-number=0]").removeClass("active");
			}
		});
	});
}

// alert(document.userAgent);
safariMobileEdgeCase = function() {

	var userAgent = navigator.userAgent;
	var is_safari_mobile = (userAgent.indexOf("Safari") > -1) && (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i));
	if (is_safari_mobile) {
		FastClick.attach(document.body);
		$('#main').on('touchstart touchend', function(e) {
			// e.preventDefault();
			offset_header_left = $('header')[0].getBoundingClientRect().left;
			$('#top-menu')[0].style.left = (offset_header_left * -1).toString() + 'px';
		})
	}
}


$(document).ready(function () {
	safariMobileEdgeCase();// initSafariMobileCase();
	slideLeft();
	menuStyle();
	$(window).resize(function(){
		slideLeft();
		menuStyle();
		menuBG();
	});
});

$(function () {
	$('.inside h2').fitText(1.2, { maxFontSize: '40px' });
	if ($(window).width() >= 768) {
		$("#search-box").slideDown();
		$('#search-bar').focus(function(e) {
			$("#top-school-logo, #top-school-banner").css("width", "60%");
		});
		$('#search-bar').focus(function(e) {
			$("#search-results").slideDown();
			$("#search-box").css({
				"-webkit-transform": "translate(-50%,-50%)",
				"-moz-transform": "translate(-50%,-50%)",
				"-ms-transform": "translate(-50%,-50%)",
				"-o-transform": "translate(-50%,-50%)",
				"transform": "translate(-50%,-50%)"
			});
		});
		$("#search-bar").blur(function(){
			$("#search-results").slideUp();
			$("#top-school-logo, #top-school-banner").css("width", "100%");
			$("#search-box").css({
				"-webkit-transform": "translateX(-50%)",
				"-moz-transform": "translateX(-50%)",
				"-ms-transform": "translateX(-50%)",
				"-o-transform": "translateX(-50%)",
				"transform": "translateX(-50%)"
			});
		});
		$("#search-results").on("click", "li", function(e) {
			$("#search-box").slideUp();
			$("#border-outer").css("fill", "white");
			if ($(this).is('#search-harvard')) {
				var color = "#A41034";
				$("#top-school-logo").attr('src', '/static/images/school/harvard.svg');
				$("#search-results-harvard").slideDown();
				$("#border-inner").css("fill", color);
				$("#search-results-harvard").css("border-bottom-color", color);
				$("#search-results-harvard h1").css("color", color);
				$("#search-results-harvard button").css("background", color);
			} else if ($(this).is('#search-stanford')) {
				var color = "#8C1515";
				$("#top-school-logo").attr('src', '/static/images/school/stanford.svg');
				$("#search-results-stanford").slideDown();
				$("#border-inner").css("fill", color);
				$("#search-results-stanford").css("border-bottom-color", color);
				$("#search-results-stanford h1").css("color", color);
				$("#search-results-stanford button").css("background", color);
			} else if ($(this).is('#search-cambridge')) {
				var color = "#A3C1AD";
				$("#top-school-logo").attr('src', '/static/images/school/cambridge.svg');
				$("#search-results-cambridge").slideDown();
				$("#border-inner").css("fill", color);
				$("#search-results-cambridge").css("border-bottom-color", color);
				$("#search-results-cambridge h1").css("color", color);
				$("#search-results-cambridge button").css("background", color);
			}
		});
		$('.value-number').each(function() {
			$(this).css("height", $(this).width());
		});
		$(window).resize(function(){
			$('.value-number').each(function() {
				$(this).css("height", $(this).width());
			});
		});
	}
});