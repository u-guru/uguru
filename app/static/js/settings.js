$(document).ready(function() {
    $('#email-on').click(function(){
        $('#email-on-span').attr('class','btn-toggle-on');
        $('#email-off-span').attr('class','btn-toggle-off');
        $('#saved-email').show();
        $('#saved-email').delay(750).fadeOut('slow');
        send_notification_ajax('email', true)
    });
    $('#email-off').click(function(){
        $('#email-on-span').attr('class','btn-toggle-on-inactive');
        $('#email-off-span').attr('class','btn-toggle-off-active');
        $('#saved-email').show();
        $('#saved-email').delay(750).fadeOut('slow');
        send_notification_ajax('email', false)
    });
    $('#text-off').click(function(){
        $('#text-on-span').attr('class','btn-toggle-on-inactive');
        $('#text-off-span').attr('class','btn-toggle-off-active');
        $('#saved-text').show();
        $('#saved-text').delay(750).fadeOut('slow');
        send_notification_ajax('text', false)
    });
    $('#text-on').click(function(){
        $('#text-on-span').attr('class','btn-toggle-on');
        $('#text-off-span').attr('class','btn-toggle-off');
        $('#saved-text').show();
        $('#saved-text').delay(750).fadeOut('slow');
        send_notification_ajax('text', true)
    });

    $("#settings-button").click(function() {
      $("#skills").hide();
      $("#profile").hide();
      $("#skills-button").removeClass('active');
      $("#profile-button").removeClass('active');
      $("#settings-button").addClass('active');
      $("#settings").show();
      
    });
    $("#skills-button").click(function() {
      $("#settings").hide();
      $("#profile").hide();
      $("#settings-button").removeClass('active');
      $("#profile-button").removeClass('active');
      $("#skills-button").addClass('active');
      $("#skills").show();      
    });
    $("#profile-button").click(function() {
      $("#settings").hide();
      $("#skills").hide();
      $("#skills-button").removeClass('active');
      $("#profile-button").removeClass('active');
      $("#profile-button").addClass('active');
      $("#profile").show();
    });

    var send_notification_ajax = function(email_or_text, value) {
        var data = {};
        if (email_or_text == 'email') {
            data['email'] = value;
        } else {
            data['text'] = value;
        }
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/notification-settings/' ,
            data: JSON.stringify(data),
            dataType: "json"
        });  
    }
});
