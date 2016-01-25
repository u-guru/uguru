angular
	.module('sharedServices')
	.factory("CTAService", [
    '$timeout',
    CTAService
	]);

function CTAService($timeout) {
  var ctaParentDict = {};
  var ctaFuncDict = {};
  var ctaOptions = {duration: 0.5, extraTransitionDuration:1};



  var showModalCTA = function(elem) {
    elem.classList.add('show');
  }

  var hideModalCTA = function(elem) {
    elem.classList.remove('show');
  }

  var getModalCloseIcon = function(elem) {
    return elem.querySelector('.cta-modal-close');
  }

  var bindCtaToBoxElem = function(box_elem, modal_elem, show_callback) {
    ctaFuncDict[box_elem.id] = function() {

      var closeCTAModal = cta(box_elem, modal_elem, ctaOptions, function() {

        //show modal cta
        $timeout(function() { showModalCTA(modal_elem) });
        show_callback && show_callback();

        var modalCloseIcon = getModalCloseIcon(modal_elem);
        if (modalCloseIcon) {
          modalCloseIcon.addEventListener('click', function() {
            closeCTAModal();
            hideModalCTA(modal_elem);
          })
        }

      }, ctaParentDict[box_elem.id])

    }

    box_elem.addEventListener('click', ctaFuncDict[box_elem.id]);
  }

  var initSingleCTA = function(boxSelector, parentSelector, show_callback) {
    var parentElem = document.querySelector(parentSelector);
    var boxElem = document.querySelector(boxSelector);

    var modalElemId = boxElem && boxElem.id && boxElem.id.replace('box', 'modal');
    var modalElem = document.getElementById(modalElemId);

    //if both dont exist dont do anything
    if (!(parentElem && boxElem && modalElem)) {
      console.log('ERROR: Could not locate elems', boxSelector, parentSelector)
      return false;
    }
    ctaParentDict[boxElem.id] = parentSelector;
    bindCtaToBoxElem(boxElem, modalElem, show_callback);


  }

  var initArrCTA = function() {

  }

  return {
    initSingleCTA:initSingleCTA,
    initArrCTA:initArrCTA
  }

}