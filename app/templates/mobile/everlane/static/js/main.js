$(function () {
	$('#onboard-start').on('click', function(e) {
		$("#alerts").show();
		$("#status-bar").toggleClass("black");
		e.preventDefault();
	});
});