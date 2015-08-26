$(document).ready(function () {
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
            // setTimeout(function() {
            //     $('#modal-loader-container').toggleClass('active');
            //     $('#modal-content-submit').toggleClass('active');
            // }, 1500)
            sendReminderToUser(true, phoneNumberInputValue);

    });
});

var sendReminderToUser = function(is_text, value) {
    if (is_text) {
        payload = {phone_number: value}
    } else {
        payload = {email: value}
    }

    url = "/api/v1/web/home/subscribe"
    var successCallback = function(resp) {
        alert('was successful');
        $('#modal-loader-container').toggleClass('active');
        $('#modal-content-submit').toggleClass('active');
    }

    var failureCallback = function(err) {
        if (err.status === 422) {
            alert('invalid phone number - please try again');
        }
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