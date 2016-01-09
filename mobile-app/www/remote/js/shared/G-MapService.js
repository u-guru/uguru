

angular
	.module('sharedServices')
	.factory("GMapService", [
		GMapService
	]);

function GMapService() {


  var initMapObj = function(university) {


    var dragEndMap = function(maps, event_name, drag_options) {
      console.log(maps, event_name, drag_options)
    }

    var getMostPopularCafe = function() {

    }

    var latitude = parseFloat(university.latitude);
    var longitude = parseFloat(university.longitude);
    return  {
                  center:  {latitude: latitude, longitude:longitude },
                  zoom: 16,
                  pan: false,
                  control: {},
                  events: {
                    dragend: dragEndMap
                  },
                  options: {
                    streetViewControl:false,
                    panControl:false,
                    zoomControl:false,
                    minZoom: 15,
                    maxZoom: 17,
                    mapTypeControl:false
                  }
            };
  }


  return {
    initMapObj:initMapObj
  }


}