// jQuery Shit
window.addEventListener('push', function(){
    updateAllBars();

    // We NEED this for all ajax calls to work on mobile
    var scriptsList = document.querySelectorAll('script');
    for(var i = 0; i < scriptsList.length; ++i) {
        eval(scriptsList[i].innerHTML);
    }
});


$(document).ready(function() {
    updateAllBars();

    //Extra handlers to imitate mobile

    $('body').on('click', '.control-item', function() {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
    });

    //Logout link
    //TODO: Make this a PUSH EVENT
    $('body').on('touchstart', '#logout-link', function(){
        window.location.replace('/m/logout/');
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
                    url : "/m/home/"
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
                    url : "/m/guru/conversation/" + convo_id
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
            url : "/m/profile/"
        });
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