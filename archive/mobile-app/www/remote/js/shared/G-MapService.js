

angular
	.module('sharedServices')
	.factory("GMapService", [
		GMapService
	]);

function GMapService() {


  var initMapObj = function(university, arg_options) {


    var dragEndMap = function(maps, event_name, drag_options) {
      return
    }

    var getMostPopularCafe = function() {

    }

    var latitude = parseFloat(university.latitude);
    var longitude = parseFloat(university.longitude);
    var optionsDict = {
                  center:  {latitude: arg_options.latitude || latitude, longitude: arg_options.longitude || longitude },
                  zoom: 16,
                  pan: false,
                  rebuildMarkers: false,
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
        optionsDict.options.styles = arg_options.style;
        optionsDict.zoom = arg_options.zoom;
        optionsDict.options.zoomControl = arg_options.zoomControl;
        optionsDict.options.draggable = arg_options.draggable;
        optionsDict.options.disableDoubleClickZoom = arg_options.disableDoubleClickZoom;
      }

      return optionsDict;
  }


  return {
    initMapObj:initMapObj
  }


}