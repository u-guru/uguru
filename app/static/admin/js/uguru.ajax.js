function getUsers() {
	$.ajax({
		url: uguru_base_url + auth_token + "/users",
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
}

function createNewCampaign(){
	var templateName = $('#templateName').val();
	var subject = $('#subject').val();
	var senderEmail = $('#senderEmail').val();
	var senderTitle = $('#senderTitle').val();
	var replyEmail = $('#replyEmail').val();

	var trackOpens = false;
	if($('#trackOpens').attr('checked') == 'checked'){
		trackOpens = true;
	}

	var trackClicks = false;
	if($('#trackClicks').attr('checked') == 'checked'){
		trackClicks = true;
	}

	var important = false;
	if($('#important').attr('checked') == 'checked'){
		important = true;
	}

	var testEmail = $('#testEmail').val();
	var testName = $('#testName').val();

	var allData = {
		"template_name" : templateName,
		"subject" : subject,
		"sender_email" : senderEmail,
		"sender_title" : senderTitle,
		"reply_to_email": replyEmail,
		"track_opens": trackOpens,
		"track_clicks" : trackClicks,
		"important" : important,
		"test_email" : testEmail,
		"test_name" : testName
	}

	console.log(allData);

	$.ajax({
		url: uguru_base_url + auth_token + "/send_test",
		type: 'POST',
		dataType: 'json',
		data: allData,
		success: function(resp){
			alert("Success!!");
			console.log(resp);
		},
		error: function(err){
			alert("Error!");
			console.log(err);
		}
	});
}
