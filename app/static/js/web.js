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


    //Student cancels a request
    $('body').on('touchstart', '#cancel-link', function() {
        var request_id = ($('#cancel-link').data().requestId).toString();
        
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
                    url : "/home/"
                });
                $('#cancelModal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', '#student-reject-guru-link', function() {
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];
        
        payload = JSON.stringify({
            action:'student-reject',
            description:$('#student-reject-guru-description').val()
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/request/" + request_id + '/'
                });
                $('#student-reject-tutor-modal').removeClass('active');
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    $('body').on('touchstart', '.guru-confirm-session', function() {
        
        var request_id = ($(this).data().requestId).toString();
        var num_hours = parseInt($('#confirm-hours-' + request_id).val(), 10);
        var num_minutes = parseInt($('#confirm-minutes-' + request_id).val(), 10);

        payload = JSON.stringify({
            action:'guru-confirm',
            minutes: num_minutes,
            hours: num_hours
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
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    //Student accepts a guru
    $('body').on('touchstart', '#student-accept-guru-link', function() {
        
        url_components = window.location.pathname.split( '/' );
        request_id = url_components[url_components.length - 2];

        payload = JSON.stringify({
            action:'student-accept',
        });

        $.ajax({
            url: '/api/v1/requests/' + request_id,
            type: 'PUT',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/home/"
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    //Send Message
    $('body').on('touchstart', '#send-message-link', function() {
        
        var convo_id = ($('#message-content-div').data().convoId).toString();
        var user_id = ($('#message-content-div').data().userId).toString();

        post_url = '/api/v1/users/' + user_id + '/conversations/' +
            convo_id + '/messages';

        payload = JSON.stringify({
            contents: $('#message-contents').val()
        });

        $.ajax({
            url: post_url,
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function(request){
                window.PUSH({
                    transition : "fade",
                    url : "/guru/conversation/" + convo_id
                });
            },
            error: function (request) {
                alert(request.responseJSON['errors']);
            }
        });
    });

    // Guru upload photo link
    $('body').on('touchstart', '#upload-photo-link', function(e) {
      e.preventDefault();
      $('#upload-photo').trigger('click');
    });


    $('body').on('change', '#upload-photo', function(){
      var file = this.files[0];
      //TODO Cam: Can we validate this properly?
      if (file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
        alert("File doesnt match png, jpg, or gif");
      } else {
        readURL(this);
        var formData = new FormData();
        formData.append('file', file);
        $.ajax({
          url:'/update-profile/',
          type: 'POST',
          data: formData,
          cache: false,
          contentType: false,
          processData: false
        });
      }
    });

    $('body').on('touchstart', '#profile-title-bar-icon', function(){
        window.PUSH({
            transition : "slide-in",
            url : "/profile/"
        });
    });

    // Request Form /request_form/
    $('body').on('touchstart', '#request-location-in-person', function(){
        $('#request-location').show(10);
    });
    $('body').on('touchstart', '#request-location-online', function(){
       $('#request-location').hide(10);
    });
    $('body').on('touchend', '#asap-toggle', function(){
        var isSelected = !$('#asap-toggle').hasClass('active');
        if (isSelected) {
            $('#request-time-selection-cell').hide(10);
        }else{
            $('#request-time-selection-cell').show(10);
        }
    });
    $('body').on('touchstart', '#time-segment-1', function(){
        $('#request-estimated-cost').text("$5");
    });
    $('body').on('touchstart', '#time-segment-2', function(){
        $('#request-estimated-cost').text("$10");
    });
    $('body').on('touchstart', '#time-segment-3', function(){
        $('#request-estimated-cost').text("$20");
    });
    $('body').on('touchstart', '#time-segment-4', function(){
        $('#request-estimated-cost').text("$40");
    });

    $('body').on('touchstart', '#submit-button', function () {
        $('#submit-button').hide();
        $('#confirm-button').show();
    });

});
// end document ready

function updateAllBars() {
    updateMainTabBar();
    updateMessageFooter();
}

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



// Grab incoming photo inject it into page 
// while s3 is uploading the photo
function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#upload-photo-link').hide();
          $('#guru-profile-photo').show();
          $('#guru-profile-photo').css('background', '(url' + e.target.result + ')');
        };

        reader.readAsDataURL(input.files[0]);
      }
    }