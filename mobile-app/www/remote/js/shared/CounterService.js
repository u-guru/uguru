angular
	.module('sharedServices')
	.factory("CounterService", [
    '$timeout',
    '$interval',
    CounterService
	]);

function CounterService($timeout, $interval) {

  var defaultOptions = {
      useEasing : false,
      useGrouping : false,
      separator : ',',
      decimal : '.',
      prefix : '',
      suffix : ''
    };

  var initCounter = function(selector, minVal, maxVal, duration, suffix, prefix) {
    if (suffix) {
      defaultOptions.suffix = suffix;
    }
    if (prefix) {
      defaultOptions.prefix = prefix;
    }
    return new CountUp(selector, minVal, maxVal, 0, duration, defaultOptions);

  }

  var startCounter = function(counterObj) {
    counterObj.start();
  }

  return {
    initCounter:initCounter,
    startCounter:startCounter,
  }

}