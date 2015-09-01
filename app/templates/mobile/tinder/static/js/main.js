$(function () {
	$('#facebook').on('click', function(e) {
		$("#matches").fadeIn(500, function(){
			$("#loc-one").animate({
				width:"600px",
				height:"600px"
				}, 200, function(){
					$("#loc-two").animate({
						width:"500px",
						height:"500px"
					}, 200);
				}
			);
		});
		e.preventDefault();
	});
});