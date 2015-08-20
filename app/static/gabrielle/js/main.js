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
			$("#top-school-logo, #top-school-banner").fadeOut();
			$("#top-mobile-logo").addClass("visible");
		} else if (scroll < left / 2) {
			$("#top-school-logo, #top-school-banner").fadeIn();
			$("#top-mobile-logo").removeClass("visible");
		} else {
			$("#top-school-logo, #top-school-banner").fadeIn();
			$("#top-mobile-logo").removeClass("visible");
		}
	} else {
		$("#top-school-logo, #top-school-banner").css("width", "50%");
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
		// SAMIR - SIDEBAR
		// Should also be a way to click on #overlay
		$(".top-link-menu").on("click", function(e) {
			$("#side-menu, #overlay").toggleClass("active");
			e.preventDefault();
		});
		$(".top-link-start").on("click", function(e) {

			var modalToFire = document.querySelector('#start-modal');
			var startButton = this;

			$('#start-modal').toggleClass('active');

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

		$('#link-support').on("click", function(e) {
			document.querySelector('.intercom-launcher-button').click();
		});

		$('#overlay-right:visible').on("click", function(e){
			$('#overlay').toggleClass('active');
			if ($('#start-modal').is(":visible")) {
				$('#start-modal').toggleClass('active');
			}
		})

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
			$("#search-box").slideUp();
			$("#border-outer").css("fill", "white");
			$("#top-school-logo, #top-school-banner").css("width", "40%");
			if ($(this).is('#search-harvard')) {
				var color = "#A41034";
				$("#top-school-logo").attr('src', '/static/gabrielle/images/school/harvard.svg');
				$(".search-results").slideDown();
				$("#border-inner").css("fill", color);
				$(".search-results-top, .search-results-gurus").css("background", color);
				$("#search-school-name").text("Harvard University");
			} else if ($(this).is('#search-stanford')) {
				var color = "#8C1515";
				$("#top-school-logo").attr('src', '/static/gabrielle/images/school/stanford.svg');
				$(".search-results").slideDown();
				$("#border-inner").css("fill", color);
				$(".search-results-top, .search-results-gurus").css("background", color);
				$("#search-school-name").text("Stanford University");
			} else if ($(this).is('#search-cambridge')) {
				var color = "#A3C1AD";
				$("#top-school-logo").attr('src', '/static/gabrielle/images/school/cambridge.svg');
				$(".search-results").slideDown();
				$("#border-inner").css("fill", color);
				$(".search-results-top, .search-results-gurus").css("background", color);
				$("#search-school-name").text("Cambridge University");
			}
		});
		$('#home-modal-send-text').click(function(e) {
			var phoneNumberInputValue = $('#home-modal-phone-input').val();
			//add phone number regex
			//check for length
			if (!(phoneNumberInputValue.length && phoneNumberInputValue.length > 9)) {
				alert('Please enter valid phone number');
				$('#home-modal-phone-input').val('').focus();
				return;
			}


			if(!isPhoneNumberValid(phoneNumberInputValue)){
				alert('not valid phone number format');
				$('#home-modal-phone-input').val('').focus();
				return;
			}

			$('#modal-content').toggleClass('active');
			$('#modal-loader-container').toggleClass('active');

			//TODO: replace this with actual ajax call
			//
			setTimeout(function() {
				$('#modal-loader-container').toggleClass('active');
				$('#modal-content-submit').toggleClass('active');
			}, 1500)

		});
		$('#home-modal-send-email').click(function(e) {
			function validateEmail(email) {
			    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			    return re.test(email);
			}
			var phoneEmailInputValue = $('#home-modal-email-input').val();
			//add phone number regex
			//check for length
			if (!(phoneEmailInputValue.length && phoneEmailInputValue.length > 9)) {
				alert('Please enter valid email');
				$('#home-modal-email-input').val('').focus();
				return;
			}

			if(!validateEmail(phoneEmailInputValue)){
				alert('Please enter valid email');
				$('#home-modal-email-input').val('').focus();
				return;
			}
			//hide the main body
			$('#modal-content').toggleClass('active');
			$('#modal-loader-container').toggleClass('active');

			//TODO: replace this with actual ajax call
			//
			setTimeout(function() {
				$('#modal-loader-container').toggleClass('active');
				$('#modal-content-submit').toggleClass('active');
			}, 1500)

		});
	}
});