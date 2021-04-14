angular.module('sharedServices')
.factory('log', [
	log
	]);

function log($log) {

	$log.enabledContexts = [];

	$log.getInstance = function(context) {
	  return {
	    log: enhanceLogging($log.log, context),
	    info: enhanceLogging($log.info, context),
	    warn: enhanceLogging($log.warn, context),
	    debug: enhanceLogging($log.debug, context),
	    error: enhanceLogging($log.error, context)
	    enableLogging: function(enable) {
	    	$log.enabledContexts[context] = enable;
	    }
	  };
	};

	function enhanceLogging(loggingFunc, context) {
	  return function() {
	  	var contextEnabled = $log.enabledContexts[context];
	  	if($log.enabledContexts[context] == null || contextEnabled) {
	  		var modifiedArguments = [].slice.call(arguments);
	  		modifiedArguments[0] = [moment().format("dddd h:mm:ss a") + '::[' + context + ']> '] + modifiedArguments[0];
	  		loggingFunc.apply(null, modifiedArguments);	
	  	}
	  };
	}



}