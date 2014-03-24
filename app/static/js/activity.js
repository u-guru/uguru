var credit_card_back_link = false; 
var student_original_price = null;
window.onhashchange = locationHashChanged
function locationHashChanged() {
    if (!location.hash) {
        $('#feed-messages').children().hide();
        $('#activity').show();
    }
}
$(document).ready(function() {

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
      var salt = $('#main-feed').children().length - $('#feed-messages').children().length 
      var feed_message_index = $(this).parent().parent().parent().index() + 1 + salt
      $('#student-offer-hourly-price-' + feed_message_index).text(parseInt($('#tutor-change-price-slider-'+ feed_message_index).val()));
      $('#student-offer-total-price-' + feed_message_index).text(parseInt($('#tutor-change-price-slider-'+ feed_message_index).val() * $('#student-time-estimate-' +feed_message_index).text()));
    });

    $('#feed-messages').on('click', '.tutor-change-price-link', function() {
      var salt = $('#main-feed').children().length - $('#feed-messages').children().length 
      var feed_message_index = $(this).parent().parent().parent().parent().index() + 1 + salt
      if (!student_original_price) {
          student_original_price = $('#student-offer-hourly-price-' + feed_message_index).text();
        }
        $('#tutor-change-price-slider-' + feed_message_index).val(student_original_price);
        $('#tutor-change-price-link-' + feed_message_index).hide();
        $('#tutor-change-price-slider-div-' + feed_message_index).show();
    })

    $('#feed-messages').on('click', '.tutor-change-price-cancel', function() {
      var salt = $('#main-feed').children().length - $('#feed-messages').children().length 
      var feed_message_index = $(this).parent().parent().index() + 1 + salt
      $('#tutor-change-price-slider-div-' + feed_message_index).hide();
      $('#tutor-change-price-text-' + feed_message_index).show();
      $('#tutor-change-price-slider-' + feed_message_index).val(student_original_price);
      $('#student-offer-hourly-price-' + feed_message_index).text(student_original_price);
      $('#student-offer-total-price-' + feed_message_index).text((student_original_price * $('#student-time-estimate-'+ feed_message_index).text()))
    });

    $('#student-register').click(function(){
    if (!$('#student-signup-description').val() || !$('#student-signup-location').val() || 
        !$('#student-signup-availability').val() || !$('#student-signup-skill').val()) {
      $('#alert-fields-student-signup1').show(); 
    } else {
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
          success: function() {
            window.location.replace('/activity/');
          }
        });
      }
    });

   $('#cash-out-link').click(function() {
    $('#activity').hide();
    $('#cash-out-page').show();
   });

   $('#cash-out-back-link').click(function() {
    $('#cash-out-page').hide();
    $('#activity').show();
   });

   $('#cash-out-link-create').click(function() {
    $('#cash-out-page').hide();
    $('#add-bank-account-info').show();
   });

   $('#bank-account-back-link').click(function() {
    $('#add-bank-account-info').hide();
    $('#cash-out-page').show();
   })

   $('#feed').on('click', 'a.main-feed-messages', function() {
        var display_id = $(this).attr('id');
        var full_div = "#feed-messages div#" + display_id + '-detailed'
        $('#activity').hide();
        $(full_div).show('slide', {direction: 'right'}, 100);

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
            var feed_message_index = $(this).parent().parent().parent().index() + 1
            var salt = $('#main-feed').children().length - $('#feed-messages').children().length 
            var tutor_changed_price = false
            request_num = parseInt($(this).parent().parent().parent().attr('id').split('-')[2].replace('offer',''));
            hourly_amount = $('#student-offer-hourly-price-' + (feed_message_index + 1)).text();
            skill_name = $(this).parent().parent().siblings('.container-fluid').children('h5').text().split(" needs help in ").reverse()[0]
            if (hourly_amount != student_original_price) {
              tutor_changed_price = true;
            }

            var data = {
                'tutor-accept': request_num, 
                'hourly-amount': hourly_amount,
                'skill-name': skill_name,
                'price-change': tutor_changed_price,
                'notif-num':  ($('#main-feed').children().length - 1)
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
        request_num = parseInt($(this).parent().parent().parent().attr('id').split('-')[2].replace('offer',''));
        hourly_amount = parseInt($(this).parent().parent().siblings('.container-fluid').children('#hourly-amount-div').children('div:first').children('#offer-amount').children('span#price').text().replace('$',''))
        skill_name = $(this).parent().parent().siblings('.container-fluid').children('div:first').children('div:first').children('h5').text().trim().replace('A Tutor wants to help you with ','').split(" ")[0].trim()
        notification_num = $(this).parent().parent().parent().index() + 1
        var data = {
            'student-accept': request_num, 
            'hourly-amount': hourly_amount,
            'skill-name': skill_name,
            'notification-id': notification_num,
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
        conversation_id = parseInt($('#select-person-to-pay #selected-person-to-pay').attr('class').split('-').reverse()[0])
        rate = parseInt($('#payment-price-dropdown #selected-price').text().replace('$', ''))
        total_time = parseInt($('#payment-hours-dropdown #selected-payment-num-hour').text())
        alert(conversation_id)
        alert(rate)
        alert(total_time)
        var data = {
            'submit-payment': conversation_id,
            'hourly-rate': rate,
            'total-time': total_time
        }
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/submit-payment/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
                var student_to_rate = result.return_json['student-name']
                var student_profile_url = result.return_json['student-profile-url']
                $('#student-profile-photo').attr('src', student_profile_url);
                $('#student-name').text(student_to_rate.toUpperCase());
                $('#request-payments').hide();
                $('#rating-form-tutor').show();
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
        var additional_detail = $('#student-rating-description').val();
        var data = { 'tutor-rating-student' : true, 'num_stars' : num_stars, 'additional_detail' : additional_detail }
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
        var additional_detail = $('#tutor-rating-description').val();
        var data = { 'student-rating-tutor' : true, 'num_stars' : num_stars, 'additional_detail' : additional_detail }
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

});