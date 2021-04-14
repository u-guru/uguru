var BASE_API_URL = '/api/v2';

$(document).ready(function(){
	
	//testing purposes
	// $('#loginModal').modal();

	$('#login-school-submit').click(function() {
		var submitLoginPayload = {
			email: $('#school-email').val(),
			password: $('#school-password').val(),
			university: 'berkeley' //TODO: generalize for schools
		}

		//check if fields are filled in
		if (! submitLoginPayload.email || !submitLoginPayload.password) {
			$('#login-school-alert').text('Please fill in all fields');
			$('#login-school-alert').show();
			return;
		} 

		$('#login-school-alert').hide();
		console.log(submitLoginPayload);
		//submit to server
		$.ajax({
            url: generateBaseAPIUrl(submitLoginPayload.university),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(submitLoginPayload),
            success: function(request){
                console.log(request);
                window.location.replace('/' + request.school + '/' + request.server_id);
            },
            error: function (request) {
                $('#login-school-alert').text('Please fill in all fields');
				$('#login-school-alert').show();
            }
        });
	});

	$('#logout-user-button').click(function() {

		var userId = ($(this).data().userId).toString();
		var university = ($(this).data().universityName).toString().toLowerCase();
		console.log(userId);

		$.ajax({
            url: generateBaseAPIUrl(university) + '/' + userId,
            type: 'DELETE',
            contentType: 'application/json',
            success: function(request){
                window.location.replace('/' + request.school.toLowerCase() + '/');
            },
            error: function (request) {
                $('#login-school-alert').text('Please fill in all fields');
				$('#login-school-alert').show();
            }
        });
	});

	$('#fb-login-btn').on('click', function() {
	    FB.login(function(response) {
	      beginFbConnect();
	    });
	});

});

var generateBaseAPIUrl = function (university) {
	var url = BASE_API_URL + '/' + university + '/user';
	return url;
}