angular.module('sharedServices')
.factory('InAppBrowser', [
	'DeviceService',
	InAppBrowser
	]);

function InAppBrowser(DeviceService) {

	var browser = {
		open: open
	}

	return browser;

	function open(url, title) {

		var device = DeviceService.getDevice();
		var options = 'location=no,hidden=no';
	        if (device === 'android') {
	          options += ',hardwareback=no';
	          options += ',zoom=no';
	        }
	        options+= ',clearcache=yes';
	        options+= ',clearsessioncache=yes';

	        console.log("options: " + options);

	    var target = '_blank';

		var ref = cordova.InAppBrowser.open(url, target, options);

		ref.addEventListener('loadstop', addHeader);

		function addHeader() {
		  
		  ref.insertCSS({
		    code: '#intercom-launcher {display:none !important;}'
		    });

		  var styleScript = 
  			'var header = document.getElementById("top"); \
		      document.getElementById("top").style.backgroundColor = "#2B3234"; \
		      document.querySelectorAll("#top-menu ul li a")[0].setAttribute("class", ""); \
		      document.querySelectorAll("#top-menu ul li a span")[0].textContent = "' + title + '"; \
		      document.querySelectorAll("#top-menu ul li a span")[0].style.color = "white"; \
		      document.querySelectorAll("#top-menu ul li")[0].style.textAlign = "center"; \
		      document.querySelectorAll("#top-menu ul li")[1].parentNode.removeChild(document.querySelectorAll("#top-menu ul li")[1]); \
		      document.querySelectorAll("#top-menu ul li")[1].parentNode.removeChild(document.querySelectorAll("#top-menu ul li")[1]);';

		  ref.executeScript({
		    code: styleScript
		    }, function() {
		  });

		}

		// function replaceHeaderImage() {
		//     iabRef.executeScript({
		//         code: "var img=document.querySelector('#header img'); img.src='http://cordova.apache.org/images/cordova_bot.png';"
		//     }, function() {
		//         alert("Image Element Successfully Hijacked");
		//     });
		// }

	}
		
}
      
        

        







