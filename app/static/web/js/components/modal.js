$(document).ready(function () {

    $('#search-results-close-link, #home-modal-close-link').on('click', function() {

        $('.search-results').addClass('animated zoomOut').hide();
        setTimeout(function() {
            $('.search-results').removeClass('animated zoomOut');
            hideUniversityModalShowSearchBox();
        }, 500);
    })

    $("#become-guru-cta-button").on('click', function() {
        $('.search-results .front').trigger('click');
    });

    $('.cta-email-link').click(function() {
        $('.mail-icon').addClass('active');
        $('.phone-icon').removeClass('active');
        $('.phone-cta-wrapper').removeClass('active');
        $('.email-cta-wrapper').addClass('active');
        $('#submit-info-button').removeClass('active validated');
    })

    $('.cta-phone-link').click(function() {
        $('.phone-icon').addClass('active');
        $('.mail-icon').removeClass('active');
        $('.phone-cta-wrapper').addClass('active');
        $('.email-cta-wrapper').removeClass('active');
        $('#submit-info-button').removeClass('active validated');
    })

    $(".download-link-wrapper").on('click', function(e) {
        e.preventDefault();
    })

    $('#submit-info-button').on('click', function(e) {
        if ($(this).hasClass('active validated')) {
            $('#school-email-input, #school-phone-input').unbind('keyup');
            $('.email-cta-wrapper, .phone-cta-wrapper').children().removeClass('active');
            $('#submit-info-button').removeClass('active');
            var emailCTAHeight = $('.email-cta-wrapper').height();
            var phoneCTAHeight = $('.phone-cta-wrapper').height();
            $('.email-cta-wrapper').css('height', emailCTAHeight+'px');
            $('.phone-cta-wrapper').css('height', phoneCTAHeight+'px');
            $('.email-cta-wrapper').children().hide();
            $('.phone-cta-wrapper').children().hide();
            $('#submit-info-loader').addClass('active');
            sendReminderToUser();
        }
    });

    $("#school-email-input").on('focus', function() {
        $('.search-results .front, .search-results').unbind('click');
        $("#school-email-input-label").addClass('active');
    })

    $("#school-phone-input").on('focus', function() {
        $('.search-results .front, .search-results').unbind('click');
        $("#school-phone-input-label").addClass('active');
    })

    $("#school-email-input").on('blur', function() {
        if (!$(this).val().length) {
            $('.search-results .front, .search-results').bind('click');
            $("#school-email-input-label").removeClass('active');
        }
    })

    $('#school-email-input').on('keyup', function(e) {
        // if input is focused && no input
        if (!$(this).val().length) {
            $('#submit-info-button').removeClass('active');
        }

        // if input has focus && letter is typed
        if ($(this).val().length && !$('#submit-info-button').hasClass('active')) {
            $('#submit-info-button').addClass('active');
        }

        if (validateEmail($(this).val())) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13'){
                $('#submit-info-button').trigger('click');
            } else {

                $('#submit-info-button').addClass('validated');
                $('#submit-info-button .ion-checkmark, #submit-info-button .submit-text').addClass('animated tada');
                setTimeout(function() {
                    $('#submit-info-button .ion-checkmark, #submit-info-button .submit-text').removeClass('animated tada');

                }, 500);

            }

        } else {
            $('#submit-info-button').removeClass('validated')
        }

    })

    $('#school-phone-input').on('keyup', function(e) {
        // if input is focused && no input
        if (!$(this).val().length) {
            $('#submit-info-button').removeClass('active');
        }

        // if input has focus && letter is typed
        if ($(this).val().length && !$('#submit-info-button').hasClass('active')) {
            $('#submit-info-button').addClass('active');
        }

        if (isPhoneNumberValid($(this).val())) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13'){
                $('#submit-info-button').trigger('click');
            } else {

                $('#submit-info-button').addClass('validated');
                $('#submit-info-button .ion-checkmark, #submit-info-button .submit-text').addClass('animated tada');
                setTimeout(function() {
                    $('#submit-info-button .ion-checkmark, #submit-info-button .submit-text').removeClass('animated tada');

                }, 500);

            }

        } else {
            $('#submit-info-button').removeClass('validated')
        }

    })

    $("#school-phone-input").on('blur', function() {
        if (!$(this).val().length) {
            $('.search-results .front, .search-results').bind('click');
            $("#school-phone-input-label").removeClass('active');
        }
    })

});

var sendReminderToUser = function() {
    payload = {
        phone_number: $('#school-phone-input').val(),
        email: $('#school-email-input').val()
    }
    url = "/api/v1/web/home/subscribe"
    var successCallback = function(resp) {
        $('#post-submit-info-wrapper .message-content').text('Thanks! We sent you an email.')
        setTimeout(function() {
            $('#submit-info-loader').removeClass('active');
            $('#post-submit-info-wrapper').addClass('active');
        }, 1000)

    }

    var failureCallback = function(err) {
        if (err.status === 422) {
            console.log('invalid phone number - please try again');
        }
        $('#post-submit-info-wrapper .message-content').text('Thanks! We sent you a text.')
        setTimeout(function() {
            $('#submit-info-loader').removeClass('active');
            $('#post-submit-info-wrapper').addClass('active');
        }, 1000)
    }

    ajaxPostJSON(url, payload, successCallback, failureCallback);

}

function ajaxPostJSON(url, payload, success_cb, failure_cb) {


    $.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        contentType:'application/json',
        data: JSON.stringify(payload),
        success: function(resp){
          if (success_cb) {
            success_cb(resp);
          }
          console.log('SUCCESS:', resp);
        },
        error: function(err){
          console.log('ERROR:',err);
          if (failure_cb) {
            failure_cb(err);
          }
        }
      });
}