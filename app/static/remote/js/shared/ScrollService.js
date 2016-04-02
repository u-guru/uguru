

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
  var globalWPScopeRef = {};
  return {
    scrollTo:scrollTo,
    initWaypoint: initWaypoint,
    initArrWaypoints: initArrWaypoints,
    mainWaypointContext: mainWaypointContext,
    currentWaypointContextElem: currentWaypointContextElem,
    initScopedWaypoint: initScopedWaypoint
  }




    // function initStellar(selector,) {
    //   // $('#splash-browse').stellar({
    //   //     scrollProperty: 'transform'
    //   // });
    // }

      function returnWayPointFunction(wpName, stateName) {
        return function(direction) {
          //if up animation
            globalWPScopeRef[stateName].page.waypoints[wpName].activated = true;
            globalWPScopeRef[stateName].page.waypoints[wpName].direction = direction;
            globalWPScopeRef[stateName].$apply();
            $timeout(function() {
              globalWPScopeRef[stateName].page.waypoints[wpName].activated = false;
            })
          }
      }


  function initScopedWaypoint(elemRef, contextRef, scopeRef, offset, stateName, wpName) {
    if (!globalWPScopeRef[stateName]) {
      globalWPScopeRef[stateName] = scopeRef;
    }
    triggerFunc = returnWayPointFunction(wpName, stateName);
    var waypoint = new Waypoint({
        element: document.querySelector(elemRef),
        handler: triggerFunc || function() {},
        enable:true,
        context: document.querySelector(contextRef),
        offset:offset
      });
    return waypoint;
  }

  function initWaypoint(elemId, contextId, elemOptions) {
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
      globalWaypointsDict[wpElemId] = initWaypoint(wpElemId, parentContainerId, wpElemOptions);
    }

  }

  function scrollTo(to, callback, duration, viewSelectorID, destinationSelectorID, offset, ease_type) {
    offset = offset || 0;
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
      change = to - start - offset,
      currentTime = 0,
      increment = 20;
    duration = (typeof(duration) === 'undefined') ? 500 : duration;
    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      if (ease_type === 'quad' || !ease_type) {
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
      } else if (ease_type === 'cubic') {
        var val = Math.easeInCubic(currentTime, start, change, duration);
      } else if (ease_type ==='quint') {
        var val = Math.inOutQuintic(currentTime, start, change, duration);
      }
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