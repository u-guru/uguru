// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

//Resources to have along the process
// 1. http://themifycloud.com/demos/templates/janux/ui.html
// 2. http://getbootstrap.com/2.3.2/base-css.html#forms
// 3. jquery docs (google it) 

// When the page is completely loaded, call this function.
$(document).ready(function() {

    // Validates campaign step one when you click validate button 
    $('#campaign-step-one-validate').click(function() {
        
        var batch_input_value = $('#campaign-batch-size').val();
        

        // if batch_input_value is undefined
        if (!batch_input_value) {
            
            // $('#campaign-step-one-alert .alert-body').text('Please enter the batch size');
            // $('#campaign-step-one-alert').show();
            showAlert('campaign-step-one-alert', 'Please enter the batch size');
        } 

        //make sure input is a number
        else if (isNaN(batch_input_value)) {
            showAlert('campaign-step-one-alert', 'Please enter a number');
        }
        
        //validate is good!
        else {
            $('#campaign-step-one-alert').hide();
            console.log(batch_input_value);
        }

        //Do not show the validate button 
        //Show a edit button
        //Change the top background color of the bar 'Step 1: '
        //Add a Check icon to the top right of the top bar. 
        //If user clicks edit, then go back to original version

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