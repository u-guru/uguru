//default globals
var itemSelectedGlobal = false;
var UFColor = "rgb(255, 74, 0)";
var TuftsColor = '#417dc1';
var CalColor = "rgb(0, 50, 98)";

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
	if (scroll > left / 2) {
		$("#top-school-logo, #top-school-banner").fadeOut();
		$("#top-mobile-logo").addClass("visible");
	} else if (scroll < left / 2) {
		$("#top-school-logo, #top-school-banner").fadeIn();
		$("#top-mobile-logo").removeClass("visible");
	} else {
		$("#top-school-logo, #top-school-banner").fadeIn();
		$("#top-mobile-logo").removeClass("visible");
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
workSlider = function() {
	if ($(window).width() > 768) {
		$('.work-infograph').easyPieChart({
		    size: 200,
		    lineWidth: 8,
		    trackColor: false,
		    scaleColor: false,
		    scaleLength: false
		});
		$('#work-infograph-bg').easyPieChart({
		    size: 196,
		    lineWidth: 4,
		    trackColor: "#2B3234",
		    scaleColor: false,
		    scaleLength: false
		});
	} else if ($(window).width() <= 768) {
		$('.work-infograph').easyPieChart({
		    size: 150,
		    lineWidth: 8,
		    trackColor: false,
		    scaleColor: false,
		    scaleLength: false
		});
		$('#work-infograph-bg').easyPieChart({
		    size: 146,
		    lineWidth: 4,
		    trackColor: "#2B3234",
		    scaleColor: false,
		    scaleLength: false
		});
	}
}

$(document).ready(function () {
	hideIntercomShit();
	// initParallax();
	slideLeft();
	menuStyle();
	workSlider();
	$(window).resize(function(){
		slideLeft();
		menuStyle();
		menuBG();
		workSlider();
	});
});

$(function () {
	$("#faq dl dt a").each(function(e){
		$(this).on("click", function(e) {
			$(this).parent().parent().toggleClass("active");
			e.preventDefault();
		});
	});
	if ($(window).width() > 1280) {
		$('.inside h2').fitText(1.2, { maxFontSize: '48px', minFontSize: '24px' });
	} else if ($(window).width() <= 1280) {
		$('.inside h2').fitText(2, { maxFontSize: '36px', minFontSize: '24px' });
	}
	$('#start-text h3').fitText(2, { maxFontSize: '36px', minFontSize: '24px' });
	$('.main h1').fitText(1.5, { maxFontSize: '48px', minFontSize: '24px' });

	$("#search-box").slideDown();
	$('#search-bar').focus(function(e) {
		$("#top-school-banner").css("width", "60%");
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
	$("#search-bar").focus(function(){
		$('#top-school-banner').css('width','30%');
	});
	$("#search-bar").blur(function(){
		setTimeout(function() {
			$("#search-results").slideUp();
			// $("#top-school-logo, #top-school-banner").css("width", "100%");
			$("#search-box").css({
				"-webkit-transform": "translateX(-50%)",
				"-moz-transform": "translateX(-50%)",
				"-ms-transform": "translateX(-50%)",
				"-o-transform": "translateX(-50%)",
				"transform": "translateX(-50%)"
			});
		}, 100);
	});
	// SAMIR - SIDEBAR
	// Should also be a way to click on #overlay
	$(".top-link-menu").on("click", function(e) {
		$("#side-menu, #overlay").addClass("active");
		e.preventDefault();
	});
	$(".top-link-start, .link-start").on("click", function(e) {

		var modalToFire = document.querySelector('#start-modal');
		var startButton = this;

		$('#start-modal').addClass('active');

		//call to action tool
		//once CTA object is instantiate, it returns a function that can reverse it
		closeCtaAnimatedModal = cta(
			startButton, // Arg #1 element where to transition from
			modalToFire, // Arg #2 what to transition into
			{            // Arg #3 options
				duration:0.3, // duration of animation
				targetShowDuration:0, //duration for target element to become visible, if hidden initially
				relativeToWindow:false //set to true if your target element is relative & position w.r.t window

			},
			function()   // Arg #4 (OPTIONAL) callbacks
				{
					console.log('callback for cta modal executed')
					// setTimeout(function() {
					// 	$("#overlay").toggleClass("active");
					// },100) //seconds afterwards

				}
		);

	});
	$('#home-modal-close-link, #home-modal-submit-close-link').on("click", function(e) {
		closeCtaAnimatedModal();
		$('#start-modal').toggleClass('active');
		e.preventDefault();
	})
	$(".top-link-close").on("click", function(e) {
		$("#side-menu, #overlay, #start-modal").removeClass("active");
		e.preventDefault();
	});

	$('.top-link-chat, #link-support').on("click", function(e) {
		document.querySelector('.intercom-launcher-button').click();
		setTimeout(function() {
			$('#side-menu, #overlay').removeClass('active');
		}, 500)
	});

	$('.top-link-chat').on("click", function(e) {
		document.querySelector('.intercom-launcher-button').click();
	});

	$('#overlay-right:visible').on("click", function(e){
		$('#overlay').removeClass('active');
		if ($('#start-modal').is(":visible")) {
			$('#start-modal').removeClass('active');
			$('#side-menu').removeClass('active')
		}
	})
	$('.work-icon-link').on("click", function(e) {
		sliderItem = document.querySelector('#slider-triangle');
		destinationLink = this;
		var index = $('#work-slider ul li').index($(this).parent());
		currentSliderRect = sliderItem.getBoundingClientRect();
		currentPosX = currentSliderRect.left;
		currentSliderWidth = currentSliderRect.width / 2;

		destinationLinkRect = destinationLink.getBoundingClientRect() ;
		if (destinationLinkRect.left > currentPosX) {
			translateXOffset = destinationLinkRect.left + (destinationLinkRect.width / 2) - currentPosX;
			if (index > 1) {
				// translateXOffset += 135;
			} else {
				translateXOffset -= currentSliderWidth;
			}
		} else {
			translateXOffset = destinationLinkRect.left - currentPosX + (destinationLinkRect.width / 2) + (135 * (index + 1)) ;
		}

		 translateXOffset = translateXOffset.toString() + 'px';
		 console.log(translateXOffset);
		initialProperties = {
				translateX: translateXOffset
		}
		$(sliderItem).velocity(initialProperties);
	});

	$('#search-box').on("mouseover", function(e) {
		//check if mouse is still over the bar after 500 seconds
		setTimeout(function(){
			if ($('#search-box').is(':hover') &&
				!$('#search-bar').val().length)
			{
				$('#search-bar').focus();
			}
		}, 500);
	});
	$('#search-box').on("mouseleave", function(e) {
		setTimeout(function() {
			if (!$('#search-box').is(':hover') && !$('#search-bar').val().length && !itemSelectedGlobal) {
				$('#search-bar').blur();
				$('#top-school-banner').css("width", "60%");
			}
		}, 500)
	});
	$("#search-results").on("click", "li", function(e) {
		/* SAMIR - ELEMENTS THAT NEED TO CHANGE
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
		itemSelectedGlobal = true;
		searchResultsBackgroundMap = document.querySelector('.search-results-map');
		numGurusElement = document.querySelector('#search-guru-number');
		popularCoursesParent = document.querySelector('.search-results-courses ul.text-center');
		popularCoursesParent.innerHTML ='';
		$("#border-outer").css("fill", "white");
		$("#top-school-banner").css("width", "20%");
		$('#top-school-logo').css("width","auto");
		if ($(this).is('#search-berkeley')) {
			var color = "rgb(0, 50, 98)";
			$('#banner').css("background-image", "url(" + 'https://farm8.staticflickr.com/7143/6841501153_7eb07da0c4_b.jpg' + ")");
			$("#top-school-logo").attr('src', 'http://i.forbesimg.com/media/lists/colleges/university-of-california-berkeley_50x50.jpg');
			$("#border-inner").css("fill", color);
			$(".search-results-top, .search-results-gurus").css("background", color);
			$("#search-school-name").text("UC BERKELEY");

			numGurusElement.innerHTML = '30k+';
			popularCourses = ["STATS20", "ASTROC10", "COS126", "ASTRONC10", "CHEM3A", "CHEM3AL",
            	"MCB61", "PSYCHC19","CS61A", "BIO 1A", "PSYCH 1"];

			for (var i = 0 ; i < popularCourses.length; i ++) {
				var courseNode = document.createElement("li");
				courseNode.innerHTML = popularCourses[i];
				popularCoursesParent.appendChild(courseNode);
			}
			var courseNode = document.createElement("li");
			courseNode.innerHTML = 'and more';
			popularCoursesParent.appendChild(courseNode);

			var successCallback = function() {
				setTimeout(function() {
					searchResultsBackgroundMap.style.backgroundImage = constructStaticGMapBackground(37.8718992,-122.2585399);
				}, 200)
			}

			animateSearchBoxResults(CalColor, successCallback);


		} else if ($(this).is('#search-florida')) {
			var color = "rgb(255, 74, 0)";
			$('#banner').css("background-image", "url(" + 'https://farm8.staticflickr.com/7206/6858631913_1fee1210b4_b.jpg' + ")");
			$("#top-school-logo").attr('src', 'http://i.forbesimg.com/media/lists/colleges/university-of-florida_50x50.jpg');
			$("#border-inner").css("fill", color);
			$(".search-results-top, .search-results-gurus").css("background", color);
			$("#search-school-name").text("University of Florida");
			numGurusElement.innerHTML = '49k';
			popularCourses = ["SOP2772","PSY2012","PHY2012","SOP3723","PSY2000","ANT2511","ANT2000", "CGS2100",
            "CGS2100C","CGS3200","CNT3004"];
            for (var i = 0 ; i < popularCourses.length; i ++) {
				var courseNode = document.createElement("li");
				courseNode.innerHTML = popularCourses[i];
				popularCoursesParent.appendChild(courseNode);
			}
			var courseNode = document.createElement("li");
			courseNode.innerHTML = 'and more';
			popularCoursesParent.appendChild(courseNode);

			var successCallback = function() {
				setTimeout(function() {
					searchResultsBackgroundMap.style.backgroundImage = constructStaticGMapBackground(29.6436325,-82.3549302);
				}, 200)
			}

			animateSearchBoxResults(UFColor, successCallback);
		} else if ($(this).is('#search-tufts')) {
			var color = "#417dc1";
			$('#banner').css("background-image", "url(" + 'http://c2.staticflickr.com/6/5097/5514096962_ee022a89d4_b.jpg' + ")");
			$("#top-school-logo").attr('src', 'http://i.forbesimg.com/media/lists/colleges/tufts-university_50x50.jpg');
			$("#border-inner").css("fill", color);
			$(".search-results-top, .search-results-gurus").css("background", color);
			$("#search-school-name").text("Tufts University");
			popularCourses = ["ECON102","MICRO101", "ECON1","EC005", "CHEM01", "CHEM1,2", "PS061","PS0061", "ECON5", "PS189-04", "EC0N2"];
			numGurusElement.innerHTML = '10k';
			for (var i = 0 ; i < popularCourses.length; i ++) {
				var courseNode = document.createElement("li");
				courseNode.innerHTML = popularCourses[i];
				popularCoursesParent.appendChild(courseNode);
			}
			var courseNode = document.createElement("li");
			courseNode.innerHTML = 'and more';
			popularCoursesParent.appendChild(courseNode);

			var successCallback = function() {
				setTimeout(function() {
					searchResultsBackgroundMap.style.backgroundImage = constructStaticGMapBackground(42.4074843,-71.1190232);
				}, 200)
			}

			animateSearchBoxResults(UFColor, successCallback);
		}
	});


});

var hideIntercomShit = function() {
	var intercomElement = document.getElementById('intercom-launcher')
	if (intercomElement) {
		document.getElementById('intercom-launcher').style.height = 0;
		document.getElementById('intercom-launcher').style.width = 0;
		return;
	} else {
		setTimeout(function() {
			hideIntercomShit();
		}, 1000)
	}
}
var initParallax = function() {
	//check if loaded properly
	if (!Parallax) {
		return;
	}
	var scene = document.getElementById('main');
	var parallax = new Parallax(scene);
	//custom for each element
	var searchBox = document.getElementById("search-box");
	// if (searchBox) searchBox.style.marginTop ='30%';
}

$(document).ready(function () {
	$(".earn-category").flip({
		axis: 'y',
		trigger: 'hover'
	});
	$(".earn-category-mobile").not("#and-more").flip({
		axis: 'x',
		trigger: 'hover'
	});
});