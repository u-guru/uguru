$(function () {
	$("#search-box").slideDown();
	if ($(window).width() > 1280) {
		$('#search-bar').focus(function(e) {
			$("#top-school-logo, #top-school-banner").css("width", "75%");
		});
	} else {
		$('#search-bar').focus(function(e) {
			$("#top-school-logo, #top-school-banner").css("width", "60%");
		});
	}
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
	$("#search-results").on("click", "li", function(e) {
		$("#search-box").slideUp();
		$("#border-outer").css("fill", "white");
	    if ($(this).is('#search-harvard')) {
		    var color = "#A41034";
			$("#top-school-logo").attr('src', '/static/gabrielle/images/school/harvard.svg');
			$("#search-results-harvard").slideDown();
			$("#border-inner").css("fill", color);
			$("#search-results-harvard").css("border-bottom-color", color);
			$("#search-results-harvard h1").css("color", color);
			$("#search-results-harvard button").css("background", color);
	    } else if ($(this).is('#search-stanford')) {
		    var color = "#8C1515";
			$("#top-school-logo").attr('src', '/static/gabrielle/images/school/stanford.svg');
			$("#search-results-stanford").slideDown();
			$("#border-inner").css("fill", color);
			$("#search-results-stanford").css("border-bottom-color", color);
			$("#search-results-stanford h1").css("color", color);
			$("#search-results-stanford button").css("background", color);
	    } else if ($(this).is('#search-cambridge')) {
		    var color = "#A3C1AD";
			$("#top-school-logo").attr('src', '/static/gabrielle/images/school/cambridge.svg');
			$("#search-results-cambridge").slideDown();
			$("#border-inner").css("fill", color);
			$("#search-results-cambridge").css("border-bottom-color", color);
			$("#search-results-cambridge h1").css("color", color);
			$("#search-results-cambridge button").css("background", color);
	    }
	});
	$('#stats li').each(function() {
		$(this).css("height", $('#stats li').width());
	});
	$('#stats li').each(function() {
		$(this).css("height", $('#stats li').width());
	});
	$(window).resize(function(){
		$('#stats li').each(function() {
			$(this).css("height", $('#stats li').width());
		});
	});
});