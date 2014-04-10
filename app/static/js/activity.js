var credit_card_back_link = false; 
var student_original_price = null;
var last_clicked_notif_index = null;
window.onhashchange = locationHashChanged
function locationHashChanged() {
    if (!location.hash) {
        $('#feed-messages').children().hide();
        $('#activity').show();
    }
}

var update_feed = function() {
  var read_notifs = $('.grey-background').length
      $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/notif-update/' ,
            data: JSON.stringify({'update-total-unread':read_notifs}),
            dataType: "json",
      }); 
  if (read_notifs == 0) {
    $('#feed-notif').hide()
  } 
}

$(document).ready(function() {

      $body = $("body");
      update_feed();

      $(document).on({
          ajaxStart: function() { $body.addClass("loading");    },
           ajaxStop: function() { $body.removeClass("loading"); }    
      });

    function readJSON(file) {
      var request = new XMLHttpRequest();
      request.open('GET', file, false);
      request.send(null);
      if (request.status == 200)
          return request.responseText;
    };
    autocomplete_json = JSON.parse(readJSON('/static/data/autocomplete.json'));

    

    $('.price-dropdown').on('click', '.dropdown-menu li a', function() {
      var selected_text = $(this).text();
      $(this).parent().parent().siblings('button:first').children('span').text(selected_text);
    });

    $('#feed-messages').on('click', '.tutor-reject-btn', function() {
      if (confirm('Are you sure? This cannot be undone')) {
        var request_num = parseInt($(this).attr('id').replace('tutor-reject-btn-',''));
        var notification_num = $(this).parent().parent().parent().index();
        var data = {
          'tutor-reject': true, 
          'notif-num': notification_num,
          'request-num': request_num
        };
        $(this).click(false);
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/update-request/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
                window.location.replace('/activity/');
            }
        }); 
      }
    });

    $('#feed-messages').on('change', '.tutor-change-price-slider', function() {
      feed_message_index = last_clicked_notif_index + 1
      $('#student-offer-hourly-price-' + feed_message_index).text($('#tutor-change-price-slider-'+ feed_message_index).val());
      $('#student-offer-total-price-' + feed_message_index).text($('#tutor-change-price-slider-'+ feed_message_index).val() * $('#student-time-estimate-' +feed_message_index).text());
    });

    $('#feed-messages').on('click', '.tutor-change-price-link', function() {
      feed_message_index = last_clicked_notif_index + 1
      if (!student_original_price) {
          student_original_price = $('#student-offer-hourly-price-' + feed_message_index).text();
        }
        $('#tutor-change-price-slider-' + feed_message_index).val(student_original_price);
        $('#tutor-change-price-link-' + feed_message_index).hide();
        $('#tutor-change-price-slider-div-' + feed_message_index).show();
    })

    $('#feed-messages').on('click', '.tutor-change-price-cancel', function() {
      feed_message_index = last_clicked_notif_index + 1
      $('#tutor-change-price-slider-div-' + feed_message_index).hide();
      $('#tutor-change-price-link-' + feed_message_index).show();
      $('#tutor-change-price-slider-' + feed_message_index).val(student_original_price);
      $('#student-offer-hourly-price-' + feed_message_index).text(student_original_price);
      $('#student-offer-total-price-' + feed_message_index).text((student_original_price * $('#student-time-estimate-'+ feed_message_index).text()))
    });

    $('#student-register').click(function(e){
    if (!$('#student-signup-description').val() || !$('#student-signup-location').val() || 
        !$('#student-signup-availability').val() || !$('#student-signup-skill').val()) {
      $('#alert-fields-student-signup1').show(); 
    } else {
      $(this).addClass('disabled')
      e.preventDefault();
      $('#student-register').click(false);
      var data = {
        'student-request': true,
        'description': $('#student-signup-description').val(),
        'urgency': $('#urgency-request .urgency.active').index(),
        'skill': $('input[name="skill"]').val(),
        'estimate': $('#time-estimate-slider').val(),
        'location': $('#student-signup-location').val(),
        'availability': $('#student-signup-availability').val(),
        'num-students': ($('#num-students-request .num-students.active').index() + 1),
        'idea-price': $('#ideal-price-slider').val(),
        }
        $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/validation/' ,
          data: JSON.stringify(data),
          dataType: "json",
          success: function(result) {
            if (result.dict['no-active-tutors']) {
              $('#already-have-active-request-alert').children().children('div:first').text("Sorry! We currently don't have tutors for this course. We've registered your request and will let you know immediately when we do!");
              $('#already-have-active-request-alert').show();
              $('#student-register').hide();
            }
            else if (result.dict['duplicate-request']) {
              $('#already-have-active-request-alert').show();
              return false;
            } else if (result.dict['tutor-request-same']) {
              $('#already-have-active-request-alert').children().children('div:first').text("Sorry, you cannot make a request for a course that you're a tutor in!");
              $('#already-have-active-request-alert').show();
              $('#student-register').hide();
            } else {
              window.location.replace('/activity/');
            }
          }
        });
      }
    });


   $('#cash-out-link-create').click(function() {
    $('#activity').hide();
    $('#add-bank-account-info').show();
   });

   $('#bank-account-back-link').click(function() {
    $('#add-bank-account-info').hide();
    $('#activity').show();
   })

   $('#feed').on('click', 'a.main-feed-messages', function() {
        last_clicked_notif_index = $('#main-feed').children().length - $(this).parent().parent().index() - 1;
        var display_id = $(this).attr('id');
        if (display_id == 'dont-do-anything') {
          $(this).css('cursor','default')
        } else {
          var full_div = "#feed-messages div#" + display_id + '-detailed'
          $('#activity').hide();
          $(full_div).show('slide', {direction: 'right'}, 100);
        }
        if ($(this).children('div:first').hasClass('grey-background')) {
          var notif_total = $(this).parent().parent().parent().children().length - 1;
          var notif_number = notif_total - $(this).parent().parent().index();

          var data = {'update-feed-count': true, 'notif_num': notif_number}
          feed_count = parseInt($('#feed-notif').text()) - 1;
          if (feed_count == 0) {
            $('#feed-notif').hide()
          } else {
            $('#feed-notif').text(feed_count)
          }
          $('#feed-notif').text(feed_count);
          $(this).children('div:first').removeClass('grey-background');
          $(this).children('div:first').removeClass('shadow');
          $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/notif-update/' ,
            data: JSON.stringify(data),
            dataType: "json",
          });
        }
    });

   $('#rating-form-tutor').on('click', '.rating span', function() {
      var num_stars = 4 - $(this).index();
      var star_children = $('#tutor-rating-stars').children()
      for (var i = 0; i < 5; i++) {
        var span = $('#tutor-rating-stars').children(':nth-child(' + (4 - i + 1) + ')')
        if (i <= num_stars) {
          span.css('color', 'gold');
          span.css('content', "\2605");
          span.addClass('star-selected');
        }
        else {
          span.css('color', 'grey')
        }
      }
   });

   $('#feed-messages').on('click', 'a.feed-message-link', function() {
        $(this).parent().parent().parent().parent().hide();
        window.location.hash = '';
        $('#activity').show();
    });
   $('#feed-messages').on('click', 'a#accept-payment', function() {
        payment_id = $(this).parent().attr('class').split('-').reverse()[0]
        var data = {
            'accept-payment':payment_id,
        }
        $(this).click(false);
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/submit-payment/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
                window.location.replace('/activity/');
            }
        }); 

    });
   $('#request-payment-link').click(function() {
        $('#activity').hide();
        $('#request-payments').show();
   });
   $('#tutor-request-link').click(function() {
        $('#activity').hide();
        $('#tutor-request').show();
   })
   $('#request-payment-link').click(function() {
        $('#activity').hide();
        $('#request-payments').show();
   });
   $('#feed-messages').on('click', 'a.tutor-request-accept-btn', function() {
            $(this).click(false);
            //Hide the modal
            $(this).parent().parent().parent().parent().parent().hide();
            var feed_message_index = last_clicked_notif_index + 1
            var tutor_changed_price = false
            hourly_amount = $('#student-offer-hourly-price-' + (feed_message_index)).text();
            extra_detail = $(this).parent().parent().siblings('.modal-body').children('.extra-detail').children().children('textarea').val();
            
            if (hourly_amount != student_original_price) {
              tutor_changed_price = true;
            }
            var data = {
                'tutor-accept': true, 
                'hourly-amount': hourly_amount,
                'extra-detail': extra_detail,
                'price-change': tutor_changed_price,
                'notif-num':  last_clicked_notif_index,
            };
            $.ajax({
                type: "POST",
                contentType: 'application/json;charset=UTF-8',
                url: '/update-request/' ,
                data: JSON.stringify(data),
                dataType: "json",
                success: function(result) {         
                    window.location.replace('/activity/');
                }
            }); 
    });

    $('#feed-messages').on('click', 'a.student-request-accept-btn', function() {
        if (confirm('If you want to accept this request, you agree to this price. If so, click OK!')) {
          $(this).click(false);
          request_num = parseInt($(this).parent().parent().parent().attr('id').split('-')[2].replace('offer',''));
      
          var data = {
              'student-accept': request_num, 
              'notification-id': last_clicked_notif_index,
          };
          $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/update-request/' ,
              data: JSON.stringify(data),
              dataType: "json",
              success: function(result) {         
                  window.location.replace('/activity/');
              }
          }); 
        }
    });

    
    $('#select-person-to-pay').on('click', '.dropdown-menu li a', function() {
        var current_index = $(this).parent().index();
        $('#address-urls').find('img:visible').each(function(){
          $(this).css('display','none')
        });
        $('#address-urls img:nth-child(' + (current_index + 1) + ")").css('display','block');
        var selected_text = $(this).text();
        $('#selected-person-to-pay').text(selected_text)
        $('#selected-person-to-pay').attr('class', ($(this).attr('id')))
        rate = parseInt($('#payment-price-dropdown #selected-price').text().replace('$', ''))
        total_time = parseInt($('#payment-hours-dropdown #selected-payment-num-hour').text())
        $('#total-amount-request').text('$' + (rate * total_time))
    });
    
    $('#submit-payment').click(function() {        
        if (!$('#secret-code').val()) {
          $('#secret-animal-code-alert').text('Please enter a code');
          $('#secret-animal-code-alert').show();
          return false;
        }
        $('#secret-animal-code-alert').hide();
        conversation_id = parseInt($('#select-person-to-pay #selected-person-to-pay').attr('class').split('-').reverse()[0])
        total_time = $('#time-estimate-slider-payment').val();
        var data = {
            'submit-payment': conversation_id,
            'total-time': total_time,
            'secret-code': $('#secret-code').val()
        }
        $('#submit-payment').click(false);
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/submit-payment/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
                if (!result.return_json['secret-code']) {
                  $('#secret-animal-code-alert').text('Incorrect Access Code');
                  $('#secret-animal-code-alert').show();
                } else {
                  var student_to_rate = result.return_json['student-name']
                  var student_profile_url = result.return_json['student-profile-url']
                  $('#student-profile-photo').attr('src', student_profile_url);
                  $('#student-name').text(student_to_rate.toUpperCase());
                  $('#student-name-again').text(student_to_rate);
                  $('#request-payments').hide();
                  $('#rating-form-tutor').show();
                }
            }
        }); 
    })

    $('#payment-hours-dropdown').on('click', '.dropdown-menu li a', function() {
          var selected_text = $(this).text();
          $('#selected-payment-num-hour').text(selected_text)
          rate = parseInt($('#payment-price-dropdown #selected-price').text().replace('$', ''))
          total_time = parseInt($('#payment-hours-dropdown #selected-payment-num-hour').text())
          $('#total-amount-request').text('$' + (rate * total_time))
          // send_profile_update_ajax('price', selected_text)
    });

    $('#submit-student-rating').click(function() {
        var num_stars = $('.star-selected').length
        if (num_stars < 1 || !$('#student-rating-description').val()) {
          $('#rate-alert').show();
          return false;
        } 
        $('#rate-alert').hide();
        var additional_detail = $('#student-rating-description').val();
        var data = { 'tutor-rating-student' : true, 'num_stars' : num_stars, 'additional_detail' : additional_detail }
        $('#submit-student-rating').click(false);
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/submit-rating/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
              $('#rating-form-tutor').hide();
              $('#bootstrap-success').children('.alert').text('Thank you for submitting your rating!')
              $('#bootstrap-success').show();
              $('#activity').show();
            }
        }); 
    });

    $('#submit-tutor-rating').click(function() {
        var num_stars = $('.star-selected').length
        if (num_stars < 1 || !$('#tutor-rating-description').val()) {
          $('#rate-alert').show();
          return false;
        } 
        $('#rate-alert').hide();
        var additional_detail = $('#tutor-rating-description').val();
        var data = { 'student-rating-tutor' : true, 'num_stars' : num_stars, 'additional_detail' : additional_detail }
        $('#submit-tutor-rating').click(false);
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/submit-rating/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
              $('#rating-form-tutor').hide();
              $('#bootstrap-success').children('.alert').text('Thank you for submitting your rating!')
              $('#bootstrap-success').show();
              $('#activity').show();
            }
        }); 
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
        $('#ideal-price-slider').val(30 )  
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


    $('#student-signup-avalability').blur(function(){
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

    $('#feed-messages').on('click', 'a.cancel-request', function() {
      if (confirm('Are you sure you want to cancel this request? It cannot be undone and there will no previous history of this request.')) {
        data = {
          'cancel-request': true,
          'notif-num': last_clicked_notif_index
        }
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/update-request/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
                window.location.replace('/activity/');
            }
        });      
    }
  });

    $('#feed-messages').on('click', 'a.cancel-request-next', function() {
        $(this).parent().parent().siblings('.cancel-request').hide();
        $(this).parent().parent().siblings('.cancel-confirm').show();
        $(this).children().children('p').text('Submit');
        $(this).addClass('cancel-request-submit');
        $(this).removeClass('cancel-request-next');
    });

    $('#feed-messages').on('click', 'a.cancel-request-submit', function() {
        radio_class_name = $(this).parent().parent().siblings("#radio-group").children(':last').children().children('input').attr('class');
        radio_alert_div = $(this).parent().parent().siblings().children('.radio-alert');
        if (!$('.' + radio_class_name + ':checked').length > 0) {
          radio_alert_div.show();
          return false;
        } else {
          radio_alert_div.hide();
        }
        radio_index = $('.' + radio_class_name + ':checked').parent().parent().index() - 2
        data = {
          'cancel-connected-request': true,
          'notif-num': last_clicked_notif_index,
          'radio-index':radio_index
        }
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/update-request/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
                window.location.replace('/activity/');
            }
        });      
    })

});