//default globals
var itemSelectedGlobal = false;
var UFColor = "rgb(255, 74, 0)";
var TuftsColor = '#417dc1';
var CalColor = "rgb(0, 50, 98)";
var carouselShowPaneLock;
//end defaults

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
	checkForRedirectHashes()
	hideIntercomShit();
	// initParallax();
	workSlider();
	$(window).resize(function(){
		// slideLeft();
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
	if ($(window).width() > 1400) {
		$('.inside h2').fitText(1.2, { maxFontSize: '48px', minFontSize: '24px' });
	} else if ($(window).width() <= 1400) {
		$('.inside h2').fitText(2, { maxFontSize: '36px', minFontSize: '24px' });
	}
	$('#start-text h3').fitText(2, { maxFontSize: '36px', minFontSize: '24px' });
	$('.main h1').fitText(1.5, { maxFontSize: '48px', minFontSize: '24px' });

	$('#full-overlay, #side-menu-wrapper.active').on("click", function(e) {
		$('.top-link-close').trigger('click');
	})
	$(".top-link-menu").on("click", function(e) {
		$('#side-menu-wrapper').addClass('active');
		$('#side-menu').addClass('active animated slideInLeft');
		$("#full-overlay").addClass("active animated fadeIn");
		setTimeout(function() {
			$('#side-menu').removeClass('animated slideInLeft');
			$("#full-overlay").removeClass("animated fadeIn");
		}, 1000);
		e.preventDefault();
	});

	$(".top-link-close").on("click", function(e) {
		$('#full-overlay').addClass("animated fadeOut");
		$('#side-menu').addClass("animated slideOutLeft").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
		function() {
		 	$('#full-overlay').removeClass('animated fadeOut active');
		 	$('#side-menu-wrapper').removeClass('active');
		 	setTimeout(function() {
		 		$('#side-menu').removeClass('animated slideOutLeft active');
		 	}, 500)
		});;
		// $("#side-menu, #overlay, #start-modal").removeClass("active");
		// e.preventDefault();
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
	$('.cta-desktop').on('click', function() {
		carousel.showPane(0);
		setTimeout(function() {
			$('#search-bar').trigger('focus');
		}, 500)
	})
	// $('#home-modal-close-link, #home-modal-submit-close-link').on("click", function(e) {
	// 	closeCtaAnimatedModal();
	// 	$('#start-modal').toggleClass('active');
	// 	e.preventDefault();
	// })

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

	$('#arrow-up').on("click", function(e) {
		// visibleDescription = $('#')
		visibleContentElem = $('.why-uguru-content:visible');
		visibleImageElem = $('.why-uguru-image:visible');
		allContentElems = $('.why-uguru-content')
		contentIndex = allContentElems.index(visibleContentElem);

		if (contentIndex <= 0) {
			visibleContentElem.addClass('animated shake')
			setTimeout(function() {
				visibleContentElem.removeClass('animated shake');
			}, 1000);
		} else {
			visibleContentElem.addClass('animated fadeOut');
			visibleImageElem.addClass('animated fadeOut');
			setTimeout(function() {
				visibleContentElem.removeClass('animated fadeOut');
				visibleImageElem.removeClass('animated fadeOut');
				visibleImageElem.hide()
				visibleContentElem.hide();
				$($('.why-uguru-content')[contentIndex - 1]).addClass('animated fadeIn show').show();
				$($('.why-uguru-image')[contentIndex - 1]).addClass('animated fadeIn show').show();
			}, 750)
		}
	});
	$('#arrow-down').on("click", function(e) {

		visibleContentElem = $('.why-uguru-content:visible');
		visibleImageElem = $('.why-uguru-image:visible');
		allContentElems = $('.why-uguru-content');
		contentIndex = allContentElems.index(visibleContentElem)
		if (contentIndex >= 7) {
			visibleContentElem.addClass('animated shake');
			setTimeout(function() {
				visibleContentElem.removeClass('animated shake');
			}, 1000);
		} else {
			visibleImageElem.addClass('animated fadeOut');
			visibleContentElem.addClass('animated fadeOut');
			setTimeout(function() {
				visibleContentElem.removeClass('animated fadeOut');
				visibleContentElem.hide();
				visibleImageElem.removeClass('animated fadeOut');
				visibleImageElem.hide()
				$($('.why-uguru-content')[contentIndex + 1]).addClass('animated fadeIn show').show();
				$($('.why-uguru-image')[contentIndex + 1]).addClass('animated fadeIn show').show();
			}, 750)

		}

	})
	$('.work-icon-link').on("click", function(e) {
		var descriptionToShow;
		sliderElem = document.querySelector('#slider-triangle');
		targetElem = this;

		var index = $('.work-icon-link').index(this) + 1;

		svgCircle = $(this).find('svg circle')[0]
		svgColor = $(svgCircle).css('fill');

		setTimeout(function() {
			sliderElemColor = $('#slider-triangle svg path').css('fill', svgColor);
		}, 500)

		$('.work-infograph').data('easyPieChart').options.barColor = svgColor;
		$('.work-infograph').data('easyPieChart').update(index * 25)

		var successCallback = function() {
			descriptionToShow = $(targetElem).attr('id') + '-content'
			previousWorkContent = $('.work-content:visible').addClass('animated fadeOut')
			setTimeout(function() {
				$(previousWorkContent).removeClass('animated fadeOut').hide()
				$('#' + descriptionToShow).addClass('animated fadeIn show').show();
			}, 750);
		}
		moveHorizontalSlider(sliderElem, targetElem, successCallback);
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

var checkForRedirectHashes = function() {
	currentHash = window.location.hash;
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
