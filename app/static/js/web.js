// jQuery Shit
$(document).ready(function() {
    console.log("document ready() in web.js");
    updateAllBars();
    window.addEventListener('push', function(){
        updateAllBars();
    });
    
    //Logout link
    //TODO: Make this a PUSH EVENT
    $('body').on('touchstart', '#logout-link', function(){
        window.location.replace('/m/logout/');
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
            
            }
        });
    });

    // Guru upload photo link
    $('body').on('touchstart', '#upload-photo-link', function(e) {
      e.preventDefault();
      $('#upload-photo').trigger('click');
    });


    $('body').on('change', '#upload-photo', function(){
      var file = this.files[0];
      //TODO Cam: Can we validate this properly?
      if (file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
        alert("File doesnt match png, jpg, or gif");
      } else {
        readURL(this);
        var formData = new FormData();
        formData.append('file', file);
        $.ajax({
          url:'/update-profile/',
          type: 'POST',
          data: formData,
          cache: false,
          contentType: false,
          processData: false
        });
      }
    });

    $('body').on('touchstart', '#profile-title-bar-icon', function(){
        window.PUSH({
            transition : "slide-in",
            url : "/profile/"
        });
    });

    // Request Form /request_form/
    $('body').on('touchstart', '#request-location-in-person', function(){
        $('#request-location').show(10);
    });
    $('body').on('touchstart', '#request-location-online', function(){
       $('#request-location').hide(10);
    });
    $('body').on('touchend', '#asap-toggle', function(){
        var isSelected = !$('#asap-toggle').hasClass('active');
        if (isSelected) {
            $('#request-time-selection-cell').hide(10);
        }else{
            $('#request-time-selection-cell').show(10);
        }
    });
    $('body').on('touchstart', '#time-segment-1', function(){
        $('#request-estimated-cost').text("$5");
    });
    $('body').on('touchstart', '#time-segment-2', function(){
        $('#request-estimated-cost').text("$10");
    });
    $('body').on('touchstart', '#time-segment-3', function(){
        $('#request-estimated-cost').text("$20");
    });
    $('body').on('touchstart', '#time-segment-4', function(){
        $('#request-estimated-cost').text("$40");
    });

    $('body').on('touchstart', '#submit-button', function () {
        $('#submit-button').hide();
        $('#confirm-button').show();
    });

    //Student creates a request
    $('body').on('touchstart', '#confirm-button', function(){
        payload = JSON.stringify({
            'skill_name': $('#request-course').val(),
            'description': $('#request-description').val(),
            'phone_number': $('#request-phone-number').val(),
            'remote': $('#request-location-online').hasClass('active'),
            'location': $('#request-location').val(),
            'urgency': $('#asap-toggle').hasClass('active'),
            'time_estimate': $('#request-time-estimate-button-group .control-item.active').index(), // TODO : this should be in minutes, not just the index
            'start_time': (new Date().getTime()).toString(), // TODO : Get start time from the selector on the page
        });

        $.ajax({
            url: '/api/v1/requests',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                if (request.errors) {
                    console.log(request.errors);
                    if (request.redirect && request.redirect == 'no-tutors') {
                        window.PUSH({
                            transition : "fade",
                            url : "/show/no-tutors/"
                        });
                    }
                    // If errors, reset
                    $('#submit-button').show();
                    $('#confirm-button').hide();
                }
                else {
                    window.PUSH({
                        transition : "fade",
                        url : "/request/" + request['server_id'] +'/'
                    });
                }
            },
            error: function (request) {
                // If errors, reset
                $('#submit-button').show();
                $('#confirm-button').hide();
                alert(request.responseJSON['errors']);
            }
        });
    });
});
// end document ready

function updateAllBars() {
    updateMainTabBar();
    updateMessageFooter();
}

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



// Grab incoming photo inject it into page 
// while s3 is uploading the photo
function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#upload-photo-link').hide();
          $('#guru-profile-photo').show();
          $('#guru-profile-photo').css('background', '(url' + e.target.result + ')');
        };

        reader.readAsDataURL(input.files[0]);
      }
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