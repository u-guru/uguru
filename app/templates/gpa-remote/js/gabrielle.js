$(function() {
	$('.js-isotope').isotope({
		resizable: true,
		percentPosition: true,
		itemSelector: 'li',
		masonry: {
			columnWidth: 'li'
		}
	});
});