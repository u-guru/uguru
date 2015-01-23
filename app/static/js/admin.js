// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

$(document).ready(function() {

    var validateStepOne = function() {
        // 1. make sure batch size is not empty
        // 2
    }

    var validateStepTwo = function() {
        
    }

    var validateStepThree = function() {
        
    }

    var validateAllSteps = function() {
        if (validateStepOne && validateStepTwo && validateStepThree) {
            return true; 
        }
        return false;
    }

    var sendTestEmail = function() {

    }

    var showTestEmailResults = function() {

    }

    var sendCampaign = function() {

    }

    var getCampaignInfo = function() {

    }

    var getEmailCampaignInfo = function() {
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
                window.location.replace('/admin/form/');
            },
            error: function (request) {
                alert('Incorrect username or password, please try again');
            }
        });
    });

});