angular
	.module('sharedServices')
	.factory("TypedService", [
    '$timeout',
    '$interval',
    TypedService
	]);

function TypedService($timeout, $interval) {

  var replayTheatre = true;
  var msCount = 0;
  var defaultCharSpeed = 40;

  var initTypedTicker = function(selector_id, dataArr) {
    "use strict";
    let theater = theaterJS({minSpeed:50, maxSpeed: 350})

    theater
    .on('type:start, erase:start', function () {
      // add a class to actor's dom element when he starts typing/erasing
      let actor = theater.getCurrentActor()
      actor.$element.classList.add('is-typing')
    })
    .on('type:end, erase:end', function () {
      // and then remove it when he's done
      let actor = theater.getCurrentActor()
      actor.$element.classList.remove('is-typing')
    })

    theater.addActor(selector_id, {speed:0.9});

    msCount = 0
    for (var i = 0; i < dataArr.length; i++) {
      var indexDataWord = dataArr[i];
      theater
        .addScene(selector_id +  ':' + indexDataWord, indexDataWord.length * defaultCharSpeed);
        msCount += indexDataWord.length * defaultCharSpeed;
    }


      $interval(function() {
        theater.addScene(theater.replay);
      }, msCount + 100);


  }



  return {
    initTypedTicker:initTypedTicker,
    replayTheatre:replayTheatre
  }

}