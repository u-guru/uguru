angular
	.module('sharedServices')
	.factory("PeelService", [
    '$timeout',
    PeelService
	]);

function PeelService($timeout) {

  var startPeel = function(peel) {
    peel.t = 0;
    var tween = new TweenLite(peel, 1.5, {
      t:1,
      paused:true,
      ease: Power2.easeIn,
      onUpdate: function() {
        peel.setTimeAlongPath(this.target.t);
      },
    });
    tween.seek(0);
    tween.play();
  }

  var resetPeel = function(peel) {
    peel.setTimeAlongPath(0);
  }

  var initPeel = function(selector) {
    var p = new Peel(selector);
    p.setPeelPosition(170, 170);
    p.setPeelPath(170, 170, 50, 170, 0, 0, 170, -170);
    p.setFadeThreshold(.7);
    // $timeout(function() {

    startPeel(p);

    // tween.seek(0);
    // tween.play();
    // }, 1000)
    $timeout(function() {
      // console.log('attempt to reset');
      resetPeel(p);
      // tween.play();
    }, 3000)
    // p.handlePress(function(evt) {

    // });
  }

  return {
    initPeel:initPeel
  }

}