

angular
	.module('sharedServices')
	.factory("GuruService", [
		'$timeout',
    GuruService
	]);

function GuruService($timeout) {

  //array of random gurus
  var randomGuruCache = [];
  var numRandomGurus = [];

  return {
    getRandomGuru: getRandomGuru
  }

  function getRandomGuru() {
    return
  }

}