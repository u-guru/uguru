$(function () {
	$('#nav-features').not('active').on('click', function(e) {
		$(this).parent().addClass('active');
		$("#nav-deals").parent().removeClass('active');
		e.preventDefault();
	});
	$('#nav-deals').not('active').on('click', function(e) {
		$(this).parent().addClass('active');
		$("#nav-features").parent().removeClass('active');
		e.preventDefault();
	});
});