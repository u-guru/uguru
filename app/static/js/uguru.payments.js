    
    //Settings page
    $('#submit-debit-card-settings').click(function() {
        if (!$('input#debit-card-num-settings').val() || !$('input#debit-card-exp-date').val()) {
            $('#add-debit-settings-alert').show();
            $('#add-debit-settings-alert').text('Please fill in all fields');
            return false;
        }
        $('#add-debit-settings-alert').hide();
        card_number  = $('input#debit-card-num-settings').val()
        expiration_date = $('input#debit-card-exp-date').val()
        month = parseInt(expiration_date.split('/')[0])
        year = parseInt(expiration_date.split('/')[1])

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
        }, stripeDebitSettingsResponseHandler);

      });

    var stripeDebitSettingsResponseHandler = function(status, response) {
        var $form = $('#payment-form');
        if (response.error) {
            // Show the errors on the form    
            $('#add-debit-settings-alert').text(response.error.message);
            $('#add-debit-settings-alert').show();
        } else {
            $('#add-debit-settings-alert').hide();
            var token = response.id;
            var data = {'stripe_recipient_token':token}
            $.ajax({
                    type: "PUT",
                    contentType: 'application/json;charset=UTF-8',
                    url: '/api/user' ,
                    data: JSON.stringify(data),
                    dataType: "json",
                    success:function(response) {
                        if (response.errors) {
                            $('#add-debit-settings-alert').text(response.errors);
                            $('#add-debit-settings-alert').show();
                            return;
                        } else {
                            location.reload();
                        }
                    }
            });  
        }
    };

    $('#submit-credit-card-settings').click(function() {
        if (!$('input#credit-card-num').val() || !$('input#credit-card-exp-date').val()) {
            $('#add-credit-settings-alert').show();
            $('#add-credit-settings-alert').text('Please fill in all fields');
            return false;
        }
        $('#add-credit-settings-alert').hide();
        card_number  = $('input#credit-card-num').val()
        expiration_date = $('input#credit-card-exp-date').val()
        month = parseInt(expiration_date.split('/')[0])
        year = parseInt(expiration_date.split('/')[1])

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
        }, stripeCreditSettingsResponseHandler);

      });

    var stripeCreditSettingsResponseHandler = function(status, response) {
        var $form = $('#payment-form');
        if (response.error) {
            // Show the errors on the form    
            $('#add-credit-settings-alert').text(response.error.message);
            $('#add-credit-settings-alert').show();
        } else {
            $('#add-credit-settings-alert').hide();
            var token = response.id;
            var data = {'stripe-card-token':token}
            $.ajax({
                    type: "PUT",
                    contentType: 'application/json;charset=UTF-8',
                    url: '/api/user' ,
                    data: JSON.stringify(data),
                    dataType: "json",
                    success:function(response) {
                        if (response.errors) {
                            $('#add-credit-settings-alert').text(response.errors);
                            $('#add-credit-settings-alert').show();
                            return;
                        } else {
                            location.reload();
                        }
                    }
            });  
        }
    };

    //Modal Submit

    $('.submit-credit-card-modal').click(function() {
        if (!$('input#credit-card-num-modal-'+(last_clicked_notif_index + 1)).val() || !$('input#credit-card-exp-date-modal-'+(last_clicked_notif_index + 1)).val()) {
            $('#add-credit-modal-alert-'+(last_clicked_notif_index + 1)).show();
            $('#add-credit-modal-alert-'+(last_clicked_notif_index + 1)).text('Please fill in all fields');
            return false;
        }
        $('#add-credit-modal-alert-'+(last_clicked_notif_index + 1)).hide();
        card_number  = $('input#credit-card-num-modal-'+(last_clicked_notif_index + 1)).val()
        expiration_date = $('input#credit-card-exp-date-modal-'+(last_clicked_notif_index + 1)).val()
        month = parseInt(expiration_date.split('/')[0])
        year = parseInt(expiration_date.split('/')[1])

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
        }, stripeCreditModalResponseHandler);

      });

    var stripeCreditModalResponseHandler = function(status, response) {
        var $form = $('#payment-form');
        if (response.error) {
            // Show the errors on the form    
            $('#add-credit-modal-alert-'+(last_clicked_notif_index + 1)).text(response.error.message);
            $('#add-credit-modal-alert-'+(last_clicked_notif_index + 1)).show();
        } else {
            $('#add-credit-modal-alert-'+(last_clicked_notif_index + 1)).hide();
            var token = response.id;
            var data = {'stripe-card-token':token}
            if (($('#amount-to-be-billed-'+(last_clicked_notif_index + 1) + ':visible').length > 0) && payment_plan_clicked != 3 && !($('#first-time-guru-flaker-' + (last_clicked_notif_index + 1) + ':visible').length > 0))  {
                data['payment_plan'] = 3 - payment_plan_clicked;
            }
            $.ajax({
                    type: "PUT",
                    contentType: 'application/json;charset=UTF-8',
                    url: '/api/user' ,
                    data: JSON.stringify(data),
                    dataType: "json",
                    success:function(response) {
                        data = {
                            'notification-id':last_clicked_notif_index,
                            }

                        $.ajax({
                                type: "PUT",
                                contentType: 'application/json;charset=UTF-8',
                                url: '/api/student_accept' ,
                                data: JSON.stringify(data),
                                dataType: "json",
                                success:function(response) {
                                    location.reload();
                                }
                        });  
                    }
            });  
        }
    };

    //Parents

    $('#submit-credit-card-modal-parents').click(function() {
        if (!$('input#credit-card-num-parent-modal').val() || !$('input#credit-card-exp-date-parent-modal').val()) {
            $('#add-credit-modal-parent-alert').show();
            $('#add-credit-modal-parent-alert').text('Please fill in all fields');
            return false;
        }
        $('#add-credit-modal-parent-alert').hide();
        card_number  = $('input#credit-card-num-parent-modal').val()
        expiration_date = $('input#credit-card-exp-date-parent-modal').val()
        month = parseInt(expiration_date.split('/')[0])
        year = parseInt(expiration_date.split('/')[1])

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
        }, stripeCreditModalParentsResponseHandler);

      });

    var stripeCreditModalParentsResponseHandler = function(status, response) {
        var $form = $('#payment-form');
        if (response.error) {
            // Show the errors on the form    
            $('#add-credit-modal-parent-alert').text(response.error.message);
            $('#add-credit-modal-parent-alert').show();
        } else {
            $('#add-credit-modal-parent-alert').hide();
            var token = response.id;
            var data = {'stripe-card-token':token,
                        'payment_plan':(4 - payment_plan_clicked)}
            $.ajax({
                    type: "PUT",
                    contentType: 'application/json;charset=UTF-8',
                    url: '/api/parent_purchase' ,
                    data: JSON.stringify(data),
                    dataType: "json",
                    success:function(response) {
                        $('#parent-confirmation-2').hide();
                        $('#parent-confirmation-3').show();
                    }
            });  
        }
    };



    //Activity page

    $('#submit-debit-card-info').click(function() {
        if (!$('input#debit-card-num').val() || !$('input#debit-expiration-date').val()) {
            $('.debit-payment-errors').text("Please fill in all fields");
            return false;
        }
        card_number  = $('input#debit-card-num').val()
        expiration_date = $('input#debit-expiration-date').val()
        cvc_code = $('input#debit-cvc-num').val();
        month = parseInt(expiration_date.split('/')[0])
        year = parseInt(expiration_date.split('/')[1])

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
            cvc : cvc_code
        }, stripeDebitResponseHandler);

      });
      $('#payment-form').submit(function(event) {
        var $form = $(this);

        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandler);

        // Prevent the form from submitting with the default action
        return false;
        });

    var stripeDebitResponseHandler = function(status, response) {
        var $form = $('#payment-form');
        if (response.error) {
            // Show the errors on the form            
            $('.debit-payment-errors').text(response.error.message);
            $('.debit-payment-errors').show();
        } else {
            console.log(response);
            var token = response.id;
            var data = {'token':token}
            $.ajax({
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    url: '/add-bank/' ,
                    data: JSON.stringify(data),
                    dataType: "json",
                    success:function(response) {
                        if (response.response['not-a-debit']) {
                            $('.debit-payment-errors').text('You entered a debit card, not a credit card.')
                            $('.debit-payment-errors').show();
                            return;
                        } else {
                            window.location.replace('/activity/');
                        }
                    }
            });  
        }
    };


    credit_card_back_link = true; 
    $('input#credit-card-num').payment('formatCardNumber');
    $('input#credit-card-num-modal').payment('formatCardNumber');
    $('.credit-card-num-modal').payment('formatCardNumber');
    $('input#credit-card-num-parent-modal').payment('formatCardNumber');
    $('input#debit-card-num-settings').payment('formatCardNumber');
    $('input.exp-date-month').payment('formatCardExpiry');
    $('input#expiration-date').payment('formatCardExpiry');
    $('.credit-card-exp-date-modal').payment('formatCardExpiry');
    $('input#credit-card-exp-date-modal').payment('formatCardNumber');
    $('input#credit-card-exp-date-parent-modal').payment('formatCardNumber');
    $('input#cvc-num').payment('formatCardCVC');

    $('.tutor-request-accept-btn-credit').click(function(){    
        credit_card_back_link = $(this).parent().parent().parent().attr('id')
        $(this).parent().parent().parent().hide();
        $('#credit-card-info').show();
    });

    $('.student-request-accept-btn-credit').click(function(){
        if (!request_a_guru_clicked) {
            credit_card_back_link = $(this).parent().parent().parent().attr('id')
            $(this).parent().parent().parent().hide();
        } else {
            if (!$('#student-signup-description').val() || !$('#student-signup-location').val() || 
                !$('#student-signup-availability').val() || !$('#student-signup-skill').val()) {
                 $('#alert-fields-student-signup1').show(); 
                return false;
            } else {
                $(this).parent().parent().parent().parent().parent().hide();
                $('#student-request-alert').show();
            }
        }
        if (request_a_guru_clicked) {
            event_click('credit-card-page-open', 
                {
                    'Course': $('#student-signup-skill').val(), 
                    'Description': $('#student-signup-description').val(),
                    'Location': $('#student-signup-location').val(),
                    'Availability':$('#student-signup-availability').val(),
                    'Number of Students': ($('#num-students-request .num-students.active').index() + 1),
                    'Proposed Price': $('#ideal-price-slider').val(),
                    'Time Estimate': $('#time-estimate-slider').val(),
                }
            )
        } else {
            event_click('credit-card-page-open')
        }
        $('#credit-card-info').show();
    });

    $('#submit-bank-account-info').click(function() {
        if (!$('#full-legal-name').val() || !$('#bank-account-num').val() || 
            !$('#bank-routing-num').val()) {
            $('#bank-account-alert').show();
        } else {
            $('#bank-account-alert').hide();
            var valid_routing = Stripe.bankAccount.validateRoutingNumber($('#bank-routing-num').val(), 'US');
            var valid_account = Stripe.bankAccount.validateAccountNumber($('#bank-account-num').val(), 'US');
            if (valid_account && valid_routing) {
                Stripe.bankAccount.createToken({
                    country: 'US',
                    routingNumber: $('#bank-routing-num').val(),
                    accountNumber: $('#bank-account-num').val(),
                }, function(status, response) {
                    var $form = $('#payment-form');
                    if (response.error) {
                        $('#bank-account-alert').text(response.error.message);
                        $('#bank-account-alert').show();
                    } else {
                        // token contains id, last4, and card type
                        $('#add-bank-account-info').hide();
                        $('#cash-out-page').show();
                        $('#bank-account-success').show();
                        var token = response.id;
                        var data = {'token':token, 'bank':response['bank_account']['bank_name'], 
                            'legal-name':$('#full-legal-name').val(), last4:response['bank_account']['last4']};
                          $.ajax({
                                type: "POST",
                                contentType: 'application/json;charset=UTF-8',
                                url: '/add-bank/' ,
                                data: JSON.stringify(data),
                                dataType: "json",
                                success: function(){
                                    window.location.replace('/activity/');
                                }
                          });  
                        }
                    });
            } else {
                if (!valid_account) {
                    $('#bank-account-alert').text("Invalid Account Number ");
                    $('#bank-account-alert').show();
                } else {
                    $('#bank-account-alert').text("Invalid Routing Number");
                    $('#bank-account-alert').show();
                }
            }
        }
   });

    $('#cash-out-link-submit').click(function() {
        data = {};
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/add-bank/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(){
                window.location.replace('/activity/');
            }
      });
    });

    $('#credit-card-back-link').click(function(){
        if (!request_a_guru_clicked) {
            $(this).parent().parent().parent().parent().parent().hide();
            $('#' + credit_card_back_link).show();
            credit_card_back_link = true;
        } else {
            $(this).parent().parent().parent().parent().parent().hide();
            $('#tutor-request').show();
        }
    })
    jQuery(function($) {
      $('#submit-card-info').click(function() {
        if (!$('input#credit-card-num').val() || !$('input#expiration-date').val()) {
            $('.payment-errors').text("Please fill in all fields");
            return false;
        }
        card_number  = $('input#credit-card-num').val()
        expiration_date = $('input#expiration-date').val()
        cvc_code = $('input#cvc-num').val();
        month = parseInt(expiration_date.split('/')[0])
        year = parseInt(expiration_date.split('/')[1])

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
            cvc : cvc_code
        }, stripeResponseHandler);

      });
      $('#payment-form').submit(function(event) {
        var $form = $(this);

        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandler);

        // Prevent the form from submitting with the default action
        return false;
        });




var stripeResponseHandler = function(status, response) {
    var $form = $('#payment-form');
    if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').text(response.error.message);
    } else {
        var token = response.id;
        var data = {'token':token}
        $.ajax({
                type: "POST",
                contentType: 'application/json;charset=UTF-8',
                url: '/add-credit/' ,
                data: JSON.stringify(data),
                dataType: "json"
        });  
        $('#payment-form').parent().hide();
        $('#credit-card-info').hide();
        if (!request_a_guru_clicked) {
            $('#' + credit_card_back_link).show();
            $('#' + credit_card_back_link + ' a.tutor-request-accept-btn-credit').addClass('tutor-request-accept-btn');
            $('#' + credit_card_back_link + ' a.tutor-request-accept-btn-credit').removeClass('tutor-request-accept-btn-credit');
            $('#' + credit_card_back_link + ' a.student-request-accept-btn-credit').addClass('student-request-accept-btn');
            $('#' + credit_card_back_link + ' a.student-request-accept-btn-credit').removeClass('student-request-accept-btn-credit');
            
            $('#tutor-accept-text').text('CHOOSE THIS GURU');
            $('#student-accept-text').text('CHOOSE THIS GURU');
            $('#flakers-fee-alert').show();
            credit_card_back_link = false
        }
        $('.student-register').trigger('click');
    }
};

var stripeResponseHandlerBank = function(status, response) {
    var $form = $('#payment-form');
    if (response.error) {
        $('#bank-account-alert').text(response.error.message);
        $('#bank-account-alert').show();
    } else {
        // token contains id, last4, and card type
        $('#add-bank-account-info').hide();
        $('#cash-out-page').show();
        $('#bank-account-success').show();
        var token = response.id;
        var data = {'token':token, 'bank':response['bank_account']['bank_name'], 
            'legal-name':$('#full-legal-name').val(), last4:response['bank_account']['last4']};
          $.ajax({
                type: "POST",
                contentType: 'application/json;charset=UTF-8',
                url: '/add-bank/' ,
                data: JSON.stringify(data),
                dataType: "json"
          });  
        }
    };
});

