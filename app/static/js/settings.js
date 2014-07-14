var autocomplete_json = [];

var update_feed = function() {
  if (!$('#default-photo').is(':visible') && $('#short-description').val() && $('#major-input').val()) {
    $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/notif-update/' ,
            data: JSON.stringify({'update-total-settings':true}),
            dataType: "json",
      }); 
    $('#settings-notif').hide()
    }
  }

$(document).ready(function() {
    update_feed();

    function readJSON(file) {
      var request = new XMLHttpRequest();
      request.open('GET', file, false);
      request.send(null);
      if (request.status == 200)
          return request.responseText;
    };

    autocomplete_json = JSON.parse(readJSON('/static/data/autocomplete.json'));
    
    $('#upload-photo-link').on('click', function(e) {
      e.preventDefault();
      $("#upload-photo:hidden").trigger('click');
    });

    $('#logout-btn').click(function() {
      window.location.replace('/logout/');
    });

    $('#account-profile-link').click(function() {
      hide_all_settings();
      $('#profile').show();
    });

    $('#account-settings-link').click(function() {
      hide_all_settings();
      $('#settings').show();
    });

    $('#account-billing-link').click(function() {
      hide_all_settings();
      $('#billing').show();
    });

    function hide_all_settings() {
      $('#settings').hide();
      $('#profile').hide();
      $('#billing').hide();
      $('#support').hide();
    };

      $('#example-skills').on('click', 'a.example-skill-link', function(e) {
        var tag_arr = ['previous', 'slc','hkn', 'res', 'ta', 'la'];
        if ($(this).children(':first').hasClass('active')){
          $(this).children(':first').removeClass('active');
          send_profile_update_ajax(tag_arr[$(this).index()], false);
        } 
        else {
          $(this).children(':first').addClass('active');
          send_profile_update_ajax(tag_arr[$(this).index()], true);
        }
        $('#saved-tag').show();
        $('#saved-tag').delay(750).fadeOut('slow');
      });

    $("#upload-photo:hidden").change(function(){
        var file = this.files[0]
        name = file.name; 
        size = file.size;
        type = file.type;
        // if (file.size > 100000) {
        //   alert("File is too big")
        // } else
        if (file.type != 'image/png' && file.type != 'image/jpg' && !file.type != 'image/gif' && file.type != 'image/jpeg' ) {
          alert("File doesnt match png, jpg, or gif");
        } else {
          $('#settings-notif').hide();
          $('#student-photo-alert').hide();
          if ($('#short-description').val() && $('#major-input')) {
            $('#prof-not-complete').hide();
          }
          readURL(this);
          var formData = new FormData()
          formData.append('file', file)
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
  
    var verify_tutor = function() {
      var data = {'verify-tutor':true};
        $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/validation/' ,
          data: JSON.stringify(data),
          dataType: "json",
        });
    };

    $('#launch-profile-link').click(function() {
        var data = {'verify-tutor':true};
        $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/validation/' ,
          data: JSON.stringify(data),
          dataType: "json",
          success: function() {
            window.location.replace('/activity/');
          }
        });
    });

    $('#short-description').focus(function() {
      $('#profile-save-button').show();
    });

    $('#major-input').focus(function() {
      $('#save-btn-major').show();
    })

    $('#save-btn-major').click(function() {
      if (!$('#major-input').val()) {
        $('#alert-major-text').show();
      } else {
        if (!$('#default-photo').is(':visible') && $('#short-description').val()) {
            $('#prof-not-complete').hide()
        }
        $('#save-btn-major').hide();
        $('#saved-major').show();
        $('#saved-major').delay(750).fadeOut('slow');
        $('#major-input').css('border','1px solid grey');
        var major_text = $('#major-input').val();
        send_profile_update_ajax('major', major_text);
      }
    })

    $('#profile-save-button').click(function(){
      if (!$('#short-description').val().trim()) {
        $('#alert-rating-short-description').show()
      } else {
        $('#alert-rating-short-description').hide();
        $('#profile-save-button').hide();
        $('#short-description').css('border', '1px solid grey');
        $('#saved-introduction').show();
        $('#saved-introduction').delay(750).fadeOut('slow');
        if (!$('#default-photo').is(':visible') && $('#major-input').val()) {
            $('#prof-not-complete').hide()
        }
        send_profile_update_ajax('intro', $('#short-description').val())
      }
    });
    $('#discover-on').click(function(){
        $('#discover-on-span').attr('class','btn-toggle-on');
        $('#discover-off-span').attr('class','btn-toggle-off');
        $('#discover-label').text('ACTIVE');
        $('#saved-discover').show();
        $('#saved-discover').delay(750).fadeOut('slow');
        send_profile_update_ajax('discover', true)
    });
    $('#discover-off').click(function(){
        $('#discover-on-span').attr('class','btn-toggle-on-inactive');
        $('#discover-off-span').attr('class','btn-toggle-off-active');
        $('#discover-label').text('INACTIVE');
        $('#saved-discover').show();
        $('#saved-discover').delay(750).fadeOut('slow');
        send_profile_update_ajax('discover', false)
    });
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
    $('#support-button').click(function() {
      $("#skills").hide();
      $("#profile").hide();
      $("#settings").hide();
      $("#skills-button").removeClass('active');
      $("#profile-button").removeClass('active');
      $("#settings-button").removeClass('active');
      $("#support-section").show();
      $(".btn-logout").hide();
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
      $("#settings-button").removeClass('active');
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
        var skill_name = $('#add-skill-input-settings').val();
        if (autocomplete_json.indexOf(skill_name) == -1) {
            alert('Please only add things from the available options.');
            $('#add-skill-input-settings').val('');
        } else {
          $('.template-one-skill:first').clone().hide().attr('class', 'one-skill').appendTo('#current-skills');
          $('.one-skill:last .skill-name').text($('#add-skill-input-settings').val());
          $('.one-skill:last').show();
          $('#add-skill-input-settings').val('');
          $('.tt-hint').hide();
          update_skill_ajax('add',skill_name);
        }
      }
    });

    $('#add-skill-input-settings').keyup(function(e){
        if ($('#add-skill-input-settings').val()) {
          if (e.keyCode == 13) {
            if ($('#add-skill-input-settings').val()) {
              var skill_name = $('#add-skill-input-settings').val();
              if (autocomplete_json.indexOf(skill_name) == -1) {
                alert('Please only add things from the available options.');
                $('#add-skill-input-settings').val('');
              } else {
                $('.template-one-skill:first').clone().hide().attr('class', 'skill-tag').appendTo('#register-skills');
                $('.skill-tag:last .skill-tag-text').text($('#add-skill-input-settings').val());
                $('.skill-tag:last').show();
                $('#add-skill-input-settings').val('');
                $('.tt-hint').hide();
                $('#my-skills').show();
                $('#tutor-register-div').show();
                update_skill_ajax('add',skill_name);
              }
            }
          }
          if (e.keyCode == 188) {
            if ($('#add-skill-input-settings').val()) {
              var skill_name = $('#add-skill-input-settings').val().replace(',', '');
              if (autocomplete_json.indexOf(skill_name) == -1) {
                alert('Please only add things from the available options.');
                $('#add-skill-input-settings').val('');
              } else {
                $('.template-one-skill:first').clone().hide().attr('class', 'skill-tag').appendTo('#register-skills');
                $('.skill-tag:last .skill-tag-text').text(skill_name);
                $('.skill-tag:last').show();
                $('#add-skill-input-settings').val('');
                $('#my-skills').show();
                $('#tutor-register-div').show();
                update_skill_ajax('add',skill_name);
              } 
            }
          }
        }
    });

    $('#add-skill-apply-btn').click(function() {
      if ($('#add-skill-input-settings').val()) {
        var skill_name = $('#add-skill-input-settings').val();
        if (autocomplete_json.indexOf(skill_name) == -1) {
            alert('Please only add things from the available options.');
            $('#add-skill-input-settings').val('');
        } else {
          $('.template-one-skill:first').clone().hide().attr('class', 'skill-tag').appendTo('#register-skills');
          $('.skill-tag:last .skill-tag-text').text($('#add-skill-input-settings').val());
          $('.skill-tag:last').show();
          $('#add-skill-input-settings').val('');
          $('.tt-hint').hide();
          $('#my-skills').show();
          $('#tutor-register-div').show();
          update_skill_ajax('add',skill_name);
        }
      }
    });

    $('#tutor-application-submit').click(function() {
      if (!$('#former-experience').val() || ($('.skill-tag').length < 2)) {
        $('#add-one-skill-alert').show();
      } else {
        $('#add-one-skill-alert').hide();
        data = {
          'complete-tutor-signup':$('#former-experience').val(),
          'student-convert':true
        }
          $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/validation/',
          data: JSON.stringify(data),
          dataType: "json",        
          success: function(result) {        
              window.location.replace('/settings/');
            }
          })  
      }
    });

    $('#add-skill-input-settings').keyup(function(e){
    if ($('#add-skill-input-settings').val()) {
      if (e.keyCode == 13) {
        if ($('#add-skill-input-settings').val()) {
          var skill_name = $('#add-skill-input-settings').val();
          if (autocomplete_json.indexOf(skill_name) == -1) {
            alert('Please only add things from the available options.');
            $('#add-skill-input-settings').val('');
          } else {
            $('.template-one-skill:first').clone().hide().attr('class', 'one-skill').appendTo('#current-skills');
            $('.one-skill:last .skill-name').text($('#add-skill-input-settings').val());
            $('.one-skill:last').show();
            $('#add-skill-input-settings').val('');
            $('.tt-hint').hide();
            update_skill_ajax('add',skill_name);
          }
        }
      }
    }
  });

    $('#year-dropdown').on('click', '.dropdown-menu li a', function() {
      var selected_text = $(this).text();
      $('#selected-year').text(selected_text)
      $('#saved-year').show();
      $('#saved-year').delay(750).fadeOut('slow');
      send_profile_update_ajax('year', selected_text)
    });

    $('#submit-support-ticket').click(function() {
      
      if (!$('#support-detail').val()) {
        $('#support-section-alert').text('Please fill in all fields')
        $('#support-section-alert').show();
        return;
      } else {
        $('#support-section-alert').hide();
      }

      data = {
        'selected-issue':$('#selected-issue').text(),
        'detail':$('#support-detail').val()
      }

      $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/api/support',
          data: JSON.stringify(data),
          dataType: "json",        
          success: function(result) {        
              $('#support-section-alert').text("Your issue has been submitted! We'll get back to you soon");
              $('#support-section-alert').show();
          }
      });

    });

    $('#issue-dropdown').on('click', '.dropdown-menu li a', function() {
      var selected_text = $(this).text();
      $('#selected-issue').text(selected_text);
    });    

    $('#current-skills').on('click', '.boxclose', function(e){
      e.preventDefault();
      var skill_name = $(this).parent().siblings('.default-text:first').children('.skill-name').text();
      $(this).parent().parent().parent().remove();
      update_skill_ajax('remove',skill_name);
    });

    $('#register-skills').on('click', '.skill-tag-remove', function(e){
      e.preventDefault();
      var skill_name = $(this).siblings('.skill-tag-text').text();
      $(this).parent().remove();
      update_skill_ajax('remove',skill_name);
    });

    update_skill_ajax = function(add_or_remove, skill_name) {
      var data = {};
      if (add_or_remove == 'add') {
        data['add'] = skill_name
      } else {
        data['remove'] = skill_name
      }
      $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/update-skill/' ,
            data: JSON.stringify(data),
            dataType: "json"
      });  
    };

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
    };

    var send_profile_update_ajax = function(to_change, value) {
      var data = {};
      if (to_change =='previous') {
        data['previous'] = value;
      }
      if (to_change =='slc') {
        data['slc'] = value;
      }
      if (to_change == 'intro') {
        data['intro'] = value
      }
      if (to_change == 'hkn') {
        data['hkn'] = value
      }
      if (to_change == 'ta') {
        data['ta'] = value
      }
      if (to_change == 'la') {
        data['la'] = value 
      }
      if (to_change == 'res') {
       data['res'] = value 
      }
      if (to_change =='year') {
        data['year'] = value
      }
      if (to_change =='discover') {
        data['discover'] = value 
      }
      if (to_change =='major') {
        data['major'] = value
      }
      $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/update-profile/' ,
            data: JSON.stringify(data),
            dataType: "json",
      });
    };

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#default-photo').hide()
                $('#image-preview').show()
                $('#saved-photo').show();
                $('#pic-holder').css('border', '1px solid #40bfec');
                $('#saved-photo').delay(1250).fadeOut('slow');
                $('#image-preview').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
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
                $('#old').val('')
                $('#new').val('')
                $('#confirm').val('')
                $('#saved-password').show();
                $('#saved-password').delay(750).fadeOut('slow');
              }
            }
        });  
    };

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
