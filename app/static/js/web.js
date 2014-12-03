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
    //TODO: Make this a PUSH EVENT
    $('body').on('touchstart', '#logout-link', function(){
        window.location.replace('/m/logout/');
    });


    // Login Page
    $('body').on('touchstart', '#login-link', function(){

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

    //Student cancels a request

    $('body').on('touchstart', '#cancel-link', function() {
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];
        
        payload = JSON.stringify({
            action:'cancel',
            description:$('#cancel-request-description').val()
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/guru/"
                });
                $('#cancelModal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', '#guru-accept-link', function() {
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];
        
        payload = JSON.stringify({
            action:'guru-accept',
            description:$('#guru-accept-description').val()
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/m/guru/"
                });
                $('#cancelModal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', 'a.guru-reject-link', function() {
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];
        
        payload = JSON.stringify({
            action:'guru-reject',
            description:$('#guru-reject-description').val()
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/m/guru/"
                });
                $('#reject-request-modal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    //Student creates a request
    $('body').on('touchstart', '#submit-request-link', function(){
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

        $.ajax({
            url: '/api/v1/requests',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                console.log(request);
                if (request.errors && request.redirect) {
                    if (request.redirect == 'no-tutors') {
                        window.PUSH({
                            transition : "fade",
                            url : "/show/no-tutors/"
                        });
                    }
                }
                else {
                    window.PUSH({
                        transition : "fade",
                        url : "/request/" + request['server_id'] +'/'
                    });
                }

                //Close modal
                $('#requestModal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    // Signup Page Form
    $('body').on('touchstart', '#signup-link', function(){
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