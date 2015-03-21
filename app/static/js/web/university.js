

//jquery shiz
$(document).ready(function() {
    $('.go-to-call-action').click(function() {
        $(document.body).animate({
            'scrollTop':   $('#get-started-university').offset().top
        }, 2000, function() {console.log('action to go here')})
    } );

    $('#submit-university-email').click(function() {
        var email_string = $('#university-email-input').val();
        sendEmailToServer(email_string);
    })
});

var sendEmailToServer = function(email_text)  {

    $.ajax({

        url: "/api/v1/user_emails",
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify({email_address: email_text}),
        success: function(request){
            $('#get-started-university').hide();
            $('#post-started-university').show();
        },
        error: function (request) {
            alert('Incorrect username or password, please try again');
        }

    });
}