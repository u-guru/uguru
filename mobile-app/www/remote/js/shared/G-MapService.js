

angular
	.module('sharedServices')
	.factory("GMapService", [
		GMapService
	]);

function GMapService() {


  var initMapObj = function(university, arg_options) {


    var dragEndMap = function(maps, event_name, drag_options) {
      console.log(maps, event_name, drag_options)
    }

    var getMostPopularCafe = function() {

    }

    var latitude = parseFloat(university.latitude);
    var longitude = parseFloat(university.longitude);
    var optionsDict = {
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
                    scrollwheel: false,
                    mapTypeControl:false
                  }
            };

      if (arg_options) {
        optionsDict.options.minZoom = arg_options.minZoom;
        optionsDict.options.maxZoom = arg_options.maxZoom;
        optionsDict.zoom = arg_options.zoom;
        optionsDict.options.draggable = arg_options.draggable;
        optionsDict.options.disableDoubleClickZoom = arg_options.disableDoubleClickZoom;
      }

      return optionsDict;
  }


  return {
    initMapObj:initMapObj
  }


}