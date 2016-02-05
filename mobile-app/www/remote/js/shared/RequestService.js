angular
	.module('sharedServices')
	.factory("RequestService", [
		'Category',
    'CalendarService',
    RequestService
	]);

function RequestService(Category, CalendarService) {
  var _types = {DEFAULT:0, QUICK_QA:1}
  var MAX_REQUEST_HOURS = 10;


  function getMaxNumHourArr() {
    var result = [];
    for (var i = 0; i < MAX_REQUEST_HOURS; i++) {
      result.push(i)
    }
    return result;
  }

  function getRequestMapOptions() {
    return {
      zoomControl: false,
      draggable:true,
      minZoom: 15,
      streetViewControl:false,
      panControl:true,
      mapTypeControl: false
    }
  }

  function getDefaultMarker(lat, long, color) {
    return {
      idKey:1,
      coords: {latitude: lat, longitude: long},
      events: {dragend: onRequestMarkerDragEnd, click: onRequestMarkerClick},
      options: defaultMarkerOptions(color, "Location")
    }

    function defaultMarkerOptions(color, text) {
      return {
        animation: google.maps.Animation.DROP,
        icon: {url: generateUniversityImgDataURI(color, text), size: new google.maps.Size(170, 170), scaledSize: new google.maps.Size(100, 100)}
      }

      function generateUniversityImgDataURI(color, text) {
        var baseSVGURL = "<svg style='height:25px; width:25px;' viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + color + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + color +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='9' font-weight='600'><tspan x='10' y='32' fill='#FFFFFF'>" + text + "</tspan></text></svg>"
        return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
      }
    }

    function onRequestMarkerDragEnd() {
      return;
    }

    function onRequestMarkerClick() {
      return;
    }

  }

  function initStudentForm(slide_box, scope, lat, long, color) {
    console.log('subcategories', Category.getAcademic());
    return {
      course: null,
      urgent: true,
      subcategory: false,
      description: false,
      tags: [],
      subcategory: {selected: null, options: Category.getAcademic()},
      files: [],
      payment_card: null,
      calendar: null,
      time_estimate: {hours: null, minutes:null},
      position: {latitude: null, longitude: null},
      calendar: CalendarService.getNextSevenDaysArr(),
      scope: scope,
      map: {center: {latitude: lat, longitude: long}, options: getRequestMapOptions(), zoom:15, pan:true, control:{}, marker: getDefaultMarker(lat, long, color)},
      nav: {
        index: 3,
        next: function() {slide_box.enableSlide(true); slide_box.next(); slide_box.enableSlide(false); scope.requestForm.nav.index += 1},
        previous: function() {slide_box.enableSlide(true); slide_box.previous(); slide_box.enableSlide(false); scope.requestForm.nav.index -= 1},
        switchTo: function(index) {slide_box.enableSlide(true); slide_box.slide(index, 250); slide_box.enableSlide(false); scope.requestForm.nav.index = index},
      }
    }
  }
  return {
    initStudentForm:initStudentForm,
    getMaxNumHourArr: getMaxNumHourArr
  }

}