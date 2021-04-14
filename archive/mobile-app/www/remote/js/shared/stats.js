var Stats = function () {

	var now = ( self.performance && self.performance.now ) ? self.performance.now.bind( performance ) : Date.now;

	var startTime = now(), prevTime = startTime;
	var frames = 0, mode = 0;

	var fps = 0, fpsMin = Infinity, fpsMax = 0;
	var ms = 0, msMin = Infinity, msMax = 0;
	if ( self.performance && self.performance.memory ) {
		var mem = 0, memMin = Infinity, memMax = 0;
	}

	return {
		begin: function () {
			startTime = now();
		},

		end: function () {

			var time = now();
			ms = time - startTime;
			msMin = Math.min( msMin, ms );
			msMax = Math.max( msMax, ms );

			frames ++;

			// interval of frame check, should be at 10 
			if ( time > prevTime + 10 ) {

				fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );

				fpsMin = Math.min( fpsMin, fps );
				fpsMax = Math.max( fpsMax, fps );

				prevTime = time;
				frames = 0;

				if ( mem !== undefined ) {

					var heapSize = performance.memory.usedJSHeapSize;
					var heapSizeLimit = performance.memory.jsHeapSizeLimit;

					mem = Math.round( heapSize * 0.000000954 );
					memMin = Math.min( memMin, mem );
					memMax = Math.max( memMax, mem );
				}
			}
			return time;
		},
		getFPS: function() {
			return fps;
		},
		update: function () {
			startTime = this.end();
		}
	};
};

if ( typeof module === 'object' ) {
	module.exports = Stats;
}


