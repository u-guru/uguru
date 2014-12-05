// jQuery Shit
$(document).ready(function() {
    updateAllBars();
    
    window.addEventListener('push', function(){
        updateAllBars();
    });
    
    //Logout link
    //TODO: Make this a PUSH EVENT
    $('body').on('touchstart', '#logout-link', function(){
        window.location.replace('/m/logout/');
    });


    // Login Page
    $('body').on('touchstart', '#login-link', function(){

        payload = JSON.stringify({
            email:$('#login-form #email-field').val(),
            password:$('#login-form #password-field').val()
        });
        $.ajax({
            url: '/api/v1/login',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "slide-in",
                    url : "/home/"
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    //Student cancels a request

    $('body').on('touchstart', '#cancel-link', function() {
        var request_id = ($('#cancel-link').data().requestId).toString();
        
        payload = JSON.stringify({
            action:'cancel',
            description:$('#cancel-request-description').val()
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/home/"
                });
                $('#cancelModal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', '#guru-accept-link', function() {
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];
        
        payload = JSON.stringify({
            action:'guru-accept',
            description:$('#guru-accept-description').val()
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/m/guru/"
                });
                $('#cancelModal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', 'a.guru-reject-link', function() {
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];
        
        payload = JSON.stringify({
            action:'guru-reject',
            description:$('#guru-reject-description').val()
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/m/guru/"
                });
                $('#reject-request-modal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', '#student-reject-guru-link', function() {
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];
        
        payload = JSON.stringify({
            action:'student-reject',
            description:$('#student-reject-guru-description').val()
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/request/" + request_id + '/'
                });
                $('#student-reject-tutor-modal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', '.guru-confirm-session', function() {
        
        var request_id = ($(this).data().requestId).toString();
        var num_hours = parseInt($('#confirm-hours-' + request_id).val(), 10);
        var num_minutes = parseInt($('#confirm-minutes-' + request_id).val(), 10);

        payload = JSON.stringify({
            action:'guru-confirm',
            minutes: num_minutes,
            hours: num_hours
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/m/guru/"
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    //Student accepts a guru
    $('body').on('touchstart', '#student-accept-guru-link', function() {
        
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];

        payload = JSON.stringify({
            action:'student-accept',
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/home/"
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    //Send Message
    $('body').on('touchstart', '#send-message-link', function() {
        
        var convo_id = ($('#message-content-div').data().convoId).toString();
        var user_id = ($('#message-content-div').data().userId).toString();

        post_url = '/api/v1/users/' + user_id + '/conversations/' +
            convo_id + '/messages';

        payload = JSON.stringify({
            contents: $('#message-contents').val()
        });

        $.ajax({
            url: post_url,
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/guru/conversation/" + convo_id
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    //Student creates a request
    $('body').on('touchstart', '#submit-request-link', function(){
        payload = JSON.stringify({
            'skill_name': 'CS10',
            'description': $('#request-description').val(),
            'time_estimate': $('#time-estimate-button-group button.active').index(),
            'phone_number': $('#request-phone').val(),
            'location': $('#request-location').val(),
            'remote': $('#remote-toggle').hasClass('active'),
            'urgency': $('#asap-toggle').hasClass('active'),
            'start_time': (new Date().getTime()).toString(),
        });

        $.ajax({
            url: '/api/v1/requests',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                if (request.errors && request.redirect) {
                    if (request.redirect == 'no-tutors') {
                        window.PUSH({
                            transition : "fade",
                            url : "/show/no-tutors/"
                        });
                    }
                }
                else {
                    window.PUSH({
                        transition : "fade",
                        url : "/request/" + request['server_id'] +'/'
                    });
                }

                //Close modal
                $('#requestModal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    // Signup Page Form
    $('body').on('touchstart', '#signup-link', function(){
        payload = JSON.stringify({
            name     : $('#signup-form #name-field').val(),
            email    : $('#signup-form #email-field').val(),
            password : $('#signup-form #password-field').val()
        });

        $.ajax({
            url: '/api/v1/signup',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "slide-in",
                    url : "/home/"
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', '#add-card-link', function(){
        if (!$('input#card-num').val() || !$('input#exp-date').val()) {
            alert('Please enter all fields');
            return;
        }
        card_number  = $('input#card-num').val();
        expiration_date = $('input#exp-date').val();
        month = parseInt(expiration_date.split('/')[0], 10);
        year = parseInt(expiration_date.split('/')[1], 10);

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
        }, stripeAddCreditCardHandler);

    });

    $('body').on('touchstart', '#negative-guru-request-btn', function() {
        alert('Sorry! Only one request at a time. Once you are connected with a Guru, you can make another one!');
    });

    //Ratings
    $('body').on('touchstart', 'a.rating-star', function () {
        var index = $(this).index('a.rating-star');
        //Entire ratings plugin implemented in the two lines below
        $( ".guru-rating-star" ).slice(0, index + 1).removeClass('icon-star').addClass('icon-star-filled');
        $( ".guru-rating-star" ).slice(index + 1, $('.guru-rating-star').length).removeClass('icon-star-filled').addClass('icon-star');

        var rating_id = ($('#submit-rating-container').data().ratingId).toString();

        payload = JSON.stringify({
            rating: (index + 1)
        });

        $.ajax({
            url: '/api/v1/ratings/' + rating_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "slide-in",
                    url : "/home/"
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });
});
// end document ready

function updateMainTabBar(){
    if ($('.should-hide-tab-bar').length > 0) {
        $('#main-bar-tab').hide();
    }else{
        $('#main-bar-tab').show();
    }
}

function updateMessageFooter(){
    if ($('.should-hide-message-bar').length > 0) {
        $('#footer-message-bar').hide();
    }else{
        $('#footer-message-bar').show();
    }
}

function updateAllBars() {
    updateMainTabBar();
    updateMessageFooter();
}

function stripeAddCreditCardHandler(status, response) {

    if (response.error) {
            // Show the errors on the form    
            alert(response.error.message);
            return;
        } else {
            var token = response.id;
            var data = {'add_card':token};
            var user_id = ($('#add-card-link').data().userId).toString();
            $.ajax({
                type: "PUT",
                contentType: 'application/json;charset=UTF-8',
                url: '/api/v1/users/' +  user_id,
                data: JSON.stringify(data),
                dataType: "json",
                success: function(request){

                    url_components = window.location.pathname.split( '/' );
                    request_id = url_components[url_components.length - 2];

                    window.PUSH({
                        transition : "fade",
                        url : "/confirm_request/" + request_id + '/'
                    });
                    $('#add-card-modal').removeClass('active');
                    return;
                },
                error: function (request) {
                    alert(request.responseJSON['errors']);
                }
            });
        }
    }