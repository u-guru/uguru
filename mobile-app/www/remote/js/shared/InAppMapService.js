angular
.module('sharedServices')
.factory("InAppMapService", [
	'University',
	'$timeout',
  	InAppMapService
	]);

function InAppMapService(University, $timeout) {


  return {

  	displayMap: displayMap
    
  };


  function displayMap() {

  	$timeout(function() {

		console.log("============================");
		console.log("============================");
		var div = document.getElementById("map_canvas_home");
		
		console.log("div of map_canvas_home below:");
		console.log(div);

		var map = plugin.google.maps.Map.getMap();

		map.setDiv(div);
		map.setClickable(false);

		
		var lat = parseFloat(University.selected.latitude);
		var lon = parseFloat(University.selected.longitude);

		// var latLng = new plugin.google.maps.LatLng(lat, lon);

		// map.animateCamera({
		//     target: {
		//         lat: lat,
		//         lon: lon
		//     },
		//     zoom: 15
		// });
// nc = {
// 	lat: 35.7846633,
// 	lng: -78.6820946
// }

stan = {
	lat: 37.4274745,
	lng: -122.169719
};
		console.log("compare");
		console.log(typeof lat);
		console.log(typeof stan.lat);

		map.moveCamera({
		  target: {
		    lat: 37.4274745,
		    lng: -122.169719
		  },
		  zoom: 15
		});

		map.addMarker({
		  'position': {
		  	lat: 37.4274745,
		    lng: -122.169719
		  },
		  'title': 'Google Tokyo!',
		  'icon': {
		    'url': 'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png'
		   }
		});

// point2
// 37.4326
// -122.1538
		// map.addPolyline({
		//   points: [
		//     HND_AIR_PORT,
		//     SFO_AIR_PORT
		//   ],
		//   'color' : '#AA00FF',
		//   'width': 10,
		//   'geodesic': true
		// }, function(polyline) {

		//   setTimeout(function() {
		//     polyline.remove();
		//   }, 3000);
		// });



		// var labels = null;
		// if (showLabels === true) {
		    map.addTileOverlay({
    		  // tileUrlFormat: 'http://maps.stamen.com/#toner/15/37.427474/-122.169719.png',
		       tileUrlFormat: 'http://maps.stamen.com/#toner/<zoom>/<x>/<y>.jpg',
		         zIndex: 6,
			      width: 256,
			      height: 256,
			      opacity: .5
		    }, function(TileLayer) {
		      console.log(TileLayer.getId()); // this works
		      TileLayer.setVisible(true); // this makes an error
		      console.log("Visibility: " + TileLayer.getVisible());
		      console.log("Opacity: " + TileLayer.getOpacity());
		      map.showDialog();
		      // return labels = TileLayer;
		    });
		// } else {
		//     labels.setVisible(false); // this makes an error
		//     labels.remove(); // this does nothing, but no error
		//     labels = null;
		// }

  	// map.addTileOverlay({
  	// 	titleUrlFormat: "http://maps.stamen.com/#toner/<zoom>/<x>/<y>.jpg"
  	// 	// tileUrlFormat: "http://maps.stamen.com/toner/#15/37.4274745/-122.169719"
  	// });

  	// map.setDiv(div);
  	// map.setClickable(false);
		// map.addTileOverlay({
		//   // <x>,<y> and <zoom> are replaced with values
		//   // tileUrlFormat: "http://maps.stamen.com/toner/<zoom>/<x>/<y>"
		//   tileUrlFormat: "http://maps.stamen.com/toner/#15/37.4274745/-122.169719"
		//   //tileUrlFormat: "http://tile.stamen.com/watercolor/<zoom>/<x>/<y>.jpg"
		// }, function(tileOverlay) {
		//   mTileOverlay = tileOverlay;
		//   map.showDialog();
		// });


		console.log("lat: " + lat);
		console.log("lon: " + lon);

		// var mapButton = document.getElementById('mapButton');
		// mapButton.display = 'none';

		var sideMenu = document.getElementsByTagName('ion-side-menu')[0];
		sideMenu.style.width = 0 + 'px';

  }, 500);

  }



}