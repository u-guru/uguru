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

$(document).ready(function () {
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
			if ($('#search-bar').val().length === 0) {
				$("#search-results").slideDown();
				$("#search-box").css({
					"-webkit-transform": "translate(-50%,-50%)",
					"-moz-transform": "translate(-50%,-50%)",
					"-ms-transform": "translate(-50%,-50%)",
					"-o-transform": "translate(-50%,-50%)",
					"transform": "translate(-50%,-50%)"
				});
			}
		});
		$('#search-bar').keypress(function() {
			if ($('#search-bar').val().length > 0) {
				$('#search-results').hide();
			}
		});
		$("#search-bar").blur(function(){
			setTimeout(function() {

				$("#search-results").slideUp();
				$("#top-school-logo, #top-school-banner").css("width", "100%");
				$("#search-box").css({
					"-webkit-transform": "translateX(-50%)",
					"-moz-transform": "translateX(-50%)",
					"-ms-transform": "translateX(-50%)",
					"-o-transform": "translateX(-50%)",
					"transform": "translateX(-50%)"
				});

			}, 100);
		});
		$(".top-link-menu").on("click", function(e) {
			$("#side-menu, #overlay").toggleClass("active");
		});
		$("#search-results").on("click", "li", function(e) {
			/* ELEMENTS THAT NEED TO CHANGE
				#top-school-logo - src (svg)
				#border-inner - fill (color)
				.search-results-top - background (color)
				.search-results-guru - background (color)
				.search-results-map - background (map, depends on static vs. dynamic)
				#banner - background (school photo from flickr)
				#search-school-name - text (school name)
				#search-guru-number - text (number of gurus)
				.search-results-courses ul li - text (course names), background (see index.html comments)
			*/
			$("#search-box").slideUp();
			$("#border-outer").css("fill", "white");
			$("#top-school-logo, #top-school-banner").css("width", "40%");
			if ($(this).is('#search-harvard')) {
				var color = "#A41034";
				$("#top-school-logo").attr('src', '/static/gabrielle/images/school/harvard.svg');
				$("#search-results-harvard").slideDown();
				$(".search-results").slideDown();
				$("#border-inner").css("fill", color);
				$(".search-results-top, .search-results-gurus").css("background", color);
				$("#search-school-name").text("Harvard University");
			} else if ($(this).is('#search-stanford')) {
				var color = "#8C1515";
				$("#top-school-logo").attr('src', '/static/gabrielle/images/school/stanford.svg');
				$("#search-results-stanford").slideDown();
				$(".search-results").slideDown();
				$("#border-inner").css("fill", color);
				$(".search-results-top, .search-results-gurus").css("background", color);
				$("#search-school-name").text("Stanford University");
			} else if ($(this).is('#search-cambridge')) {
				var color = "#A3C1AD";
				$("#top-school-logo").attr('src', '/static/gabrielle/images/school/cambridge.svg');
				$("#search-results-cambridge").slideDown();
				$(".search-results").slideDown();
				$("#border-inner").css("fill", color);
				$(".search-results-top, .search-results-gurus").css("background", color);
				$("#search-school-name").text("Cambridge University");
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