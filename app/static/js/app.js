$(document).ready(function(){
    
    $(window).resize(function() {
        if ($(window).width() <= 700) {
            $('#how-it-works-main').css('top', '87%');
            bottom_px = (parseInt($('#how-it-works-main').css("top").replace('px','')) - 220)+ 'px'
            $('.main').css('top',bottom_px);
            $('#home-button-1').attr('class', 'btn btn-sm')
            $('#home-button-1').css('padding', '10px 15px')
            $('#home-button-2').css('padding', '10px 15px')
            $('#home-button-2').attr('class', 'btn btn-sm')
            $('.logo_main').attr('style', 'font-size:4em;margin-top:-25px')
            $('#welcome_text').css('font-size','1em')
            $('.welcome').css('margin-top','40px')
            $('#how-it-works-main').css('font-size','1.2em')
            $('#home-button-group button').css('margin', '5px')
            $('#login-text').css('font-size', '.9em')
        }
        else {
            $('#how-it-works-main').css('top', '85%');
            $('.main').css('top','40%');            
            $('#home-button-1').attr('class', 'btn btn-lg')
            $('#home-button-2').attr('class', 'btn btn-lg')
            $('#home-button-1').css('padding', '15px 30px')
            $('#home-button-2').css('padding', '15px 30px')
            $('#welcome_text').css('font-size','1.5em')
            $('.logo_main').attr('style', 'font-size: 7em; margin-top: -35px;')
            $('#welcome_text').css('font-size','1.5em')
            $('#how-it-works-main').css('font-size','1.7em')
            $('#home-button-group button').css('margin', '10px')
            $('#login-text').css('font-size', '1.3em')
        }
    }).resize(); 

    $('#register-skills').on('click', '.skill-tag-remove', function(e){
      e.preventDefault();
      var skill_name = $(this).siblings('.skill-tag-text').text();
      $(this).parent().remove();
      update_skill_ajax('remove',skill_name);
    });

    $('#urgency-request').on('click', '.urgency', function(){
      var current_active = $('#urgency-request .urgency.active');
      current_active.removeClass('active')
      $(this).addClass('active')
    })

    $('#frequency-request').on('click', '.frequency', function(){
      var current_active = $('#frequency-request .frequency.active');
      current_active.removeClass('active')
      $(this).addClass('active')
    })

    $('#login-link').click(function() {
        $('#home-top').hide();
        $('#how-it-works-main').hide();
        $('body').css('background-color','white')
        // $('#login-page').show();
        // $("#login-page").animate({width:'toggle'},350);
        $('#login-page').show('slide', {direction: 'right'}, 200);
    });
    $('#tutor-signup-btn').click(function() {
        $('#home-top').hide();
        $('#how-it-works-main').hide();
        $('body').css('background-color','white')
        // $('#login-page').show();
        // $("#login-page").animate({width:'toggle'},350);
        $('#tutor-signup').show('slide', {direction: 'right'}, 200);
    });
    $('#student-signup-btn').click(function() {
        $('#home-top').hide();
        $('#how-it-works-main').hide();
        $('body').css('background-color','white')
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
                  $('#student-request').show('slide', {direction: 'right'}, 200);
                }
              }
            });
        } 
    });
    $('#student-register').click(function(){
    if (!$('#student-signup-description').val() || !$('#student-signup-skill').val()) {
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
        'description': $('textarea[name="description"]').val(),
        'urgency': $('#urgency-request .urgency.active').index(),
        'frequency': $('#frequency-request .frequency.active').index(),
        'skill': $('input[name="skill"]').val(),
        'estimate': $('span[name="estimate"]').text()
        }
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
      }
    });

    $('#tutor-next-link').click(function(){
        if ((!$('#tutor-signup-name').val() || !$('#tutor-signup-email').val()) 
          || !$('#tutor-signup-password').val() || $('#tutor-signup-phone').val().length == 17
          )
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
                  $('#tutor-signup-next').show('slide', {direction: 'right'}, 200);
                }
              }
            });
          }

    });
    $('#add-skill-btn').click(function() {
      if ($('#add-skill-input-settings').val()) {
        var skill_name = $('#add-skill-input-settings').val();
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

    $('#add-skill-input-settings').keyup(function(e){
        if ($('#add-skill-input-settings').val()) {
          if (e.keyCode == 13) {
            if ($('#add-skill-input-settings').val()) {
              var skill_name = $('#add-skill-input-settings').val();
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
    });

    $('#tutor-register').click(function() {
        window.location.replace('/activity/');
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
                window.location.replace('/activity/');
            } else {
                $('#alert-fields-login').show();     
                $('#alert-fields-login-redirect').hide();
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
      if ($('#student-signup-name').val()) {
        $('#student-signup-name').css({"border-color":"#00A253"
      })
      } else {
        $('#student-signup-name').css({"border-color":"red"
        });
      }
    });

    $('#student-signup-email').blur(function(){
      if ($('#student-signup-email').val().indexOf('@berkeley.edu') != -1) {
        $('#student-signup-email').css({"border-color":"#00A253"});
        $('#proper-email').hide();
      } else {
        $('#student-signup-email').css({"border-color":"red"
        });
        $('#proper-email').show()
      }
    });

    $('#student-signup-password').blur(function(){
      if ($('#student-signup-password').val()) {
        $('#student-signup-password').css({"border-color":"#00A253"
      })
      } else {
        $('#student-signup-password').css({"border-color":"red"
        });
      }
    });

    $('#student-signup-phone').blur(function(){
      if ($('#student-signup-phone').val()) {
        $('#student-signup-phone').css({"border-color":"#00A253"
      })
      } else {
        $('#student-signup-phone').css({"border-color":"red"
        });
      }
    });

    $('#tutor-signup-name').blur(function(){
      if ($('#tutor-signup-name').val()) {
        $('#tutor-signup-name').css({"border-color":"#00A253"
      })
      } else {
        $('#tutor-signup-name').css({"border-color":"red"
        });
      }
    });

    $('#tutor-signup-email').blur(function(){
      if ($('#tutor-signup-email').val().indexOf('@berkeley.edu') != -1) {
        $('#tutor-signup-email').css({"border-color":"#00A253"});
        $('#proper-email-tutor').hide();
      } else {
        $('#tutor-signup-email').css({"border-color":"red"
        });
        $('#proper-email-tutor').show()
      }
    });

    $('#tutor-signup-password').blur(function(){
      if ($('#tutor-signup-password').val()) {
        $('#tutor-signup-password').css({"border-color":"#00A253"
      })
      } else {
        $('#tutor-signup-password').css({"border-color":"red"
        });
      }
    });

    $('#tutor-signup-phone').blur(function(){
      if ($('#tutor-signup-phone').val()) {
        $('#tutor-signup-phone').css({"border-color":"#00A253"
      })
      } else {
        $('#tutor-signup-phone').css({"border-color":"red"
        });
      }
    });

    $('#student-signup-skill').blur(function(){
      if ($('#student-signup-skill').val()) {
        $('#student-signup-skill').css({"border-color":"#00A253"
      })
      } else {
        $('#student-signup-skill').css({"border-color":"red"
        });
      }
    });

    $('#student-signup-description').blur(function(){
      if ($('#student-signup-description').val()) {
        $('#student-signup-description').css({"border-color":"#00A253"
      })
      } else {
        $('#student-signup-description').css({"border-color":"red"
        });
      }
    });

});
