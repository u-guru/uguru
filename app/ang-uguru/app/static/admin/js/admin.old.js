


    $('#admin-logout-submit').click(function() {

    });

    $('.send-test-email').click(function() {
        
        //Get testPayload
        var testPayload = getSelectedDashboard();

        //Add test account ID
        var testAccountId = $(this).data('userId');
        testPayload["test_id"] = testAccountId;

        $.ajax({
            url: BASE_URL + '/send',
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(testPayload),
            success: function(request){
                alert('Email successfully sent');
            },
            error: function (request) {
                alert('Contact Samir, something went wrong');
            }
        });
        
    });

    $('.reset-admin-account').click(function() {
        
        adminPayload = {};

        //Add test account ID
        var testAccountId = $(this).data('userId');
        adminPayload["user_id"] = testAccountId;

        $.ajax({
            url: BASE_URL + '/users/',
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(adminPayload ),
            success: function(request){
                alert('Admin account cleared');
                window.location.replace('/admin/accounts/');
            },
            error: function (request) {
                alert('Contact Samir, something went wrong');
            }
        });
        
    });