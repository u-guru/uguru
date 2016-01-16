angular
	.module('sharedServices')
	.factory("CounterService", [
    '$timeout',
    '$interval',
    CounterService
	]);

function CounterService($timeout, $interval) {

  var defaultOptions = {
      useEasing : true,
      useGrouping : false,
      separator : ',',
      decimal : '.',
      prefix : '',
      suffix : ''
    };

  var initCounter = function(selector, minVal, maxVal, duration, suffix) {
    if (suffix) {
      defaultOptions.suffix = suffix;
    }
    return new CountUp(selector, minVal, maxVal, 0, 5, defaultOptions);

  }

  var startCounter = function(counterObj) {
    counterObj.start();
  }

  return {
    initCounter:initCounter,
    startCounter:startCounter
  }

}