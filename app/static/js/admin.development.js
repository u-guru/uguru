// BASE_URL = "http://uguru-rest.herokuapp.com/api/admin/";
BASE_URL = "/api/admin";

$(document).ready(function() {


    $('#update-version-button').click(function() {
        console.log('version update button clicked');

        var payload = {
            'update': true,
            'message': $('#build-message').val(),
            'is_major': parseInt($('input[name=severityRadio]:radio:checked').val()) === 1,
            'is_minor': parseInt($('input[name=severityRadio]:radio:checked').val()) === 0,
            'type': parseInt($('input[name=buildTypeRadio]:radio:checked').val()),
            'is_android': $('input[name=androidCheckbox]').is(':checked'),
            'is_ios': $('input[name=iosCheckbox]').is(':checked')
        }
        $.ajax({
            url: BASE_URL + '/app/update',
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(request){

                window.location.replace('/admin/development/');
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
