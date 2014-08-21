var autocomplete_json = [];
var current_page_id = null; 
var previous_page_id = null;
var request_form_complete = null;
var a,b,c;
var signup_type = null;
var invert_olark = function() {
    $('#habla_window_div #habla_oplink_a').css('color','white');
    $('#habla_window_div #habla_topbar_div').css('background', '#00a9e5 none repeat scroll 0 0');
}
var invert_olark_white = function() {
    $('#habla_window_div #habla_oplink_a').css('color','#00a9e5');
    $('#habla_window_div #habla_topbar_div').css('background', 'white none repeat scroll 0 0');
}

// window.onhashchange = locationHashChanged
// function locationHashChanged() {
//     if (!location.hash) {
//       $('body').css('background-color','#00A9DE')
//       $('#tutor-signup').hide();
//       $('#student-signup').hide();
//       $('#tutor-signup-next').hide();
//       $('#login-page').hide();
//       $('#forgot-password-page').hide();
//       $('#home').show();
//       invert_olark_white();
//       location.hash = '';
//     }
// }

$(document).ready(function(){
    
    $body = $("body");
    
    $(document).on({
        ajaxStart: function() { $body.addClass("loading");    },
         ajaxStop: function() { $body.removeClass("loading"); }    
    });

    if ($('#request-main-slider').length >= 1) {
        $('#request-main-slider').slider(
          {
            'min':1, 
            'max':10, 
            'value':2,
            change: function(event, ui) {
              slider_val = $('#request-main-slider').slider('value');
              hr_text = 'hrs'
              if (slider_val == 1) {
                hr_text = 'hr'
              }
              $('#request-main-slider-val').text(slider_val + ' ' + hr_text);
            }
          }
      );

      $('#edit-price-slider').slider(
          {
            'min':10, 
            'max':25, 
            'value':15,
            change: function(event, ui) {
              $('#final-offering-price').text($('#edit-price-slider').slider('value'));
              slider_val = $('#edit-price-slider').slider('value');
              $('#edit-price-slider-val').text('$' + slider_val + '/hr');
            }
          }
      );
    }
    $('#email-notif-check').change(function(){
          var status = this.checked;
          if (status) {
            send_notification_ajax('email', true)
          } else {
            send_notification_ajax('email', false)
          }
          $('#email-notif-saved-text').show();
          $('#email-notif-saved-text').delay(750).fadeOut('slow');
      });

    $('#text-notif-check').change(function(){
          var status = this.checked;
          if (status) {
            send_notification_ajax('text', true)
          } else {
            send_notification_ajax('text', false)
          }
          $('#text-notif-saved-text').show();
          $('#text-notif-saved-text').delay(750).fadeOut('slow');
      });

    $('#slc-tutor-check').change(function(){
          send_profile_update_ajax('slc', this.checked)
    });

    $('#ta-tutor-check').change(function(){
          send_profile_update_ajax('ta', this.checked)
    });

    $('#prev-tutor-check').change(function(){
          send_profile_update_ajax('previous', this.checked)
    });

    $('#la-tutor-check').change(function(){
          send_profile_update_ajax('la', this.checked)
    });

    $('#res-tutor-check').change(function(){
          send_profile_update_ajax('res', this.checked)
    });

    $('#submit-profile-info-btn').click(function() {
      if ($('#profile-relevant-experience').length > 0) {
        send_profile_update_ajax('intro', $('#profile-relevant-experience').val());
      }
      send_profile_update_ajax('major', $('#profile-major').val());
      send_profile_update_ajax('phone', $('#profile-phone').val())
      $('#profile-saved').show();
      $('#profile-saved').delay(750).fadeOut('slow');
    });

    function readJSON(file) {
      var request = new XMLHttpRequest();
      request.open('GET', file, false);
      request.send(null);
      if (request.status == 200)
          return request.responseText;
    };
    
    autocomplete_json = JSON.parse(readJSON('/static/data/autocomplete.json'));

    $('#register-skills').on('click', '.skill-tag-remove', function(e){
      e.preventDefault();
      var skill_name = $(this).siblings('.skill-tag-text').text();
      $(this).parent().remove();
      update_skill_ajax('remove',skill_name);
    });

    $('#request-form-edit-price').click(function() {
      $('#request-form-edit-price').hide();
      $('#request-form-remove-price').show();
      $('#edit-price-container').show();
      $('#suggested-or-your-text').text('Your Price: ')
    });

    $('#request-form-remove-price').click(function() {
      $('#final-offering-price').text('15')
      $('#edit-price-slider').slider({'value':15});
      $('#request-form-edit-price').show();
      $('#request-form-remove-price').hide();
      $('#edit-price-container').hide();
      $('#suggested-or-your-text').text('Suggested: ')
    });

    $('#tutor-add-course-fields').on('click', 'a.example-skill-link', function() {
      var skill_name = $(this).children('span:first').text().trim();
      $('.template-one-skill:first').clone().hide().attr('class', 'skill-tag').appendTo('#register-skills');
      $('.skill-tag:last .skill-tag-text').text(skill_name);
      $('.skill-tag:last').show();
      $('#add-skill-input-settings').val('');
      $('.tt-hint').hide();
      $('#my-skills').show();
      $('#tutor-register-div').show();
      update_skill_ajax('add',skill_name);
    });


    
    $('#tutor-signup-phone').keyup(function (e) { 
      var new_element = $('#tutor-signup-phone').val().slice(-1);
      $('#tutor-signup-phone').val($('#tutor-signup-phone').val().replace(/[^0-9]/g, ''));
      if ($('#tutor-signup-phone').val().length > 10) {
        $('#tutor-signup-phone').val($('#tutor-signup-phone').val().slice(0,-1))
        return false;
      }
      if (e.keyCode == 13) {
        $('#tutor-next-link').trigger('click');
      }
    });

    $('#student-signup-phone').keyup(function (e) { 
      var new_element = $('#student-signup-phone').val().slice(-1);
      $('#student-signup-phone').val($('#student-signup-phone').val().replace(/[^0-9]/g, ''));
      if ($('#student-signup-phone').val().length > 10) {
        $('#student-signup-phone').val($('#student-signup-phone').val().slice(0,-1))
        return false;
      }
      if (e.keyCode == 13) {
        $('#student-next-link').trigger('click');
      }
    });

    $('#settings-change-pwd-toggle').click(function() {
      if ($('#change-pwd-settings-container').is(':visible')) {
        $('#change-pwd-settings-container').hide();
        $('#settings-change-pwd-toggle').children('span:first').text('Change');
      } else {
        $('#change-pwd-settings-container').show();
        $('#settings-change-pwd-toggle').children('span:first').text('Cancel')
      }
    });

    $('#save-password-btn').click(function() {
      if (!$('input[name="old-pwd"]').val() || !$('input[name="confirm-pwd"]').val()) {
        $("#change-password-alert").text('Please fill in all fields');
        $("#change-password-alert").show();
      } else {
        $('#settings-change-pwd-toggle').children('span:first').text('Change');
        update_password_ajax($('input[name="old-pwd"]').val(), $('input[name="new-pwd"]').val())
      }
    });

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
                $("#change-password-alert").hide();
                $('#change-pwd-settings-container').hide();
                $('input[name="old-pwd"]').val('')
                $('input[name="new-pwd"]').val('')

                $('#saved-password').show();
                $('#saved-password').delay(750).fadeOut('slow');
              }
            }
        });  
    };


    $('#urgency-request').on('click', '.urgency', function(){
      var current_active = $('#urgency-request .urgency.active');
      current_active.removeClass('active')
      $(this).addClass('active')
    })

    $('#num-students-request').on('click', '.num-students', function() {
      var current_active = $('#num-students-request .num-students.active');
      current_active.removeClass('active')
      $(this).addClass('active')

      var index = $(this).index();

      if (index == 0 ) {
        $('#ideal-price-slider').val('15');
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
        $('#total-request-price-per-person').text('(only ' + '$' + ($('#ideal-price-slider').val()/(index + 1)) + ' a person if you split the bill!)')
        $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
        $('#ideal-price-slider').noUiSlider({
          range: {
            'min': Number(12),
            'max': Number(40)
          }
        }, true);
      }
      else if (index == 1) {
        $('#ideal-price-slider').val('20');
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
        $('#total-request-price-per-person').text('(only ' + '$' + ($('#ideal-price-slider').val()/(index + 1)) + ' a person if you split the bill!)')
        $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
        $('#ideal-price-slider').noUiSlider({
          range: {
            'min': Number(15),
            'max': Number(40)
          }
        }, true);
      } else if (index == 2) {
        $('#ideal-price-slider').val('24');
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
        $('#total-request-price-per-person').text('(only ' + '$' + ($('#ideal-price-slider').val()/(index + 1)) + ' a person if you split the bill!)')
        $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
        $('#ideal-price-slider').noUiSlider({
          range: {
            'min': Number(20),
            'max': Number(40)
          }
        }, true);
      } else if (index == 3) {
        $('#ideal-price-slider').val('28');
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
        $('#total-request-price-per-person').text('(only ' + '$' + ($('#ideal-price-slider').val()/(index + 1)) + ' a person if you split the bill!)')
        $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
        $('#ideal-price-slider').noUiSlider({
          range: {
            'min': Number(20),
            'max': Number(40)
          }
        }, true);
      } else if (index == 4) {
        $('#ideal-price-slider').val('30');
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
        $('#total-request-price-per-person').text('(only ' + '$' + ($('#ideal-price-slider').val()/(index + 1)) + ' a person if you split the bill!)')
        $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));        
        $('#ideal-price-slider').noUiSlider({
          range: {
            'min': Number(20),
            'max': Number(40)
          }
        }, true);
      }

      if (index >= 1) {
        $('#total-request-price-per-person').show();
        $('#total-request-price-per-person').text('(only ' + '$' + ($('#ideal-price-slider').val()/(index + 1)) + ' a person if you split the bill!)')
        $('#total-price-header').text('Suggested Hourly Price:');
        $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
      } else {
        $('#total-request-price-per-person').hide();
        $('#total-price-header').text('Suggested Hourly Price:')
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
        $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
      }
    });

    $('#request-change-hourly').click(function() {
      $('#request-change-hourly').hide();
      $('#suggested-price-slider').show();
    });

    $('#request-change-hourly-cancel').click(function() {
      $('#suggested-price-slider').hide();
      num_students = $('#num-students-request .num-students.active').index()
      if (num_students == 0) {
        $('#ideal-price-slider').val(15)  
      } else if (num_students == 1) {
        $('#ideal-price-slider').val(20)  
      } else if (num_students == 2) {
        $('#ideal-price-slider').val(24)  
      } else if (num_students == 3) {
        $('#ideal-price-slider').val(28)  
      } else {
        $('#ideal-price-slider').val(30)  
      }
      $('#ideal-price-slider').trigger('change');
      $('#suggested-or-your').text('Suggested');
      $('#request-change-hourly').show();
    })

    $('#ideal-price-slider').change(function() {
      var index = $('#num-students-request .num-students.active').index() + 1;
      $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
      if (index > 1) {
        $('#total-request-price-per-person').show();
        $('#total-request-price-per-person').text('(only ' + '$' + ($('#ideal-price-slider').val()/(index)) + ' a person if you split the bill!)')
      } else {
        $('#total-request-price-per-person').hide();
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
      }
      $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
    })

    $('#time-estimate-slider').change(function() {
      var index = $('#num-students-request .num-students.active').index() + 1;
      if (index > 1) {
        $('#complete-price').text('$' + $('#time-estimate-slider').val() * index * $('#ideal-price-slider').val() + ' a person')
      } 
      $('#complete-price').text('Estimated Total (' + $('#time-estimate-slider').val() +'hr) : '+'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
    })

    $('#frequency-request').on('click', '.frequency', function(){
      var current_active = $('#frequency-request .frequency.active');
      current_active.removeClass('active');
      $(this).addClass('active');
    })

    $('#login-link').click(function() {
        $('#home').hide();
        $('body').css('background-color','white')
        invert_olark();
        $('#login-page').show('slide', {direction: 'right'}, 200);
    });
    $('#student-signup-btn').click(function() {
        $('#home').hide();
        $('body').css('background-color','white')
        invert_olark();
        $('#student-signup').show('slide', {direction: 'right'}, 200);
    });
    $('#student-next-link').click(function() {
        if (!$('#student-signup-name').val() || !$('#student-signup-email').val() 
        || !$('#student-signup-password').val()) 
        {
            $('#alert-fields-student-signup').show()
        } else {
            var data_dict = {
                'student-signup': true,        
                'name': $('input[name="student-name"]').val(),
                'email': $('input[name="student-email"]').val(),
                'phone': '',
                'password': $('input[name="student-password"]').val(),
            }
            $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/validation/' ,
              data: JSON.stringify(data_dict), 
              dataType: "json",
              success: function(result) {
                if (result.dict['account-exists']) {
                  $('#signup-modal').modal('hide');
                  $('#login-modal').modal('show');
                  $('#alert-fields-login').text($('#student-signup-email').val() + ' already has an account! Please log in.')
                  $('#alert-fields-login').show();
                  return;
                }

                if (request_form_complete) {
                  submit_request_form_to_server();
                }

                if (!$('#request-skill').val()) {
                  window.location.replace("/");
                }

                $('#signup-modal').modal('hide');
                $('#main').hide();
                $('#request-form').show();
              }
            });
        } 
    });

    $('#tutor-app-submit').click(function() {
      if (!$('#tutor-app-school-email').val() || !$('#tutor-app-major').val() || $('.tutor-app-course-tag').length == 0
        || !$('#tutor-app-experience').val() || $('#tutor-app-year').text().trim().length == 0) {
          $('#tutor-app-alert').text('Please fill in all fields');
          $('#tutor-app-alert').show();
      } else {
          var data_dict ={
            'tutor-submit-app': true,
            'school-email': $('#tutor-app-school-email').val(),
            'major': $('#tutor-app-major').val(),
            'experience': $('#tutor-app-experience').val(),
            'year': $('#tutor-app-year').text().trim(),
            'courses' : get_courses_from_tutor_app(),
            'slc': $('#tutor-slc-check').prop('checked'),
            'la': $('#tutor-la-check').prop('checked'),
            'res': $('#tutor-res-check').prop('checked'),
            'gsi': $('#tutor-gsi-check').prop('checked'),
            'cal': $('#tutor-cal-check').prop('checked'),
          }
          $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/api/guru-app' ,
            data: JSON.stringify(data_dict), 
            dataType: "json",
            success: function(result) {
              window.location.replace('/')
            }
          });
      }
    });

  function get_courses_from_tutor_app() {
    arr_courses = [];
    $('.tutor-app-course-tag').each(function() {
      course_txt = $(this).children('span:first').text().toLowerCase();
      arr_courses.push(course_txt)
    });
    return arr_courses
  }

    $('#tutor-app-add-course-btn').click(function() {
    });

    $('#tutor-app-dropdown li a').click(function() {
      $('#tutor-app-year').text($(this).text());
      $('#tutor-app-year').css('text-align','left');
    });

    $('#profile-dropdown li a').click(function() {
      $('#profile-dropdown-selected').text($(this).text());
      $('#profile-dropdown-selected').css('text-align','left');
    });

    $('#tutor-next-link').click(function(){
       if (!$('#student-signup-name').val() || !$('#student-signup-email').val() 
        || !$('#student-signup-password').val()) 
        {
            $('#alert-fields-student-signup').show()
        } else {
            var data_dict = {
                'student-signup': true,
                'tutor-signup': true,
                'name': $('input[name="student-name"]').val(),
                'email': $('input[name="student-email"]').val(),
                'phone': '',
                'password': $('input[name="student-password"]').val(),
            }
            $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/validation/' ,
              data: JSON.stringify(data_dict), 
              dataType: "json",
              success: function(result) {
                if (result.dict['account-exists']) {
                  $('#signup-modal').modal('hide');
                  $('#login-modal').modal('show');
                  $('#alert-fields-login').text($('#student-signup-email').val() + ' already has an account! Please Log In.')
                  $('#alert-fields-login').show();
                  return;
                }
                  window.location.replace('/apply-guru/');
              }
            });
        }
    });

    $('#student-register-tutor-link').click(function() {
      $('#student-next-link').trigger('click');
    });

    $('#request-form-submit').click(function(){
    if (!$('#request-description').val() || !$('#request-location').val() || 
        $('td.time-slot.td-selected').length == 0 || !$('#request-skill').val()) {
          $('#alert-fields-request-form').show(); 
      } else if ($("#activity").length == 0) {
      //If they have already signed up
        request_form_complete = true;
        $('#signup-modal').modal('show');
        $('#alert-fields-student-signup-top').text('Please create an account before your request goes through!')
        $('#alert-fields-student-signup-top').show();
        $('#student-next-link').show();
      } else {
        submit_request_form_to_server();
      }
    });

    $('#cash-out-button').click(function() {
      $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/api/cash_out' ,
          data: JSON.stringify({'cash-out':true}), 
          dataType: "json",
          success: function(result) {
              window.location.replace('/');
          }
        });
    });

    $('#upload-photo-link').on('click', function(e) {
          e.preventDefault();
          $("#upload-photo:hidden").trigger('click');
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
              $('#upload-photo-saved').show();
              $('#upload-photo-saved').delay(750).fadeOut('slow');
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

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#tutor-app-photo').attr('src', e.target.result);
                    $('#tutor-app-photo').show()
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }

    function submit_request_form_to_server() {
      $('#alert-fields-request-form').hide(); 
      $('#student-register').click(false);
      var data = {
        'student-request': true,
        'description': $('#request-description').val(),
        'skill': $('#request-skill').val(),
        'professor': $('#request-professor').val(),
        'estimate': $('#request-main-slider').slider('value'),
        'phone': $('#request-phone').val(),
        'hourly-price': $('#final-offering-price').text(),
        'urgency': $('#request-urgency').prop('checked'),
        'recurring': $('#request-recurring').prop('checked'),
        'calendar': get_calendar_selection(),
        'location': $('#request-location').val(),
        }
        $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/validation/' ,
          data: JSON.stringify(data),
          dataType: "json", 
          success: function(result) {
              if (result.dict['no-active-tutors']) {
                $('#alert-fields-request-form').text("Sorry! We currently don't have tutors for this course. We've registered your request and will let you know immediately when we do!");
                $('#alert-fields-request-form').show();
                $('#request-form-submit').hide();
              }
              else if (result.dict['duplicate-request']) {
                $('#alert-fields-request-form').text("Sorry! You already have an active request for this class. Please cancel it and try again.");
                $('#alert-fields-request-form').show();
                $('#request-form-submit').hide();
              } else if (result.dict['tutor-request-same']) {
                $('#alert-fields-request-form').text("Sorry, you cannot make a request for a course that you're a tutor in!");
                $('#alert-fields-request-form').show();
                $('#request-form-submit').hide();
              } else {
                window.location.replace('/activity/');
              }
          }
        });
    }

    $('#add-skill-btn').click(function() {
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

    $('#login-password').keyup(function(e) {
      if (e.keyCode == 13) {
        $('#login-submit-link').trigger('click');
      }
    });

    $('#submit-email').keyup(function(e) {
      if (e.keyCode == 13) {
       $('#email-submit-link').trigger('click'); 
      }
    });

    $('#student-signup-location').keyup(function(e) {
      if (e.keyCode == 13) {
        $('#student-register').trigger('click');
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

    $('#tutor-add-course-fields').on('click', '.tt-suggestion', function() {
      var skill_name = $(this).children('p:first').text()
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
    });

    $('#tutor-register').click(function() {
        if ($('#register-skills').children().length > 1 && $('#former-experience').val()) {
          data = {'complete-tutor-signup':$('#former-experience').val()}
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
        } else {
          $('#add-one-skill-alert').show();
        }
    });

    $('.submit-confirm-payment-text').click(function() {
        data =  {
          'time_amount': ($('#confirm-time-payment-slider').slider('value') / 2),
          'payment_id': $(this).attr('id')
        }
        $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/api/payments',
          data: JSON.stringify(data),
          dataType: "json",        
          success: function(result) {        
              window.location.replace('/activity/');
            }
          })
    });

    $('#forgot-password-link').click(function() {
      $('#login-modal-container').hide();
      $('#forgot-password-modal-container').show();
    });

    $('#password-submit-link').click(function() {
      if (!$('#password-email').val()) {
            $('#alert-fields-forgot-password').show();
      } else {
        var data = {
          'email': $('input[name="password-email"]').val(),
        }
        $('#alert-fields-forgot-password').hide();
        $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/reset-password/',
          data: JSON.stringify(data),
          dataType: "json",        
          success: function(result) {        
            $('#forgot-password-modal-container').hide();
            $('#login-modal-container').show();
            $('#alert-fields-login').css('color','red')
            $('#alert-fields-login').text('We have sent an email to this address with a new password.')
            $('#alert-fields-login').show();
          }
        })
      }
    })
    
    $('#login-submit-link').click(function(){
    //check whether fields are blank
    if (!$('#login-email').val() || !$('#login-password').val()) {
      $('#alert-fields-login-2').show()
    } else {
      //else get data and send to server
      var data = {
        'email': $('#login-email').val(),
        'password': $('#login-password').val()
      }
      $.ajax({
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        url: '/login/',
        data: JSON.stringify(data),
        dataType: "json",        
        success: function(result) {        
            console.log(result);
            if (result.json['unfinished']) {
              window.location.replace('/');
            }
            if (result.json['fb-account']) {
              $('#alert-fields-login-2').hide();
              $('#alert-fields-login').show();
              $('#alert-fields-login').text('You have a Uguru.me FB account, please login with Facebook!')
            }
            if (result.json['admin']) {
              window.location.replace('/admin/');
            }
            if (result.json['success']) {
                window.location.replace('/activity/');
            } else {
                $('#alert-fields-login-2').text('Incorrect email or password');
                $('#alert-fields-login-2').show();
                $('#alert-fields-login-redirect').hide();
            }
        }
        });      
        }
    });

    $('#email-submit-link').click(function() {
      if(!$('#submit-email').val()) {
        $('#submit-email-alert').text('Please enter an email')
        $('#submit-email-alert').show();
      } else if ($('#submit-email').val().toLowerCase().indexOf('@berkeley.edu') == -1) {
        $('#submit-email-alert').show();
        $('#submit-email-alert').text('Please enter a berkeley.edu email');
      } else {
        $('#submit-email-alert').hide();
        data_dict = {'submit-email-home':$('#submit-email').val()}
        $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/validation/' ,
              data: JSON.stringify(data_dict),
              dataType: "json",
              success: function(result) {
                if (result.dict['duplicate-email']) {
                  $('#home').hide();
                  $('body').css('background-color','white')
                  invert_olark();
                  $('#alert-fields-login-3').text('There is already an account with this email. Try logging in!');
                  $('#login-email').val(result.dict['submit-email-home']);
                  $('#login-password').focus().select();
                  $('#alert-fields-login-3').show();
                  $('#login-page').show('slide', {direction: 'right'}, 200);
                } 
                else {
                  $('#home').hide();
                  $('body').css('background-color','white')
                  invert_olark();
                  if ($('#guru-checkbox:checked').length > 0) {
                    $('#tutor-student-header').text('GURU SIGNUP')
                    $('#tutor-next-link').show()
                  } else {
                    $('#tutor-student-header').text('STUDENT SIGNUP')
                    $('#student-next-link').show()
                  }
                  $('#student-signup-email').val(result.dict['submit-email-home'])
                  $('#student-signup').show('slide', {direction: 'right'}, 200);
                }
              }
            });
      }
    });

    $('#apply-tutor-link').click(function() {
        $('#home').hide();
        $('body').css('background-color','white')
        invert_olark();
        $('#tutor-student-header').text('GURU SIGNUP')
        $('#tutor-next-link').show()
        // $('#student-signup-email').val(result.dict['submit-email-home'])
        $('#student-signup').show('slide', {direction: 'right'}, 200);
        signup_type ='tutor';

    });

    $('#')

    $('#home-course-submit').click(function() {
      $('#main').hide();
      $("#request-skill").val($('#course-input').val());
      $('#request-form').show();
      $('#skip-this-step-link').click(function() {
        $('#signup-modal').modal('show')
        $('#student-next-link').show();
      });
      // $('#request-form-options').hide();
      // $('#request-form-submit').children('span:first').removeClass('blue-btn-extra');
      // $('#request-form-submit').children('span:first').addClass('blue-btn-full');
    });

    $('#student-signup-link').click(function() {
        $('#home').hide();
        $('body').css('background-color','white')
        invert_olark();
        $('#tutor-student-header').text('STUDENT SIGNUP')
        $('#student-next-link').show()
        signup_type = 'student'
        $('#student-signup').show('slide', {direction: 'right'}, 200);
    });

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
    $('#tutor-add-course-fields .typeahead').typeahead(null, {
      displayKey: 'name',
      source: numbers.ttAdapter()
    })

    $('#student-request-fields .typeahead').typeahead(null, {
      displayKey: 'name',
      source: numbers.ttAdapter()
    });

    $('#request-form .typeahead').typeahead(null, {
      displayKey: 'name',
      source: numbers.ttAdapter()
    });

    $('#course-input.typeahead').typeahead(null, {
      displayKey: 'name',
      source: numbers.ttAdapter()
    }).on('typeahead:selected', onTypeaheadSelected);

    $('#courses-tutor-input.typeahead').typeahead(null, {
      displayKey: 'name',
      source: numbers.ttAdapter()
    }).on('typeahead:selected', onTypeaheadSelectedTutorApp);

    $('#courses-profile-input.typeahead').typeahead(null, {
      displayKey: 'name',
      source: numbers.ttAdapter()
    }).on('typeahead:selected', onTypeaheadSelectedTutorProfile);


    function onTypeaheadSelectedTutorProfile(event, suggested, dataset_name) {
      var course_name = $('#courses-profile-input').val();
      if (autocomplete_json.indexOf(course_name) == -1) {
            alert('Please only add things from the available options.');
            return;
      } 

      $('.courses-add-container').append("<span class='tutor-profile-course-tag'><span>" + course_name + 
          '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="remove-skill-tutor-profile">x</a></span>' );
      $('#courses-tutor-input').val('');
      update_skill_ajax('add', course_name);
      $('a.remove-skill-tutor-profile').click(function() {
        $(this).parent().remove();
        update_skill_ajax('remove', $(this).siblings('span').text().toLowerCase());
    });
    };

    $('a.remove-skill-tutor-profile').click(function() {
        $(this).parent().remove();
        update_skill_ajax('remove', $(this).siblings('span').text().toLowerCase());
    });


    function onTypeaheadSelectedTutorApp(event, suggested, dataset_name) {
      var course_name = $('#courses-tutor-input').val();
      if (autocomplete_json.indexOf(course_name) == -1) {
            alert('Please only add things from the available options.');
            return;
      } 

      $('.courses-add-container').append("<span class='tutor-app-course-tag'><span>" + course_name + 
          '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="remove-skill-tutor-app">x</a></span>' );
      $('#courses-tutor-input').val('');

      $('.tutor-app-course-tag .remove-skill-tutor-app').click(function() {
        $(this).parent().remove();
      });
    };

    function onTypeaheadSelected(event, suggested, dataset_name) {
      $.ajax({
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        url: '/api/sample-tutors',
        data: JSON.stringify({'course':$('#course-input').val()}),
        dataType: "json",        
        success: function(result) {
          var tutors = result.response['tutors']
          var enough_tutors = result.response['enough-tutors']
          for (i = 0; i < tutors.length; i++) {
            $('#available-tutors').append('<span><img src="'+tutors[i]+'" style="align:center" class="tutor-photo"></span>')
          }
          $('#course-tutor-length').text(tutors.length)
          $('#course-name-string').text($('#home-page-courses').val());
          $('#available-tutors-per-course').show()
        }
      });
      $('#student-signup-link').show();
    };

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

    $('#become-guru-nav').click(function() {
      $('#signup-modal').modal();
      $('#tutor-next-link').show();
      $('#student-next-link').hide();
    });

    $('#become-guru-nav-request').click(function() {
      $('#signup-modal').modal();
      $('#tutor-next-link').show();
      $('#student-next-link').hide();
    });

    $('#become-guru-tutor').click(function() {
      $('#signup-modal').modal();
      $('#tutor-next-link').show();
      $('#student-next-link').hide();
    });

    $('#signup-nav').click(function() {
      $('#signup-modal').modal();
      $('#tutor-next-link').hide();
      $('#student-next-link').show();
    });

    $('#signup-nav-2').click(function() {
      $('#signup-modal').modal();
      $('#tutor-next-link').hide();
      $('#student-next-link').show();
    });

    $('#signup-nav-request').click(function() {
      $('#signup-modal').modal();
      $('#tutor-next-link').hide();
      $('#student-next-link').show();
    });

    $('#signup-nav-tutor').click(function() {
      $('#signup-modal').modal();
      $('#tutor-next-link').hide();
      $('#student-next-link').show();
    });


    
    $('#student-signup-name').blur(function(){
      if ($('#student-signup-name').val().split(" ").length > 1) {
        $('#student-signup-name').css({"border-color":"#69bf69"});
        $('#proper-student-name').hide();
      } else {
        $('#student-signup-name').css({"border-color":"red"});
        $('#proper-student-name').show();
      }
    });

    $('#student-signup-email').blur(function(){
      if ($('#student-signup-email').val().toLowerCase().indexOf('@berkeley.edu') != -1) {
        $('#student-signup-email').css({"border-color":"#69bf69"});
        $('#proper-email').hide();
      } else {
        $('#student-signup-email').css({"border-color":"red"
        });
        $('#proper-email').show()
      }
    });

    $('#student-signup-password').blur(function(){
      if ($('#student-signup-password').val()) {
        $('#student-signup-password').css({"border-color":"#69bf69"
      })
      } else {
        $('#student-signup-password').css({"border-color":"red"
        });
      }
    });

    $('#student-signup-phone').blur(function(){
      if ($('#student-signup-phone').val()) {
        $('#student-signup-phone').css({"border-color":"#69bf69"
      })
      } else {
        $('#student-signup-phone').css({"border-color":"red"
        });
      }
    });

    $('#tutor-signup-name').blur(function(){
      if ($('#tutor-signup-name').val().split(" ").length > 1) {
        $('#tutor-signup-name').css({"border-color":"#69bf69"});
        $('#proper-tutor-name').hide();
      } else {
        $('#tutor-signup-name').css({"border-color":"red"
        });
        $('#proper-tutor-name').show();
      }
    });

    $('#tutor-signup-email').blur(function(){
      if ($('#tutor-signup-email').val().toLowerCase().indexOf('@berkeley.edu') != -1) {
        $('#tutor-signup-email').css({"border-color":"#69bf69"});
        $('#proper-email-tutor').hide();
      } else {
        $('#tutor-signup-email').css({"border-color":"red"
        });
        $('#proper-email-tutor').show()
      }
    });

    $('#tutor-signup-password').blur(function(){
      if ($('#tutor-signup-password').val()) {
        $('#tutor-signup-password').css({"border-color":"#69bf69"
      })
      } else {
        $('#tutor-signup-password').css({"border-color":"red"
        });
      }
    });


    $('#tutor-signup-phone').blur(function(){
      if ($('#tutor-signup-phone').val()) {
        $('#tutor-signup-phone').css({"border-color":"#69bf69"
      })
      } else {
        $('#tutor-signup-phone').css({"border-color":"red"
        });
      }
    });

    $('#student-signup-skill').blur(function(){
      if ($('#student-signup-skill').val()) {
        var skill_name = $('#student-signup-skill').val();
        if (autocomplete_json.indexOf(skill_name) == -1) {
            alert('Please only add things from the available options.');
            $('#student-signup-skill').val('');
            $('#student-signup-skill').css({"border-color":"red"});
        } else {
          $('#student-signup-skill').css({"border-color":"#69bf69"});
        }
      } else {
        $('#student-signup-skill').css({"border-color":"red"});
      }
    });

    $('#student-signup-description').blur(function(){
      if ($('#student-signup-description').val()) {
        $('#student-signup-description').css({"border-color":"#69bf69"
      })
      } else {
        $('#student-signup-description').css({"border-color":"red"
        });
      }
    });

    $('#student-signup-availability').blur(function(){
      if ($('#student-signup-availability').val()) {
        $('#student-signup-availability').css({"border-color":"#69bf69"
      })
      } else {
        $('#student-signup-availability').css({"border-color":"red"
        });
      }
    });

    $('#student-signup-location').blur(function(){
      if ($('#student-signup-location').val()) {
        $('#student-signup-location').css({"border-color":"#69bf69"
      })
      } else {
        $('#student-signup-location').css({"border-color":"red"
        });
      }
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
    };

    var send_profile_update_ajax = function(to_change, value) {
      var data = {};
      if (to_change =='previous') {
        data['previous'] = value;
        $('#prev-tutor-saved').show();
        $('#prev-tutor-saved').delay(750).fadeOut('slow');
      }
      if (to_change =='slc') {
        data['slc'] = value;
        $('#slc-tutor-saved').show();
        $('#slc-tutor-saved').delay(750).fadeOut('slow');
      }
      if (to_change == 'intro') {
        data['intro'] = value
      }
      if (to_change == 'hkn') {
        data['hkn'] = value
      }
      if (to_change == 'ta') {
        data['ta'] = value
        $('#ta-tutor-saved').show();
        $('#ta-tutor-saved').delay(750).fadeOut('slow');
      }
      if (to_change == 'la') {
        data['la'] = value 
        $('#la-tutor-saved').show();
        $('#la-tutor-saved').delay(750).fadeOut('slow');
      }
      if (to_change == 'res') {
       data['res'] = value 
       $('#res-tutor-saved').show();
        $('#res-tutor-saved').delay(750).fadeOut('slow');
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
      if (to_change == 'phone') {
        data['phone'] = value
      }
      $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/update-profile/' ,
            data: JSON.stringify(data),
            dataType: "json",
      });
    };

    $('#profile-dropdown').on('click', '.dropdown-menu li a', function() {
      var selected_text = $(this).text();
      $('#profile-dropdown-selected').text(selected_text)
      $('#school-year-saved').show();
      $('#school-year-saved').delay(750).fadeOut('slow');
      send_profile_update_ajax('year', selected_text)
    });

});
