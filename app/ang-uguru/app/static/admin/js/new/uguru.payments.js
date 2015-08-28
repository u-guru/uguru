function stripeAddDebitCardHandler(status, response) {

    if (response.error) {
            // Show the errors on the form    
            alert(response.error.message);
            return;
        } else {
            var token = response.id;
            var data = {'add_debit_card':token};
            var user_id = ($('#add-debit-card-link').data().userId).toString();
            $.ajax({
                type: "PUT",
                contentType: 'application/json;charset=UTF-8',
                url: '/api/v1/users/' +  user_id,
                data: JSON.stringify(data),
                dataType: "json", 
                success: function(request){

                    console.log('Debit Success!');

                    
                    
                },
                error: function (request) {
                    alert(request.responseJSON['errors']);
                }
        });
    }

}

function stripeAddCreditCardHandler(status, response) {

          if (response.error) {
                  // Show the errors on the form    
                  alert(response.error.message);
                  return;
              } else {
                  var token = response.id;
                  var data = {'add_card':token};
                  var user_id = ($('#add-card-link').data().userId).toString();
                  $.ajax({
                      type: "PUT",
                      contentType: 'application/json;charset=UTF-8',
                      url: '/api/v1/users/' +  user_id,
                      data: JSON.stringify(data),
                      dataType: "json", 
                      success: function(request){

                          console.log('Credit Success!');

                          return;
                      },
                      error: function (request) {
                          alert(request.responseJSON['errors']);
                      }
                  });
              }          
}

    
$(document).ready(function() {
    $('#add-card-link').on('click', function(){
        console.log('shit is clicked');
        if (!$('input#card-num').val() || !$('input#exp-date').val()) {
            alert('Please enter all fields');
            return;
        }
        card_number  = $('input#card-num').val();
        expiration_date = $('input#exp-date').val();
        month = parseInt(expiration_date.split('/')[0], 10);
        year = parseInt(expiration_date.split('/')[1], 10);

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
        }, stripeAddCreditCardHandler);

    });

    $('#add-debit-card-link').on('click', function(){
        if (!$('input#debit-card-num').val() || !$('input#debit-exp-date').val()) {
            alert('Please enter all fields');
            return;
        }
        card_number  = $('input#debit-card-num').val();
        expiration_date = $('input#debit-exp-date').val();
        month = parseInt(expiration_date.split('/')[0], 10);
        year = parseInt(expiration_date.split('/')[1], 10);

        Stripe.card.createToken({
            number : card_number,
            exp_month : month,
            exp_year : year,
        }, stripeAddDebitCardHandler);

    });

    $('input#card-num').payment('formatCardNumber');
    $('input#exp-date').payment('formatCardExpiry');
              //debit card field
    $('input#debit-card-num').payment('formatCardNumber');
    $('input#debit-exp-date').payment('formatCardExpiry');
});