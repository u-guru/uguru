angular
	.module('sharedServices')
	.factory("CTAService", [
    '$timeout',
    CTAService
	]);

function CTAService($timeout) {
  var ctaParentDict = {};
  var ctaFuncDict = {};
  var ctaOptions = {duration: 0.2, extraTransitionDuration:0};
  var ctaCloseFuncDict = {};



  var showModalCTA = function(elem) {
    elem.classList.add('show');
  }

  var hideModalCTA = function(elem) {
    elem.classList.remove('show');
  }

  var showCTAManually = function(elem_id, cb) {
    console.log(ctaFuncDict);
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

  var bindCtaToBoxElem = function(box_elem, modal_elem, show_callback, box_selector) {
    ctaFuncDict[box_selector] = function() {

      ctaCloseFuncDict[box_selector]  = cta(box_elem, modal_elem, ctaOptions, function() {

        //show modal cta
        showModalCTA(modal_elem);
        // $timeout(function() { showModalCTA(modal_elem) });
        show_callback && show_callback(modal_elem);

        var modalCloseIcon = getModalCloseIcon(modal_elem);
        if (modalCloseIcon) {
          modalCloseIcon.addEventListener('click', function() {
            ctaCloseFuncDict[box_selector]();
            hideModalCTA(modal_elem);
          })
        }

      }, ctaParentDict[box_selector])

    }

    box_elem.addEventListener('click', ctaFuncDict[box_selector]);
  }

  var initSingleCTA = function(boxSelector, parentSelector, show_callback) {

    var parentElem = document.querySelector(parentSelector);
    var boxElem = document.querySelector(boxSelector);

    var modalElemId = boxElem && boxSelector.replace('.', '#').replace('box', 'modal');
    var modalElem = document.querySelector(modalElemId);
    //if both dont exist dont do anything
    if (!(parentElem && boxElem && modalElem)) {
      console.log('ERROR: Could not locate elems', boxSelector, parentSelector)
      return false;
    }
    ctaParentDict[boxSelector] = parentSelector;
    bindCtaToBoxElem(boxElem, modalElem, show_callback, boxSelector);


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