// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

$(document).ready(function() {

    $('#update-ios-btn').click(function() {
        console.log('ios udpated button clicked');

        var payload = {'ios': $('#current-ios-version').val()}
        console.log(payload);
    
        $.ajax({
            url: BASE_URL + '/app/update',
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(request){
                
                $('#current-ios-version').val(request.version);
                $('#development-update-app-alert').text('iOS Version has been updated to ' + request.version);
                $('#development-update-app-alert').show();
            },
            error: function (request) {
                alert('Contact Samir, something went wrong');
            }
        });
    });

    $('#update-android-btn').click(function() {
        
        console.log('android updated button clicked');

        var payload = {'android': $('#current-android-version').val()}

    
        $.ajax({
            url: BASE_URL + '/app/update',
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(request){
                $('#development-update-app-alert').text('android Version has been updated to ' + request.version);
                $('#development-update-app-alert').show();
            },
            error: function (request) {
                alert('Contact Samir, something went wrong');
            }
        });

    });

});