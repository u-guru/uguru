//show loader if dom is not loaded
var onDomLoadSuccess = function() {
	setTimeout(function() {
		bodyLoadingDiv.parentNode.removeChild(bodyLoadingDiv);
	}, 2000);
}
// how to create angular
// 1. Render the dom once