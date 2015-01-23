// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

//Resources to have along the process
// 1. http://themifycloud.com/demos/templates/janux/ui.html
// 2. http://getbootstrap.com/2.3.2/base-css.html#forms
// 3. jquery docs (google it) 

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