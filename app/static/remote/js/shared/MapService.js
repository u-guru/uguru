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

			// Should be a map of current location; if not, then map of chosen school
			// Remove most labels unless school-related (don't need them)
			// Remove all controls (zoom, move, etc)

			map = new google.maps.Map(document.getElementById(options.elemId),
			      mapOptions);

			var customMapType = new google.maps.StyledMapType(featureOpts);

		  	var infowindow = new google.maps.InfoWindow({
		      	content: options.infoWindowHtml
		  	});

		  	for (var i = 0; i < options.icons.length; i++) {
		  		var icon = options.icons[i];
			    var svgLocation = new google.maps.LatLng(icon.latitude, icon.longitude);
			    
			  //   markerIcon = {

				 //    path: icon.path,
				 //    fillColor: icon.fillColor,
				 //    fillOpacity: icon.opacity,
				 //    anchor: new google.maps.Point(i,0),
				 //    strokeWeight: icon.strokeWeight,
				 //    scale: icon.scale,
					// labelClass: icon.labelClass

			  //   }

			    var marker = new MarkerWithLabel({
			    	position: svgLocation,
			      	map: map,
			      	draggable: false,
			      	icon: icon,
			      	title: icon.title,
			      	labelClass: icon.labelClass
		  		});

		  	}

			

		  	

		  	map.mapTypes.set('custom_style', customMapType);


		}

	  	// google.maps.event.addDomListener(window, 'load', );
	  	initialize();

		google.maps.event.addDomListener(window, "resize", function() {

				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
			 	map.setCenter(center);
		});

	}

}