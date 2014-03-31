    credit_card_back_link = true; 
    $('input#credit-card-num').payment('formatCardNumber');
    $('input#expiration-date').payment('formatCardExpiry');
    $('input#cvc-num').payment('formatCardCVC');

    $('.tutor-request-accept-btn-credit').click(function(){    
        credit_card_back_link = $(this).parent().parent().parent().attr('id')
        $(this).parent().parent().parent().hide();
        $('#credit-card-info').show();
    });

    $('.student-request-accept-btn-credit').click(function(){
        credit_card_back_link = $(this).parent().parent().parent().attr('id')
        $(this).parent().parent().parent().hide();
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
        // $('#add-bank-account-info').hide();
        // $('#cash-out-page').show();
   });

    $('#cash-out-link-add').click(function() {
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
        $(this).parent().parent().parent().parent().parent().hide();
        $('#' + credit_card_back_link).show();
        credit_card_back_link = true;
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
        $('#' + credit_card_back_link).show();
        $('#' + credit_card_back_link + ' a.tutor-request-accept-btn-credit').addClass('tutor-request-accept-btn');
        $('#' + credit_card_back_link + ' a.tutor-request-accept-btn-credit').removeClass('tutor-request-accept-btn-credit');
        $('#' + credit_card_back_link + ' a.student-request-accept-btn-credit').addClass('student-request-accept-btn');
        $('#' + credit_card_back_link + ' a.student-request-accept-btn-credit').removeClass('student-request-accept-btn-credit');
        
        $('#tutor-accept-text').text('ACCEPT');
        $('#student-accept-text').text('ACCEPT');
        $('#flakers-fee-alert').show();
        credit_card_back_link = false
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

