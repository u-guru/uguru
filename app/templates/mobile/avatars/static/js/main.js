$(function () {
	$('#login-enter').on('click', function(e) {
		$("#login, #login-bar").fadeOut(400);
		$("#account-bar").fadeIn(400).css("display", "flex");
		$("#account").fadeIn(400);
		e.preventDefault();
	});
});