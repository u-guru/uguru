angular
.module('sharedServices')
.factory("InAppMapService", [
	'University',
	'$timeout',
  	InAppMapService
	]);

function InAppMapService(University, $timeout) {


  return {

  	displayMap: displayMap
    
  };


  function displayMap() {

  	$timeout(function() {
		map.moveCamera({
		  target: {
		    lat: 37.4274745,
		    lng: -122.169719
		  },
		  zoom: 15
		});

	}, 30);

	}

}