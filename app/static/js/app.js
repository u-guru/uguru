var autocomplete_json = [];
$(document).ready(function(){
    
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 600);
          return false;
        }
      }
    });

    // window.onbeforeunload = function() {
    //   return 'If you leave this page you will lose all form progress';
    // }

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
    });

    $('#student-signup-phone').keyup(function (e) { 
      var new_element = $('#student-signup-phone').val().slice(-1);
      $('#student-signup-phone').val($('#student-signup-phone').val().replace(/[^0-9]/g, ''));
      if ($('#student-signup-phone').val().length > 10) {
        $('#student-signup-phone').val($('#student-signup-phone').val().slice(0,-1))
        return false;
      }
    });

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
        $('#ideal-price-slider').val('13', {'animate':true });
      }
      else if (index == 1) {
        $('#ideal-price-slider').val('8', {'animate':true });
      } else if (index == 2) {
        $('#ideal-price-slider').val('7' , {'animate':true });
      } else if (index == 3) {
        $('#ideal-price-slider').val('6', {'animate':true });
      } else if (index == 4) {
        $('#ideal-price-slider').val('5', {'animate':true });
      }

      if (index >= 1) {
        $('#total-request-price').text('$' + $('#ideal-price-slider').val() + ' a person');
        $('#total-price-header').text('Hourly Price:');
        $('#complete-price-hourly').text('$' + $('#time-estimate-slider').val() * $('#ideal-price-slider').val());
        $('#complete-price-hourly').show();
        $('#complete-price-hourly').text('Total Hourly Price: $' + ((index + 1) * $('#ideal-price-slider').val()))
        $('#complete-price-hourly').show()
        $('#complete-price').text('Total Price: ' +'$' + ($('#ideal-price-slider').val() * (index + 1) * $('#time-estimate-slider').val()));
      } else {
        $('#complete-price-hourly').hide();
        $('#total-price-header').text('Hourly Price:')
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
        $('#complete-price').text('Total Estimated Price: ' +'$' + ($('#ideal-price-slider').val() * $('#time-estimate-slider').val()));
      }
      $('#num-hours').text($('#time-estimate-slider').val());
      $('#num-students').text((index + 1));
      $('#num-price').text($('#ideal-price-slider').val());
    });

    $('#ideal-price-slider').change(function() {
      var index = $('#num-students-request .num-students.active').index() + 1;
            
      if (index > 1) {
        $('#complete-price-hourly').text('Total Hourly Price: $' + (index) * $('#ideal-price-slider').val())
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()) + ' a person')
      } else {
        $('#total-request-price').text('$' + ($('#ideal-price-slider').val()))
      }
      $('#complete-price').text('Total Estimated Price: ' +'$' + ($('#ideal-price-slider').val() * index * $('#time-estimate-slider').val()));
      $('#num-hours').text($('#time-estimate-slider').val());
      $('#num-students').text(index);
      $('#num-price').text($('#ideal-price-slider').val());

    })

    $('#time-estimate-slider').change(function() {
      var index = $('#num-students-request .num-students.active').index() + 1;
      if (index > 1) {
        $('#complete-price').text('$' + $('#time-estimate-slider').val() * index * $('#ideal-price-slider').val() + ' a person')
      } 
      $('#complete-price').text('Total Price: ' + '$' + ($('#ideal-price-slider').val() * index * $('#time-estimate-slider').val())); 
      $('#num-hours').text($('#time-estimate-slider').val());
      $('#num-students').text(index);
      $('#num-price').text($('#ideal-price-slider').val());
    })

    $('#frequency-request').on('click', '.frequency', function(){
      var current_active = $('#frequency-request .frequency.active');
      current_active.removeClass('active')
      $(this).addClass('active')
    })

    $('#login-link').click(function() {
        $('#home').hide();
        $('body').css('background-color','white')
        // $('#login-page').show();
        // $("#login-page").animate({width:'toggle'},350);
        invert_olark();
        $('#login-page').show('slide', {direction: 'right'}, 200);
    });
    $('#tutor-signup-btn').click(function() {
        $('#home').hide();
        $('body').css('background-color','white')
        // $('#login-page').show();
        // $("#login-page").animate({width:'toggle'},350);
        invert_olark();
        $('#exclusive-access-page').show('slide', {direction: 'right'}, 200);
        // $('#tutor-signup').show('slide', {direction: 'right'}, 200);
    });
    $('#student-signup-btn').click(function() {
        $('#home').hide();
        $('body').css('background-color','white')
        invert_olark();
        // $('#login-page').show();
        // $("#login-page").animate({width:'toggle'},350);
        $('#student-signup').show('slide', {direction: 'right'}, 200);
    });
    $('#student-next-link').click(function() {
        if ((!$('#student-signup-name').val() || !$('#student-signup-email').val()) 
        || !$('#student-signup-password').val() || !$('#student-signup-phone').val()) 
        {
            $('#alert-fields-student-signup').show()
        } else {
            var data_dict = {
                'student-signup': true,        
                'name': $('input[name="student-name"]').val(),
                'email': $('input[name="student-email"]').val(),
                'phone': $('input[name="student-phone"]').val(),
                'password': $('input[name="student-password"]').val(),
            }
            // $('#student-signup').hide();
            // $('#student-request').show('slide', {direction: 'right'}, 200);
            $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/validation/' ,
              data: JSON.stringify(data_dict),
              dataType: "json",
              success: function(result) {
                if (result.dict['duplicate-phone']) {
                  $('#alert-fields-student-signup').text('There is already an account with this phone number');  
                  $('#alert-fields-student-signup').show();
                }
                else if (result.dict['duplicate-email']) {
                  $('#alert-fields-student-signup').text('There is already an account with this email');  
                  $('#alert-fields-student-signup').show();
                } 
                else {
                  $('#student-signup').hide();
                  invert_olark();
                  $('#student-request').show('slide', {direction: 'right'}, 200);
                }
              }
            });
        } 
    });
    $('#student-register').click(function(){
    if (!$('#student-signup-description').val() || !$('#student-signup-location').val() || 
        !$('#student-signup-availability').val() || !$('#student-signup-skill').val()) {
      $('#alert-fields-student-signup1').show(); 
      if (!$('#student-signup-description').val()) {
        $('#student-signup-description').css({"border-color":"red"});
      }
      if (!$('#student-signup-skill').val()) {
        $('#student-signup-skill').css({"border-color":"red"});
      }
    } else {
      var data = {
        'student-request': true,
        'description': $('#student-signup-description').val(),
        'urgency': $('#urgency-request .urgency.active').index(),
        'num-students': ($('#num-students-request .num-students').index() + 1),
        'skill': $('input[name="skill"]').val(),
        'estimate': $('#time-estimate-slider').val(),
        'idea-price': $('#ideal-price-slider').val(),
        'location': $('#student-signup-location').val(),
        'availability': $('#student-signup-availability').val(),
        }
        $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/validation/' ,
          data: JSON.stringify(data),
          dataType: "json", 
          success: function() {
            window.location.replace('/activity/');
            // $('#its-too-early').show();
          }
        });
      }
    });

    $('#tutor-next-link').click(function(){
        if ((!$('#tutor-signup-name').val() || !$('#tutor-signup-email').val()) 
          || !$('#tutor-signup-password').val() || !($('#tutor-signup-phone').val().length == 10)
          || !($('#tutor-signup-email').val().indexOf('@berkeley.edu') != -1))
        {
          $('#alert-fields-tutor-signup').show() 
        } else {
            var data_dict = {
                'tutor-signup': true,        
                'name': $('input[name="tutor-name"]').val(),
                'email': $('input[name="tutor-email"]').val(),
                'phone': $('input[name="tutor-phone"]').val(),
                'password': $('input[name="tutor-password"]').val(),
            }
            $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/validation/' ,
              data: JSON.stringify(data_dict),
              dataType: "json",
              success: function(result) {
                if (result.dict['duplicate-phone']) {
                  $('#alert-fields-tutor-signup').text('There is already an account with this phone number');  
                  $('#alert-fields-tutor-signup').show();
                }
                else if (result.dict['duplicate-email']) {
                  $('#alert-fields-tutor-signup').text('There is already an account with this email');  
                  $('#alert-fields-tutor-signup').show();
                } 
                else {
                  $('#tutor-signup').hide();
                  invert_olark();
                  $('#tutor-signup-next').show('slide', {direction: 'right'}, 200);
                }
              }
            });
          }

    });
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
        if ($('#register-skills').children().length > 1) {
          window.location.replace('/settings/');
        } else {
          $('#add-one-skill-alert').show();
        }
    });
    
    $('#login-submit-link').click(function(){
    //check whether fields are blank
    if (!$('#login-email').val() || !$('#login-password').val()) {
      $('#alert-fields-login-2').show()
    } else {
      //else get data and send to server
      var data = {
        'email': $('input[name="login-email"]').val(),
        'password': $('input[name="login-password"]').val()
      }
      $.ajax({
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        url: '/login/',
        data: JSON.stringify(data),
        dataType: "json",        
        success: function(result) {        
            if (result.json['success']) {
                window.location.replace('/settings/');
            } else {
                $('#alert-fields-login').show();     
                $('#alert-fields-login-redirect').hide();
            }
        }
        });      
        }
    });

    $('#access-submit-link').click(function(){
    //check whether fields are blank
    if (!$('#access-code').val()) {
      $('#alert-fields-access-2').show()
    } else {
      //else get data and send to server
      $('#alert-fields-access-2').hide()
      var data = {
        'access': $('input[name="access-code"]').val(),
      }
      $.ajax({
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        url: '/access/',
        data: JSON.stringify(data),
        dataType: "json",        
        success: function(result) {        
            if (result.json['success']) {
                $('#alert-fields-access').hide();
                $('#exclusive-access-page').hide();
                $('#tutor-signup').show();
            } else {
                $('#alert-fields-access').show();     
            }
        }
        });      
        }
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
    });

    $('#student-request-fields .typeahead').typeahead(null, {
      displayKey: 'name',
      source: numbers.ttAdapter()
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
        $('#student-signup-skill').css({"border-color":"#69bf69"
      })
      } else {
        $('#student-signup-skill').css({"border-color":"red"
        });
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

    var invert_olark = function() {
      $('#habla_window_div #habla_oplink_a').css('color','white');
      $('#habla_window_div #habla_topbar_div').css('background', '#00a9e5 none repeat scroll 0 0');
    }

});
