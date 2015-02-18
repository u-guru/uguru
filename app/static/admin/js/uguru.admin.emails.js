$(document).ready(function() {
	getEmails();
});


function getEmails(){
	$.ajax({
		url: uguru_base_url + auth_token + "/emails",
		type: 'GET',
		dataType: 'json',
		success: function(data){
			var schools = data["emails"];
			for(i = 0; i < schools.length; i++){
				var school = schools[i];
				var name = school["name"];
				var totalCount = school["count"];
				var sent = school["sent"];
				var goal = school["goal"];
				var percent = sent/goal;
				var totalString = "Total number of students at " + name + ": " + totalCount;
				$('#emailProgressBar').append('<h3>' + totalString + '</h3>').append(
					$('<div>').attr('class','progress progress-striped progress-success active').append(
						$('<div>').attr({class : 'bar', style : 'width: ' + percent + '%;'})
					)
				).append('<p>Target number of students to contact: ' + goal + '</p>');
			}
		},
		error: function(err){
			console.log(err);
		}
	})
};