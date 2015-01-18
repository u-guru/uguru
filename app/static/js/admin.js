// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

$(document).ready(function() {

    $('#admin-login-submit').click(function() {
        
        var payload = JSON.stringify({
            email: $('#admin-email').val(),
            password: $('#admin-password').val()
        });

        $.ajax({
            url: BASE_URL,
            type: "POST",
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.location.replace('/admin/dashboard/');
            },
            error: function (request) {
                alert('Incorrect username or password, please try again');
            }
        });
    });


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

    var getSelectedDashboard = function() {
        var campaignName = $('#campaign-name').val();
        var subjectName = $('#subject_name').val();
        var senderEmail = $('#default_sender_email').val();
        var senderName = $('#default_sender_name').val();
        var selectedTemplate = $('#campaign-template option:selected').val();
        var selectedBatchId = $('#batch-select option:selected').val();

        if (!campaignName || !selectedTemplate || !selectedBatchId) {
            alert("Please fill in missing fields");
            return;
        }

        var payload = {
            campaign_name: campaignName,
            template_name: selectedTemplate,
            batch_id: selectedBatchId,
            important_flag: $('#important-checkbox').is(':checked'),
            track_opens_flag: $('#opens-checkbox').is(':checked'),
            track_links_flag: $('#links-checkbox').is(':checked'),
            subject: subjectName,
            sender_email: senderEmail,
            sender_name: senderName
        };

        console.log(payload);
        return payload;
    };

});