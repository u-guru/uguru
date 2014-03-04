var credit_card_back_link = false; 
$(document).ready(function() {

    $('#student-register').click(function(){
    if (!$('#student-signup-description').val() || !$('#student-signup-skill').val()) {
      $('#alert-fields-student-signup1').show(); 
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

   $('#feed').on('click', 'a', function() {
        var display_id = $(this).attr('id');
        var full_div = "#feed-messages div#" + display_id + '-detailed'
        $('#activity').hide();
        $(full_div).show('slide', {direction: 'right'}, 100);
    });
   $('#feed-messages').on('click', 'a.feed-message-link', function() {
        $(this).parent().parent().parent().parent().hide();
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
            request_num = parseInt($(this).parent().parent().parent().attr('id').split('-')[2].replace('offer',''));
            hourly_amount = parseInt($(this).parent().parent().siblings('.container-fluid').children('#price-dropdown-div').children('#price-dropdown').children('button:first').text().trim().replace('$',''))
            skill_name = $(this).parent().parent().siblings('.container-fluid').children('h5').text().split(" needs help in ").reverse()[0]
            var data = {
                'tutor-accept': request_num, 
                'hourly-amount': hourly_amount,
                'skill-name': skill_name
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
        hourly_amount = parseInt($(this).parent().parent().siblings('.container-fluid').children('#hourly-amount-div').children().children('#offer-amount').children("span:first").text().replace('$',''))
        skill_name = $(this).parent().parent().siblings('.container-fluid').children('.row:first').children().children('h5').text().trim().split('A Tutor wants to help you with ')[1].split(" ")[0].trim()
        notification_num = $(this).parent().parent().parent().index() 
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
        var selected_text = $(this).text();
        $('#selected-person-to-pay').text(selected_text)
        $('#selected-person-to-pay').attr('class', ($(this).attr('id')))
    });

    $('#price-dropdown').on('click', '.dropdown-menu li a', function() {
      var selected_text = $(this).text();
      $('#selected-price').text(selected_text)
    });
    
    $('#submit-payment').click(function() {
        conversation_id = parseInt($('#select-person-to-pay #selected-person-to-pay').attr('class').split('-').reverse()[0])
        rate = parseInt($('#price-dropdown #selected-price').text().replace('$', ''))
        total_time = parseInt($('#payment-hours-dropdown #selected-payment-num-hour').text())
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
                window.location.replace('/activity/');
            }
        }); 
    })

    $('#payment-hours-dropdown').on('click', '.dropdown-menu li a', function() {
          var selected_text = $(this).text();
          $('#selected-payment-num-hour').text(selected_text)
          // send_profile_update_ajax('price', selected_text)
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

});