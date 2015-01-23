// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

//Next Steps
// 1. When user 'validates', the forms should be disabled for that campaign
// 2. Add checkbox to 'Send AB test on Step 2 campaign'
// 3. By default, all the inputs on the right column, should be disabled.
// 4. If Jasmine checks, enable the right column inputs . Disable if she uncheks
// 5. Validate step 2 campaign the right way.
// 6. Generalize the show / edit mode

$(document).ready(function() {

    $('#campaign-step-one-validate').click(function() {
        
        var batch_input_value = $('#campaign-batch-size').val();
        
        if (!batch_input_value) {
            
            showAlert('campaign-step-one-alert', 'Please enter the batch size');
            changeBackgroundColor("campaign-step-one-background","65C939");
            changeBorderColor("campaign-step-one-border","65C939");
            showEdit();

        } 

        else if (isNaN(batch_input_value)) {
            showAlert('campaign-step-one-alert', 'Please enter a number');
            changeBackgroundColor("campaign-step-one-background","65C939");
            changeBorderColor("campaign-step-one-border","65C939");
            showEdit();
        }
        
        else {
            $('#campaign-step-one-alert').hide();
            console.log(batch_input_value);
        }

    });

    $('#campaign-step-one-edit').click(function() {
        
        var batch_input_value = $('#campaign-batch-size').val();
        
        if (!batch_input_value) {
            
            showAlert('campaign-step-one-alert', 'Please enter the batch size');
            changeBackgroundColor("campaign-step-one-background","578EBE");
            changeBorderColor("campaign-step-one-border","578EBE");
            showValidate();

        } 

        else if (isNaN(batch_input_value)) {
            showAlert('campaign-step-one-alert', 'Please enter a number');
            changeBackgroundColor("campaign-step-one-background","578EBE");
            changeBorderColor("campaign-step-one-border","578EBE");
            showValidate();
        }
        
        else {
            $('#campaign-step-one-alert').hide();
            console.log(batch_input_value);
        }

    });

    $('#campaign-step-two-validate').click(function() {
        alert('Step two clicked!');
    });

    $('#send-test-campaign-button').click(function() {
        if (!$('#send-test-email').val() || !$('#send-test-name').val()) {
            showAlert('campaign-step-three-alert', 'Please enter both test name & test email');
        } else {
            hideAlert('campaign-step-three-alert');
            var payload_dict = getCampaignOptionOneInfo();

            $.ajax({
                url: BASE_URL + '/send',
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(payload),
                success: function(request){
                    alert('Email successfully sent');
                },
                error: function (request) {
                    alert('Contact Samir, something went wrong');
                }
            });

        }
    });

});

var showAlert = function(target_element, msg) {
    alert_target = '#' + target_element;
    $(alert_target + ' .alert-body').text(msg);
    $(alert_target).show();
}

var getCampaignOptionOneInfo = function() {
    payload = {
        template_name: $('#option-one-template').select().val(),
        subject: $('#option-one-subject').val(),
        sender_email: $('#sender-email').val(),
        sender_title: $('#sender-title').val(),
        reply_to_email: $('#reply-to-email').val(),
        track_opens: $('#opens-checkbox').is(':checked'),
        track_clicks: $('#clicks-checkbox').is(':checked'),
        important: $('#important-checkbox').is(':checked'),
        test_email: $('#send-test-email').val(),
        test_name: $('#send-test-name').val()
    }
    console.log(payload);
    
}

var hideAlert = function(target_element) {
    $('#' + target_element).hide();
}

var changeBackgroundColor = function(target_element, color) {
    alert_target = '#' + target_element;
    $(alert_target).css("background-color", '#' + color)
}

var changeBorderColor = function(target_element, color) {
    alert_target = '#' + target_element;
    $(alert_target).css("border", "2px solid " + '#' + color)
}

//General this to work for all...
var showEdit = function() {
    $('#campaign-step-one-validate').hide();
    $('#campaign-step-one-edit').show();
    $('#campaign-step-one-icon').show();
}

var showValidate = function() {
    $('#campaign-step-one-validate').show();
    $('#campaign-step-one-edit').hide();
    $('#campaign-step-one-icon').hide();
}


// Helper functions
var validateStepOne = function() {
    

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

var getCampaignInfo = function() {

}

var sendTestEmail = function() {

}

var showTestEmailResults = function() {

}

var sendCampaign = function() {

}