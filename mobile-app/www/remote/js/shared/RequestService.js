angular
	.module('sharedServices')
	.factory("RequestService", [
		'Category',
    'CalendarService',
    '$timeout',
    'LoadingService',
    'FileService',
    'CTAService',
    'uiGmapIsReady',
    'GUtilService',
    'Restangular',
    RequestService
	]);

function RequestService(Category, CalendarService, $timeout, LoadingService, FileService, CTAService, uiGmapIsReady, GUtilService, Restangular) {
  var _types = {DEFAULT:0, QUICK_QA:1}
  var MAX_REQUEST_HOURS = 10;
  var requestCancelTimeout;
  var constants = {GURU_ACCEPTED: 2}

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

  function getDefaultMarker(lat, long, color, scope) {
    return {
      idKey:1,
      coords: {latitude: lat, longitude: long},
      events: {dragend: onRequestMarkerDragEnd(scope)},
      options: defaultMarkerOptions(color, "Location")
    }

    function defaultMarkerOptions(color, text) {
      return {
        animation: google.maps.Animation.DROP,
        icon: {url: generateUniversityImgDataURI(color, text), size: new google.maps.Size(170, 170), scaledSize: new google.maps.Size(100, 100)},
        draggable: true
      }

      function generateUniversityImgDataURI(color, text) {
        var baseSVGURL = "<svg style='height:25px; width:25px;' viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + color + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + color +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='9' font-weight='600'><tspan x='10' y='32' fill='#FFFFFF'>" + text + "</tspan></text></svg>"
        return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
      }
    }

    function onRequestMarkerDragEnd(scope) {
      return function(marker, eventName, model) {
        var markerPos = marker.getPosition();
        var markerLat = markerPos.lat();
        var markerLng = markerPos.lng();
        GUtilService.getAddressFromLatLng(markerLat, markerLng, scope);
      }
    }

    function onRequestMarkerClick() {
      return;
    }

  }

  function acceptGuruForRequest(user_id, request, success, failure) {

      var payload = request;
      Restangular
        .one('user', user_id).one('sessions')
        .customPOST(JSON.stringify(payload))
        .then(sessionPostSuccess, sessionPostFailure);
      function sessionPostSuccess(user) {
        console.log('success - here is the user obj', user);
        success && success();
      }

      function sessionPostFailure(err) {
          console.log('error when sending request to form', err);
          failure && failure();
      }
  }

  function acceptStudentRequest(user_id, proposal, success, failure) {

    var payload = proposal;
    Restangular
        .one('user', user_id).one('requests')
        .customPUT(JSON.stringify(payload))
        .then(proposalPUTSuccess, proposalPUTFailure);

    function proposalPUTSuccess(user) {
      console.log('success - here is the user obj', user);
      success && success();
    }

    function proposalPUTFailure(err) {
        console.log('error when sending request to form', err);
        failure && failure();
    }
  }

  function setRequestTimeEstimateHours(form, value) {
    form.time_estimate.hours = value;
    form.time_estimate.showHours = false;
  }

  function setRequestTimeEstimateMinutes(form, value) {
    form.time_estimate.minutes = value;
    form.time_estimate.showMinutes = false;
  }

  function toggleHoursDropdown(form) {
    form.time_estimate.showMinutes = false;
    form.time_estimate.showHours = !form.time_estimate.showHours;
  }

  function toggleMinutesDropdown(form) {
    form.time_estimate.showHours = false;
    form.time_estimate.showMinutes = !form.time_estimate.showMinutes;
  }

  function confirmRequest(form) {
    requestCancelTimeout = $timeout(function() {
      var modalElem = document.getElementById("cta-modal-student-request");
      if (modalElem) {
        modalElem.classList.remove('show');
        LoadingService.showSuccess('Request Successfully Submitted', 2000);
      }
    }, 5000)
    var requestContainerDiv = document.querySelector('#request .desktop-tab-header');
    form.nav.next();
    if (requestContainerDiv) {
      requestContainerDiv.classList.add('request-confirming')
      requestContainerDiv.classList.remove('request-canceling')
    }
    var requestPayload = formatRequestFormForServer(form);
    sendRequestToServer(requestPayload);
  }

  function formatRequestFormForServer(form) {
    if (form.calendar_selected_ranges && form.calendar_selected_ranges.length) {
      for (var i = 0; i < form.calendar_selected_ranges.length; i++)   {
        var indexRange = form.calendar_selected_ranges[i];
        indexRange.ranges = null;
      }
    }

    return {
      category: {name: form.category.name, id:form.category.id},
      subcategory: {name: form.subcategory.name, id:form.subcategory.id},
      tags: form.tags.list,
      files: form.files,
      description: form.description.content,
      calendar: form.calendar_selected_ranges,
      location: {coords: form.location, address: form.address},
      payment_card: form.payment_card,
      time_estimate: {hours: form.time_estimate.hours, minutes: form.time_estimate.minutes},
      proposed_price: form.price.selected,
      timezone: new Date().getTimezoneOffset(),
      user: form.scope.user,
    }
  }

  function sendRequestToServer(payload) {
    var userObj = payload.user;
    payload.user = null;
    console.log('requestObj', payload);
    console.log('userObj', userObj);
    Restangular
        .one('user', userObj.id).one('requests')
        .customPOST(JSON.stringify(payload))
        .then(requestPostSuccess, requestPostError);
  }

  function requestPostSuccess(user) {
    console.log('success - here is the user obj', user);
  }

  function requestPostError(err) {
      console.log('error when sending request to form', err);
  }

  function cancelRequest(form) {
    //
  }

  function cancelRequest(form) {
    clearTimeout(requestCancelTimeout);
    var requestContainerDiv = document.querySelector('#request .desktop-tab-header');
    form.nav.previous();
    if (requestContainerDiv) {
      requestContainerDiv.classList.remove('request-confirming');
      requestContainerDiv.classList.add('request-canceling');
    }
  }

  function focusRequestPriceInput(scope) {
    return function() {
      if (scope.requestForm.price.proposed_options.indexOf(scope.requestForm.price.selected) > -1) {
        scope.requestForm.price.selected = null;
      };
    }
  }


  function initStudentForm(slide_box, scope, lat, long, color) {
    $timeout(function() {
      FileService.initDropzoneFromSelector('#request-form-file-uploader', scope);
    }, 1000);
    $timeout(function() {initGmapListener(scope, lat, long)});
    return {
      course: null,
      addCourse: addCourseFromRequestForm,
      urgent: true,
      category: {},
      subcategory: {},
      address: '',
      location: {latitude: null, longitude:null},
      setCategory: setRequestFormCategory,
      description: {content: '', placeholder: 'add details about your request here', showSaved: showDescriptionTextareaSaved, maxLength: 500, saved:false},
      tags: {list:[], add: addTagToRequestList, remove:removeTagFromTagList, showError:false, empty_tag: {placeholder:"+   add a tag", content: ''}},
      subcategory: {selected: null, options: Category.getAcademic()},
      files: [],
      price: {proposed_options: [0, 5, 10], selected:10, custom_selected:false, showInput: false, focus: focusRequestPriceInput(scope)},
      payment_card: null,
      calendar: null,
      calendar_selected: [],
      calendar_selected_by_day: [],
      calendar_selected_ranges: [],
      calendarGetSelected: CalendarService.getCalendarSelected(),
      time_estimate: {hours: 1, minutes:30, showHours:false, showHoursToggle: toggleHoursDropdown, showMinutesToggle: toggleMinutesDropdown, showMinutes:false, setHours:setRequestTimeEstimateHours, setMinutes:setRequestTimeEstimateMinutes},
      position: {latitude: null, longitude: null},
      calendar: CalendarService.getNextSevenDaysArr(),
      scope: scope,
      map: {center: {latitude: lat, longitude: long}, options: getRequestMapOptions(), zoom:15, pan:true, control:{}, marker: getDefaultMarker(lat, long, color, scope)},
      nav: {
        index: 0,
        next: function() {slide_box.enableSlide(true); slide_box.next(); slide_box.enableSlide(false); scope.requestForm.nav.index += 1; if (scope.requestForm.nav.index === 3) {scope.requestForm.calendarGetSelected(scope)}},
        previous: function() {slide_box.enableSlide(true); slide_box.previous(); slide_box.enableSlide(false); scope.requestForm.nav.index -= 1},
        switchTo: function(index) {slide_box.enableSlide(true); slide_box.slide(index, 250); slide_box.enableSlide(false); scope.requestForm.nav.index = index},
      },
      confirm: validate,
      cancel: cancelRequest,
    }

    function showDescriptionTextareaSaved() {
      scope.requestForm.description.saved = true;
      $timeout(function() {
        scope.requestForm.description.saved = false;
      }, 2000)
    }

    function validate(requestForm) {
      console.log('validating...');
      var errorArr = validateRequestForm(requestForm);
      if (!errorArr.length) {
        confirmRequest(requestForm);
      } else {
        var errString = "";
        for (var i = 0; i < errorArr.length; i++) {
          var indexError = errorArr[i];
          if (i !== errorArr.length - 2) {
            errString += indexError + ", ";
          } else {
            errString += " and " + indexError;
          }
        }
        LoadingService.showMsg(errString, 3000);
      }


      function validateRequestForm(requestForm) {
        errorArr = [];
        if (!requestForm.category || !requestForm.category.name || !requestForm.category.name.length) {
          errorArr.push('category')
        }
        if (!requestForm.subcategory || !requestForm.subcategory.name || !requestForm.subcategory.name.length) {
          errorArr.push('subcategory')
        }
        if (!requestForm.description.content || !requestForm.description.content.length) {
          errorArr.push('description')
        } if (!requestForm.calendar_selected.length) {
          errorArr.push('availability')
        }
        if (!requestForm.location|| !requestForm.location.latitude || !requestForm.location.longitude) {
          errorArr.push('location')
        }
        if (!requestForm.payment_card) {
          errorArr.push('payment card');
        }

        if ((!requestForm.price.selected && requestForm.price.selected !== 0)) {
          errorArr.push('proposed price')
        }
        return errorArr;
      }
    }

    function removeTagFromTagList(index) {
      if (scope.requestForm.tags.list && scope.requestForm.tags.list.length) {
        scope.requestForm.tags.list.splice(index, 1);
      }
    }

    function initGmapListener(scope, lat, lng) {
      uiGmapIsReady.promise(1).then(function(instances) {
        if (instances.length === 1 && instances[0].map) {
          var requestMap = instances[0].map;
          var coords = {latitude: lat, longitude: lng};
          var types =['library', 'school', 'establishment', 'sublocality', 'store', 'food', 'university', 'cafe'];
          var radius = 500;
          // GUtilService.coordsToNearestPlace(requestMap, coords, scope.requestForm, types, radius);
          GUtilService.getAddressFromLatLng(lat, lng, scope);
        }
          // instances.forEach(function(inst) {
          //     var map = inst.map;
          //     var uuid = map.uiGmap_id;
          //     var mapInstanceNumber = inst.instance; // Starts at 1.
          // });
      });
    }

    function addTagToRequestList($event) {
      if (scope.requestForm.tags.list) {
        var tagContent = scope.requestForm.tags.empty_tag.content;
        if (tagContent.length > 3) {
          scope.requestForm.tags.list.push({name: tagContent});
          scope.requestForm.tags.empty_tag.content = '';
        } else {
          scope.requestForm.tags.showError = true;
          $timeout(function() {
            scope.requestForm.tags.showError = false;
          }, 2500);
        }
      }
    }

  }

  function setRequestFormCategory(requestForm, subcategory) {
    requestForm.subcategory = subcategory;
    requestForm.subcategory.hex_color = requestForm.category.hex_color;
    requestForm.nav.next();
  }

  function addCourseFromRequestForm() {
    // initSingleCTA = function(boxSelector, parentSelector, show_callback)
    CTAService.initSingleCTA("#cta-box-request-courses", "#request main.relative");
  }

  return {
    initStudentForm:initStudentForm,
    getMaxNumHourArr: getMaxNumHourArr,
    acceptStudentRequest: acceptStudentRequest,
    constants:constants,
    acceptGuruForRequest: acceptGuruForRequest
  }

}