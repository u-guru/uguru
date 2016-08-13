angular
	.module('uguru.shared.services')
	.factory('CTAService', [
    '$timeout',
    CTAService
	]);

function CTAService($timeout) {
  var ctaParentDict = {};
  var ctaFuncDict = {};
  var ctaOptions = {duration: 0.2, extraTransitionDuration:0};
  var ctaCloseFuncDict = {};
  var ctaKeyCodeMappings = {'esc': 27};

  var showModalCTA = function(elem) {
    elem.classList.add('show');
  }

  var hideModalCTA = function(elem) {
    elem.classList.remove('show');
  }

  var showCTAManually = function(elem_id, cb) {
    var func = ctaFuncDict[elem_id];
    func && func();
    cb && cb();
  }

  var closeCTAManually = function(elem_id, cb) {
    var func = ctaCloseFuncDict[elem_id];

    func && func();
    cb && cb();
  }

  var getModalCloseIcon = function(elem) {
    return elem.querySelector('.cta-modal-close');
  }

  var bindCtaToBoxElem = function(box_elem, modal_elem, show_callback, box_selector, key_triggers) {
    key_triggers = key_triggers || [];
    ctaFuncDict[box_selector] = function() {
      // ctaCloseFuncDict[box_selector]  = cta(box_elem, modal_elem, ctaOptions, function() {

      //   //show modal cta
      //   showModalCTA(modal_elem);
      //   // $timeout(function() { showModalCTA(modal_elem) });

      //   $timeout(function() {
      //     show_callback && show_callback(modal_elem);
      //   })
      //   var modalCloseIcon = getModalCloseIcon(modal_elem);
      //   if (modalCloseIcon) {
      //     modalCloseIcon.addEventListener('click', function() {

      //       ctaCloseFuncDict[box_selector]();
      //       hideModalCTA(modal_elem);
      //     });
      //   }

      //   window.addEventListener('keydown', function(evt) {
      //     evt = evt || window.event;
      //     for (var i = 0; i < key_triggers.length; i++) {
      //       var indexKey = key_triggers[i];
      //       if (indexKey in ctaKeyCodeMappings && ctaKeyCodeMappings[indexKey] === evt.keyCode) {
      //           ctaCloseFuncDict[box_selector]();
      //           hideModalCTA(modal_elem);
      //       }
      //     }
      //   });

      // }, ctaParentDict[box_selector])

    }

    box_elem.addEventListener('click', ctaFuncDict[box_selector]);
  }

  var initSingleCTA = function(boxSelector, parentSelector, show_callback, eventTriggers) {
    var parentElem = document.querySelector(parentSelector);
    var boxElem = document.querySelector(boxSelector);

    var modalElemId = boxElem && boxSelector.replace('.', '#').replace('box', 'modal');
    var modalElem = document.querySelector(modalElemId);

    // Debug use
    // if(modalElemId =='#cta-modal-request-courses'){
    //     console.log('parentElem',parentElem)
    //     console.log('boxElem',boxElem)
    //     console.log('modalElemId',modalElemId)
    //     console.log('modalElem',modalElem)

    // }

    //if both dont exist dont do anything
    if (!(parentElem && boxElem && modalElem)) {
      return false;
    }
    ctaParentDict[boxSelector] = parentSelector;
    bindCtaToBoxElem(boxElem, modalElem, show_callback, boxSelector, eventTriggers);


  }

  var initArrCTASharedParent = function(parentRef, elem_arr, cb_dict) {
    if (!cb_dict) {
      cb_dict = {};
    }
    if (!elem_arr || !elem_arr.length || !parentRef) return;
    for (var i = 0; i < elem_arr.length; i++) {
      var elemRef = elem_arr[i];
      initSingleCTA(elemRef, parentRef, cb_dict[elemRef])
    }
  }

  return {
    initSingleCTA:initSingleCTA,
    initArrCTASharedParent:initArrCTASharedParent,
    showCTAManually:showCTAManually,
    closeCTAManually: closeCTAManually
  }

}