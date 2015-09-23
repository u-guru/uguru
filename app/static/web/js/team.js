$(document).ready(function() {

    $('.launch-profile-link').on('click', function(e){
        indexProfileMember = $('.launch-profile-link').index(this);
        elemProfileContainer = $('.team-profile')[indexProfileMember];
        elemProfileReadMoreLink = this;


        closeCtaAnimatedModal = cta(
            elemProfileReadMoreLink, // Arg #1 element where to transition from
            elemProfileContainer, // Arg #2 what to transition into
            {            // Arg #3 options
                duration:0.3, // duration of animation
                targetShowDuration:0, //duration for target element to become visible, if hidden initially
                relativeToWindow:true //set to true if your target element is relative & position w.r.t window
            },
            function()   // Arg #4 (OPTIONAL) callbacks
                {
                    $(elemProfileContainer).show();
                    setTimeout(function(){
                        $('#overlay').css({'opacity':1, 'background':'rgba(43, 50, 52, 0.8);'});
                    }, 300)

                    //escape key clicked
                    $('#team').keyup(function(e) {
                        if (e.keyCode == 27) {
                            $('#overlay').trigger('click');
                        }
                    })

                    $('#overlay').on('click', function() {
                        $('#overlay').css('opacity', 0);
                        $('#overlay').unbind("click");
                        setTimeout(function() {
                            $('.team-profile:visible').hide();
                        }, 100)
                        closeCtaAnimatedModal();
                    })
                    // setTimeout(function() {
                    //  $("#overlay").toggleClass("active");
                    // },100) //seconds afterwards

                }
        );


    })

});