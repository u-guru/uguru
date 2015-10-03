angular
.module('sharedServices')
.factory("MapService", [
	MapService
		]);

function MapService() {

	return {
		initMap: initMap
	}


	function initMap(options) {

		function initialize() {
			var map;

			var featureOpts = options.styles;

			var universityLocation = new google.maps.LatLng(options.latitude, options.longitude);

			var mapOptions = {
			    zoom: options.zoom,
			    center: universityLocation,
			    mapTypeControl: false,
			    scrollwheel: options.scrollWheel,
			    zoomControl: options.zoom,
			    mapTypeId: "custom_style",
			    streetViewControl: false,
			    zoomControl:false
			  };

			svgLocation = new google.maps.LatLng(options.icons[0].latitude, options.icons[0].longitude);

			// Should be a map of current location; if not, then map of chosen school
			// Remove most labels unless school-related (don't need them)
			// Remove all controls (zoom, move, etc)

			map = new google.maps.Map(document.getElementById(options.elemId),
			      mapOptions);

			var customMapType = new google.maps.StyledMapType(featureOpts);

		  	var infowindow = new google.maps.InfoWindow({
		      	content: options.infoWindowHtml
		  	});

			var icon = {
			    path: options.icons[0].path,
			    fillColor: options.icons[0].fillColor,
			    fillOpacity: options.icons[0].opacity,
			    anchor: new google.maps.Point(0,0),
			    strokeWeight: options.icons[0].strokeWeight,
			    scale: options.icons[0].scale,
				labelClass: options.icons[0].labelClass
			  }

		  	var marker = new MarkerWithLabel({
		    	position: svgLocation,
		      	map: map,
		      	draggable: false,
		      	icon: options.icons[0],
		      	title: options.icons[0].title,
		      	labelClass: options.icons[0].labelClass
		  	});

		  	map.mapTypes.set('custom_style', customMapType);


		}

	  	google.maps.event.addDomListener(window, 'load', initialize);

		google.maps.event.addDomListener(window, "resize", function() {

				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
			 	map.setCenter(center);
		});

	}

}