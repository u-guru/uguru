// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

$(document).ready(function() {

    $('#campaign-step-one-validate').click(function() {
        
        var batch_input_value = $('#campaign-batch-size').val();
        
        if (!batch_input_value) {
            showAlert('campaign-step-one-alert', 'Please enter the batch size');
        } 

        else if (isNaN(batch_input_value)) {
            showAlert('campaign-step-one-alert', 'Please enter a number');
        }
        
        else {
            $('#campaign-step-one-alert').hide();
            console.log(batch_input_value);
            changeBackgroundColor("campaign-step-one-background","65C939");
            changeBorderColor("campaign-step-one-border","65C939");
            showEdit("one");
            $("#campaign-batch-size").attr({ 
              disabled: ""
            });
            $("#selectError").attr({ 
              disabled: ""
            });
        }
    });

    $('#campaign-step-one-edit').click(function() {
        
        changeBackgroundColor("campaign-step-one-background","578EBE");
        changeBorderColor("campaign-step-one-border","578EBE");
        showValidate("one");
        $("#campaign-batch-size").removeAttr("disabled");
        $("#selectError").removeAttr("disabled");

    });

    // $('#campaign-step-two-validate').click(function() {
    //     alert('Step two clicked!');
    // });

    $('#send-test-campaign-button').click(function() {
        if (!$('#send-test-email').val() || !$('#send-test-name').val()) {
            showAlert('campaign-step-three-alert', 'Please enter both test name & test email');
        } else {
            hideAlert('campaign-step-three-alert');
            
            var campaignOptionSelected = $("input[name=sendTestRadio]:radio:checked").val();

            //if jasmine chose campaign A
            if (campaignOptionSelected === 'campaignA') {
                var payload_dict = getCampaignOptionOneInfo();
            } else {
                var payload_dict = getCampaignOptionTwoInfo();
            }

            $.ajax({
                url: BASE_URL + '/send',
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(payload),
                success: function(request){
                    showAlert('campaign-step-three-alert-success', 'Your email has successfully sent!');
                },
                error: function (request) {
                    alert('Contact Samir, something went wrong');
                }
            });

        }
    });
    $("input[type=checkbox]").on( "click", adminChecked );

    $("input[name=sendTestRadio]:radio").change(function () {
        if ($(this).val() === 'campaignB') {
            //check if the AB test is enabled, if not show an alert
            if (!$('#ab-test-checkbox').is(':checked')) {
                showAlert('campaign-step-three-alert', 'Please enter Subject & Choose Template for Campaign B');
            }
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
    return payload
    
}

var getCampaignOptionTwoInfo = function() {
    payload = {
        template_name: $('#option-two-template').select().val(),
        subject: $('#option-two-subject').val(),
        sender_email: $('#sender-email').val(),
        sender_title: $('#sender-title').val(),
        reply_to_email: $('#reply-to-email').val(),
        track_opens: $('#opens-checkbox').is(':checked'),
        track_clicks: $('#clicks-checkbox').is(':checked'),
        important: $('#important-checkbox').is(':checked'),
        test_email: $('#send-test-email').val(),
        test_name: $('#send-test-name').val()
    }
    return payload;
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
var showEdit = function(num) {
    $('#campaign-step-' + num + '-validate').hide();
    $('#campaign-step-' + num + '-edit').show();
    $('#campaign-step-' + num + '-icon').show();
}

var showValidate = function(num) {
    $('#campaign-step-' + num + '-validate').show();
    $('#campaign-step-' + num + '-edit').hide();
    $('#campaign-step-' + num + '-icon').hide();
}

var adminChecked = function() {
    if($(this).prop('checked')) {
        removeAttr("testbInput","disabled");
        removeAttr("testbSelect","disabled");
    }
    else {
        attrDisable('testbInput');
        attrDisable('testbSelect');

        $("#testbInput").val('');
        $("#testbSelect").val('');

    }
}

var attrDisable = function(target_element) {
    $("#" + target_element).attr({
        disabled: ""
    });
}

var removeAttr = function(target_element, remove_element) {
    $("#" + target_element).removeAttr(remove_element);
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