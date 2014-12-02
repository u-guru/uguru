//JS Helper functions 
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function addToggleListener(toggle_id, toggle_text_id, toggle_label_text_on, toggle_label_text_off) {
    var elementExists = document.getElementById(toggle_id);
    if (! elementExists) {
        return;
    }
    document.querySelector('#' + toggle_id).addEventListener('toggle',
        function() {
            if (hasClass(this, 'active')) {
                document.getElementById(toggle_text_id).innerHTML = toggle_label_text_on;
            } else {
                document.getElementById(toggle_text_id).innerHTML = toggle_label_text_off;
            }
        }
    );
}

function show_element(element_id) {
    document.getElementById(element_id).style.display = 'block';
}

function hide_element(element_id) {
    document.getElementById(element_id).style.display = 'none';
}

addToggleListener('asap-toggle', 'asap-toggle-text', 'I need help ASAP', 'I need help later');

addToggleListener('remote-toggle', 'remote-toggle-text', 'In-person or online', 'In-person tutor only');

// Main Tab Bar Function
function updateMainTabBar(){
    if ($('.should-hide-tab-bar').length > 0) {
        $('#main-bar-tab').hide();
    }else{
        $('#main-bar-tab').show();
    }
}

function updateMessageFooter(){
    if ($('.should-hide-message-bar').length > 0) {
        $('#footer-message-bar').hide();
    }else{
        $('#footer-message-bar').show();
    }
}

function updateAllBars() {
    updateMainTabBar();
    updateMessageFooter();
}

// jQuery Shit
$(document).ready(function() {

    updateAllBars();
    window.addEventListener('push', function(){
        updateAllBars();
    });
    
    //Logout link
    $('#logout-link').on('touchstart', function(){
        window.location.replace('/m/logout/')
    });

    // Login Page
    $('#login-link').on('touchstart', function(){

        payload = JSON.stringify({
            email:$('#login-form #email-field').val(),
            password:$('#login-form #password-field').val()
        });

        $.ajax({
            url: '/api/v1/login',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "slide-in",
                    url : "/home/"
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('#submit-request-link').on('touchstart', function(){
        payload = JSON.stringify({
            'skill_name': 'CS10',
            'description': $('#request-description').val(),
            'time_estimate': $('#time-estimate-button-group button.active').index(),
            'phone_number': $('#request-phone').val(),
            'location': $('#request-location').val(),
            'remote': $('#remote-toggle').hasClass('active'),
            'urgency': $('#asap-toggle').hasClass('active'),
            'start_time': (new Date().getTime()).toString(),
        });

        console.log(payload);
        $.ajax({
            url: '/api/v1/requests',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                console.log(request);                
                if (request.errors) {
                    alert(request.errors[0])
                }
                // window.PUSH({
                //     transition : "slide-in",
                //     url : "/home/"
                // });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    // Signup Page Form
    $('#signup-link').on('touchstart', function(){

        payload = JSON.stringify({
            name     : $('#signup-form #name-field').val(),
            email    : $('#signup-form #email-field').val(),
            password : $('#signup-form #password-field').val()
        });

        $.ajax({
            url: '/api/v1/signup',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "slide-in",
                    url : "/home/"
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });
});