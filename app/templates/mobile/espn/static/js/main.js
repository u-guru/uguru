$(function () {
	$('#login button, #login a').on('click', function(e) {
		$("#login, #login-bg").fadeOut(400);
		$("#scores").fadeIn(400);
		$("#status-bar").addClass("black");
		e.preventDefault();
	});
});