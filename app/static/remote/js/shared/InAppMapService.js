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
    
  }


  function displayMap() {

  	$timeout(function() {

		// console.log("============================");
		// console.log("============================");
		// var div = document.getElementById("map_canvas_home");
		
		// console.log("div of map_canvas_home below:");
		// console.log(div);

		// var map = plugin.google.maps.Map.getMap();

		// map.setDiv(div);
		// map.setClickable(false);

		
		// var lat = parseFloat(University.selected.latitude);
		// var lon = parseFloat(University.selected.longitude);

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
}
		console.log("compare");
		console.log(typeof lat);
		console.log(typeof stan.lat)

		// map.animateCamera({
		//   target: {
		//     lat: 37.4274745,
		//     lng: -122.169719
		//   },
		//   zoom: 15
		// });

		// console.log("lat: " + lat);
		// console.log("lon: " + lon);

		// var mapButton = document.getElementById('mapButton');
		// mapButton.display = 'none';

		// var sideMenu = document.getElementsByTagName('ion-side-menu')[0];
		// sideMenu.style.width = 0 + 'px';

  }, 500);

  }



}