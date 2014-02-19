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
      $(".btn-logout").show();
    });
    $("#skills-button").click(function() {
      $("#settings").hide();
      $(".btn-logout").hide();
      $("#profile").hide();
      $("#settings-button").removeClass('active');
      $("#profile-button").removeClass('active');
      $("#skills-button").addClass('active');
      $("#skills").show();      
    });
    $("#profile-button").click(function() {
      $("#settings").hide();
      $("#skills").hide();
      $(".btn-logout").hide();
      $("#skills-button").removeClass('active');
      $("#profile-button").removeClass('active');
      $("#profile-button").addClass('active');
      $("#profile").show();
    });

    $('#change-password-btn').click(function() {
      if ($('#change-password').is(":visible")) {
        $('#change-password').hide();
      } else {
        $('#change-password').show();
      }
    });

    $('#save-password-btn').click(function() {
      if (!$('input[name="old-pwd"]').val() || !$('input[name="new-pwd"]').val() || !$('input[name="confirm-pwd"]').val()) {
        $("#change-password-alert").text('Please fill in all fields');
        $("#change-password-alert").show();
      } else if ($('input[name="new-pwd"]').val() != $('input[name="confirm-pwd"]').val()) {
        $("#change-password-alert").text('New and confirm fields do not match.');
        $("#change-password-alert").show();
      } else {
        update_password_ajax($('input[name="old-pwd"]').val(), $('input[name="new-pwd"]').val())
      }
    });

    $('#add-skill-btn').click(function() {
      if ($('#add-skill-input-settings').val()) {
        $('.template-one-skill:first').clone().hide().attr('class', 'one-skill').appendTo('#current-skills');
        $('.one-skill:last .skill-name').text($('#add-skill-input-settings').val());
        $('.one-skill:last').show();
        $('#add-skill-input-settings').val('');
        $('.tt-hint').hide();
      }
    });

    $('#add-skill-input-settings').keyup(function(e){
    if ($('#add-skill-input-settings').val()) {
      if (e.keyCode == 13) {
        if ($('#add-skill-input-settings').val()) {
          $('.template-one-skill:first').clone().hide().attr('class', 'one-skill').appendTo('#current-skills');
          $('.one-skill:last .skill-name').text($('#add-skill-input-settings').val());
          $('.one-skill:last').show();
          $('#add-skill-input-settings').val('');
          $('.tt-hint').hide();
      }
      }
    }
  });

    $('#current-skills').on('click', '.boxclose', function(e){
      e.preventDefault();
      $(this).parent().parent().parent().remove();    
    })

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

    var update_password_ajax = function(old_password, new_password) {
        var data = {'old-pwd':old_password, 'new-pwd':new_password};
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/update-password/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {
              var response_dict = result.response
              if (response_dict['error']) {
                $("#change-password-alert").text(response_dict['error']);
                $("#change-password-alert").show();
              }
              if (response_dict['success']) {
                $('#change-password').hide();
                $('#saved-password').show();
                $('#saved-password').delay(750).fadeOut('slow');
              }
            }
        });  
    }

    // instantiate the bloodhound suggestion engine
    var numbers = new Bloodhound({
      datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 3,
      prefetch: {
        url: '/static/data/autocomplete.json',
        filter: function(list) {
          return $.map(list, function(course) { return { name: course }; });
        }
      },
      sorter: function compare(a,b) {
        if (a > b) {
          return 1;
        } 
        if (b < a) {
          return -1;
        }
        return 0 ;
      }
    });
     
    // initialize the bloodhound suggestion engine
    numbers.initialize();
     
    // instantiate the typeahead UI
    $('#skills .typeahead').typeahead(null, {
      displayKey: 'name',
      source: numbers.ttAdapter()
    });
});
