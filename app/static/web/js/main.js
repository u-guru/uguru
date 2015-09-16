//default globals
var itemSelectedGlobal = false;
var UFColor = "rgb(255, 74, 0)";
var TuftsColor = '#417dc1';
var CalColor = "rgb(0, 50, 98)";
var carouselShowPaneLock;
var isDesktop = $(window).width() > 768;
var isMobile = !isDesktop;
//end defaults

workPopup = function() {
	if ($(window).width() >= 768) {
		$(".work-pane-link").each(function(e){
			$(this).on("click", function(e) {
				$(".work-popup").removeClass("active");
				$(this).parent().children(".work-popup").addClass("active");
				e.preventDefault();
			});
		});
	} else if ($(window).width() < 768) {
		$(".work-pane-link").each(function(e){
			$(this).on("click", function(e) {
				$(this).parent().children(".work-popup").fadeIn();
				e.preventDefault();
			});
		});
		$(".work-popup-info h3 a").each(function(e){
			$(this).on("click", function(e) {
				$(this).parent().parent().parent().fadeOut();
				e.preventDefault();
			});
		});
	}
}

$(function () {
	$("#faq dl dt").each(function(e){
		$(this).on("click", function(e) {
			$(this).parent().toggleClass("active");
			e.preventDefault();
		});
	});
	if ($(window).width() > 1400) {
		$('.inside h2').fitText(1.2, { maxFontSize: '48px', minFontSize: '24px' });
	} else if ($(window).width() <= 1400) {
		$('.inside h2').fitText(2, { maxFontSize: '36px', minFontSize: '24px' });
	}
	$('#start-text h3').fitText(2, { maxFontSize: '36px', minFontSize: '24px' });
	$('.main h1').fitText(1.5, { maxFontSize: '48px', minFontSize: '24px' });

	$("header .top-link-menu").on("click", function(e) {
		$('#side-menu-wrapper').addClass('active');
		$('#side-menu').addClass('active animated slideInLeft').show();
		$("#full-overlay").addClass("active animated fadeIn");
		$('#side-menu').one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
			function() {
				setTimeout(function() {
					$('#side-menu').removeClass('animated slideInLeft');
					$("#full-overlay").removeClass("animated fadeIn");
				}, 200);
				$('#full-overlay').one("click", function(e) {

					$('.top-link-close').trigger('click');
				})
			})
		e.preventDefault();
	});

	$('#full-overlay').on("mousewheel", function(e) {
		 if($('#full-overlay').hasClass('active')) {
 			 console.log("Remove side-menu")
		 	$('#full-overlay').addClass("animated fadeOut");
			$('#side-menu').addClass("animated slideOutLeft").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
			function() {
			 	$('#full-overlay').removeClass('animated fadeOut active');
			 	$('#side-menu-wrapper').removeClass('active');
			 	setTimeout(function() {
			 		$('#side-menu').removeClass('animated slideOutLeft active');
			 	}, 500)
			});
		}
	});

	$(".top-link-close").on("click", function(e) {
		$('#full-overlay').addClass("animated fadeOut");
		$('#side-menu').addClass("animated slideOutLeft").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
		function() {
		 	$('#full-overlay').removeClass('animated fadeOut active');
		 	$('#side-menu-wrapper').removeClass('active');
		 	setTimeout(function() {
		 		$('#side-menu').removeClass('animated slideOutLeft active').hide();
		 	}, 500)
		});
		// $("#side-menu, #overlay, #start-modal").removeClass("active");
		// e.preventDefault();
	});
	// $(".top-link-close").on("", function(e) {
	// 		console.log("test");
	// });

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
	$('.cta-desktop').on('click', function() {
		carousel.showPane(0);
		setTimeout(function() {
			$('#search-bar').trigger('focus');
		}, 500)
	})

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

	var paperElement = $('.paper-input')
	paperElement.on('keydown keyup focus blur', function() {
	    if($(this).val() != '') {
	        $(this).addClass('paper-input--touched');
	    } else{
	        $(this).removeClass('paper-input--touched');
	    }
	});

	paperElement.on('keyup blur', function() {
   		$(this).addClass('paper-input--dirty');
	});

	$('#cta-email-input').on("focusin", function() {
		$('#cta-email-input').css({'width': '25%'});
	})

	$('#cta-email-input').on('mouseover', function() {
		$('#cta-email-input').focus();
	})

	$('#cta-email-input').on("blur", function() {
		$('#cta-email-input').css({'width': '9%'});
	});
});

var hideIntercomShit = function() {
	var intercomElement = document.getElementById('intercom-launcher')
	if (intercomElement) {
		document.getElementById('intercom-launcher').style.height = 'initial';
		document.getElementById('intercom-launcher').style.width = 'initial';
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

var checkForRedirectHashes = function() {
	currentHash = location.hash;
	if (currentHash.length && currentHash.indexOf('-pane') !== -1) {
		homePanes = ['search', 'earn', 'work', 'why', 'start'];
		pageRedirectName = currentHash.split('-')[0].substring(1);
		paneIndex = homePanes.indexOf(pageRedirectName);
		if (paneIndex !== -1 && carousel) {
			carousel.showPane(paneIndex);
			setTimeout(function() {
				location.hash = '';
			}, 500)
		}
	}
}

$(document).ready(function () {
	workPopup();
	$(window).resize(function(){
		workPopup();
	});
	$(".earn-category").flip({
		axis: 'y',
		trigger: 'hover'
	});

	$('.search-results').flip({
		axis: 'y',
		trigger: 'click'
	});

	$(".earn-category-mobile").not("#and-more").flip({
		axis: 'x',
		trigger: 'hover'
	});


});
