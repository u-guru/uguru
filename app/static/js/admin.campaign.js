// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

//Next Steps
// 1. When user 'validates', the forms should be disabled for that campaign
// 2. Add checkbox to 'Send AB test on Step 2 campaign'
// 3. By default, all the inputs on the right column, should be disabled.
// 4. If Jasmine checks, enable the right column inputs. Disable if she uncheks
// 5. Validate step 2 campaign the right way.
// 6. Generalize the show / edit mode

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
        showValidate();
        $("#campaign-batch-size").removeAttr("disabled");
        $("#selectError").removeAttr("disabled");

    });

    $('#campaign-step-two-validate').click(function() {
        alert('Step two clicked!');
    });

});

var showAlert = function(target_element, msg) {
    alert_target = '#' + target_element;
    $(alert_target + ' .alert-body').text(msg);
    $(alert_target).show();
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