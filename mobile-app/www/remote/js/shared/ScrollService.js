

angular
	.module('sharedServices')
	.factory("ScrollService", [
		'LoadingService',
    '$timeout',
    ScrollService
	]);

function ScrollService(LoadingService, $timeout) {
  var globalWaypointsDict = {};
  var mainWaypointContext;
  var currentWaypointContextElem;
  return {
    scrollTo:scrollTo,
    initStickyHeaderScroll: initStickyHeaderScroll,
    initArrWaypoints: initArrWaypoints,
    mainWaypointContext: mainWaypointContext,
    currentWaypointContextElem: currentWaypointContextElem
  }

  function initStickyHeaderScroll(header_selector, start_element, inject_class, parent_container) {
    var header = document.querySelector(header_selector);
    var top_section             = document.querySelector(parent_container);
    var top_section_height      = getComputedStyle(top_section).height.split('px')[0];
    var sticky_start              = document.querySelector(start_element);
    var sticky_height       = getComputedStyle(sticky_start).height.split('px')[0];

    function stickyScroll(e) {
      // 50 allows it to a bit earlier to avoid any chance of lag
      if( top_section.scrollTop > (sticky_start.offsetTop - 50) ) {

        header.classList.add(inject_class);
      } else {
        header.classList.remove(inject_class);
      }
    }

    stickyScroll();
  }



  function initWaypoint(elemId, contextId, elemCb, elemOptions) {
    currentWaypointContextElem  = document.getElementById(contextId)
    var waypoint = new Waypoint({
        element: document.getElementById(elemId),
        handler: elemOptions.func || function() {},
        enable:true,
        context: currentWaypointContextElem,
        offset:elemOptions.offset
      });
    return waypoint;

  }

  function initArrWaypoints(wayPointsDict, parentContainerId) {
    wayPointElemIds = Object.keys(wayPointsDict);
    for (var i = 0; i < wayPointElemIds.length; i++) {
      var wpElemId = wayPointElemIds[i];
      var wpElemOptions = wayPointsDict[wpElemId]
      var wpElemCb = wpElemOptions.func;
      globalWaypointsDict[wpElemId] = initWaypoint(wpElemId, parentContainerId, wpElemCb, wpElemOptions);
    }

  }

  function scrollTo(to, callback, duration, viewSelectorID, destinationSelectorID) {
    if (!to && !(to === 0) && destinationSelectorID) {
      to = document.querySelector(destinationSelectorID).offsetTop;

    }

    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
      document.querySelector(viewSelectorID).scrollTop = amount;
      document.querySelector(viewSelectorID).parentNode.scrollTop = amount;
    }
    function position() {
      return document.querySelector(viewSelectorID).scrollTop || document.querySelector(viewSelectorID).parentNode.scrollTop;
    }
    var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;
    console.log(start);
    duration = (typeof(duration) === 'undefined') ? 500 : duration;
    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
        move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        if (callback && typeof(callback) === 'function') {
          // the animation is done so lets callback
          callback();
        }
      }
    };
    animateScroll();
  }

}


 // easing functions http://goo.gl/5HLl8
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) {
      return c/2*t*t + b
    }
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  Math.easeInCubic = function(t, b, c, d) {
    var tc = (t/=d)*t*t;
    return b+c*(tc);
  };

  Math.inOutQuintic = function(t, b, c, d) {
    var ts = (t/=d)*t,
    tc = ts*t;
    return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
  };

  // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
  })();