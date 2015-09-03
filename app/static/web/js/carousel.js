    /**
    * super simple carousel
    * animation between panes happens with css transitions
    */
    function Carousel(element)
    {
        var self = this;
        element = $(element);

        var container = $(">ul", element);
        var panes = $(">ul>li", element);
        var pane_width = 0;
        var pane_count = panes.length;

        var current_pane = 0;


        /**
         * initial
         */
        this.init = function() {
            setPaneDimensions();

            $(window).on("load resize orientationchange", function() {
                setPaneDimensions();
                //updateOffset();
            })
        };



        /**
         * set the pane dimensions and scale the container
         */
        function setPaneDimensions() {
            pane_width = element.width();
            panes.each(function() {
                $(this).width(pane_width);
            });
            container.width(pane_width*pane_count);
        };


        /**
         * show pane by index
         * @param   {Number}    index
         */
        this.showPane = function( index ) {
            // between the bounds

            //update the breadcrumb
            updateSchoolBanner(index);

            index = Math.max(0, Math.min(index, pane_count-1));
            current_pane = index;

            var offset = -((100/pane_count)*current_pane);
            onTransitionStartCarousel(index);
            setTimeout(function() {
                onTransitionCompleteCarousel(index);
            }, 500)
            setContainerOffset(offset, true);
        };


        function setContainerOffset(percent, animate) {
            container.removeClass("animate");

            if(animate) {
                container.addClass("animate");
            }

            if(Modernizr.csstransforms3d) {
                container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
            }
            else if(Modernizr.csstransforms) {
                container.css("transform", "translate("+ percent +"%,0)");
            }
            else {
                var px = ((pane_width*pane_count) / 100) * percent;
                container.css("left", px+"px");
            }
        }

        this.next = function() { return this.showPane(current_pane+1, true); };
        this.prev = function() { return this.showPane(current_pane-1, true); };



        function handleHammer(ev) {
            // console.log(ev);
            // disable browser scrolling
            // ev.gesture.preventDefault();

            switch(ev.type) {
                case 'drag':
                case 'dragdown':
                case 'dragup':
                case 'dragright':
                case 'dragleft':
                    // stick to the finger
                    var pane_offset = -(100/pane_count)*current_pane;
                    var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                    // slow down at the first and last pane
                    if((current_pane == 0 && ev.gesture.direction == Hammer.DIRECTION_RIGHT) ||
                        (current_pane == pane_count-1 && ev.gesture.direction == Hammer.DIRECTION_LEFT)) {
                        drag_offset *= .4;
                    }

                    if((current_pane == 0 && ev.gesture.direction == Hammer.DIRECTION_DOWN) ||
                        (current_pane == pane_count-1 && ev.gesture.direction == Hammer.DIRECTION_UP)) {
                        drag_offset *= .4;
                    }

                    setContainerOffset(drag_offset + pane_offset);
                    break;

                case 'swipe':
                case 'swipeleft':
                    self.next();
                    ev.gesture.stopDetect();
                    break;

                case 'swipeup':
                case 'swiperight':
                    self.prev();
                    ev.gesture.stopDetect();
                    break;

                case 'release':
                    // more then 50% moved, navigate
                    if ((Math.abs(ev.gesture.deltaX) > pane_width/5) ||
                        (Math.abs(ev.gesture.deltaY) > pane_width/5)) {
                        if(ev.gesture.direction == 'right' || ev.gesture.direction =='up') {
                            self.prev();
                        } else {
                            self.next();
                        }
                    }
                    // else {
                    //     self.showPane(current_pane, true);
                    // }
                    break;
            }
        }

        element.hammer({ drag_lock_to_axis: true })
            .on("release dragleft dragright dragup dragdown swipeleft mouseleft mouseright swiperight", handleHammer);
    }


    var carousel = new Carousel("#main");
    carousel.init();


    $('#slide-breadcrumbs li a').on('click', function() {
        $('#slide-breadcrumbs li a').removeClass('active');
        $(this).addClass('active');
        indexClicked = $('#slide-breadcrumbs li a').index(this);
        carousel.showPane(indexClicked);
    });

    $('#menu-home-links-container .menu-home-link').on('click', function() {
        $('.top-link-close').trigger('click');
        indexClicked = $('#menu-home-links-container .menu-home-link').index(this);
        setTimeout(function() {
            checkForRedirectHashes(indexClicked);
        }, 200)
        carousel.showPane(indexClicked);
    });

    //handles all the scroll shifts
    $('html').on('mousewheel', function (e) {
        console.log('mousewheel');
        var delta = e.originalEvent.wheelDelta;

        currentIndex = $('#slide-breadcrumbs li a').index($('#slide-breadcrumbs li a.active'));

        //if mousewheel is going left
        if (delta > 50 && !carouselShowPaneLock) {
            console.log("mousewheel left");
            $('.carousel li').removeClass('active');
            carouselShowPaneLock = true;
            carousel.showPane(currentIndex - 1);
            setTimeout(function() {
                carouselShowPaneLock = null;
            }, 500)
        }
        //if mousewheel is going right
        else if (delta < -50 && !carouselShowPaneLock) {
            console.log("mousewheel right");
            $('.carousel li').removeClass('active');

            carouselShowPaneLock = true;
            carousel.showPane(currentIndex + 1);
            setTimeout(function() {
                carouselShowPaneLock = 0;
            }, 500)
        }
        e.preventDefault();
    });


    //handles left and right arrow keys
    $(document).on('keydown', function (e) {

        console.log('arrows');

        currentIndex = $('#slide-breadcrumbs li a').index($('#slide-breadcrumbs li a.active'));

        //if left arrow is pressed
        if (e.which === 37) {
            console.log("left");
            $('.carousel li').removeClass('active');
            carouselShowPaneLock = true;
            carousel.showPane(currentIndex - 1);
            setTimeout(function() {
                carouselShowPaneLock = null;
            }, 500)
        }
        //if right arrow is pressed
        else if (e.which === 39) {
            console.log("right");
            $('.carousel li').removeClass('active');

            carouselShowPaneLock = true;
            carousel.showPane(currentIndex + 1);
            setTimeout(function() {
                carouselShowPaneLock = 0;
            }, 500)
        }
        // e.preventDefault();
    });

var updateSchoolBanner = function(index) {
    $('#slide-breadcrumbs li a').removeClass('active');
    $($('#slide-breadcrumbs li a')[index]).addClass('active');
    if (index >= 1) {
        $('#top').css('z-index', 11);
        $('#top-school-banner').hide();
        if (index === 1) {
            $('#top-mobile-logo').css('opacity', 1);
            $('#top-mobile-logo').addClass('animated bouceInDown');
            setTimeout(function() {
                $('#top-mobile-logo').removeClass('animated bounceInDown');
            }, 1500)
        }

    } else {
        $('#slide-breadcrumbs li a').removeClass('active');
        $($('#slide-breadcrumbs li a')[0]).addClass('active');

        $('#top').css('z-index', 5);
        $('#top-school-banner').show();
        $('#top-mobile-logo').css('opacity', 0);
    }
}

var onTransitionStartCarousel = function(index) {
    if (index === 0) {
        $('#top-school-banner').css('opacity', 1);
    }
    if (index === 1) {

    }
    if (index === 2) {
         currentProgress = parseInt($('.work-infograph')[0].getAttribute('data-percent'));

         if (!currentProgress) {
             $('.work-infograph').data('easyPieChart').update(25);
             countupElement('work-wage-animation', 0, 60, 5);
         }
    }
    if (index === 3) {
    }
}

var onTransitionCompleteCarousel = function(index) {
    if (index === 0) {
        //insert search-pane post transition (500ms after)
    }
    if (index === 1) {
        //insert earn-pane post transition (500ms after)
    }
    if (index === 2) {
        //insert work-pane post transition (500ms after)
        //insert work-pane post transition (500ms after)
    }
    if (index === 3) {
        console.log(index, 'finished transition to three');
    }
    if (index === 4) {
        console.log(index, 'finished transition to four');
    }
    if (index === 5) {
        console.log(index, 'finished transition to five');
    }
    if (index >= 1) {
        $('#top-logo #top-mobile-logo').css('opacity', 1);
        $('#top-school-banner').css('opacity', 0);
    }
}