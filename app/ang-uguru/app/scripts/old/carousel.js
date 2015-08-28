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
            $('#slide-breadcrumbs li a').removeClass('active');
            $($('#slide-breadcrumbs li a')[index]).addClass('active');
            if (index >= 1) {
                $('#top').css('z-index', 11);
                $('#top-school-banner').hide();
                if (index === 1) {
                    $('#top-mobile-logo').css('opacity', 1);
                    $('#top-mobile-logo').addClass('animated flipInY');
                    setTimeout(function() {
                        $('#top-mobile-logo').removeClass('animated flipInY');
                    }, 1500)
                }

            } else {
                $('#slide-breadcrumbs li a').removeClass('active');
                $($('#slide-breadcrumbs li a')[0]).addClass('active');

                $('#top').css('z-index', 5);
                $('#top-school-banner').show();
                $('#top-mobile-logo').css('opacity', 0);
            }

            index = Math.max(0, Math.min(index, pane_count-1));
            current_pane = index;

            var offset = -((100/pane_count)*current_pane);
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
                    else {
                        self.showPane(current_pane, true);
                    }
                    break;
            }
        }

        // element.hammer({ drag_lock_to_axis: true })
        //     .on("release dragleft dragright dragup dragdown swipeleft mouseleft mouseright swiperight", handleHammer);
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
        indexClicked = $('#menu-home-links-container .menu-home-link').index(this);
        carousel.showPane(indexClicked);
    });

    //handles all the scroll shifts
    $('html').on('mousewheel', function (e) {
        var delta = e.originalEvent.wheelDelta;

        currentIndex = $('#slide-breadcrumbs li a').index($('#slide-breadcrumbs li a.active'));

        //if mousewheel is going left
        if (delta > 50 && !carouselShowPaneLock) {
            $('.carousel li').removeClass('active');
            carouselShowPaneLock = true;
            carousel.showPane(currentIndex - 1);
            setTimeout(function() {
                carouselShowPaneLock = null;
            }, 500)
        }
        //if mousewheel is going left
        else if (delta < -50 && !carouselShowPaneLock) {
            $('.carousel li').removeClass('active');

            carouselShowPaneLock = true;
            carousel.showPane(currentIndex + 1);
            setTimeout(function() {
                carouselShowPaneLock = 0;
            }, 500)
        }
        e.preventDefault();
    });
