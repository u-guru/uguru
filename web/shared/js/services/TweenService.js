angular.module('uguru.shared.services')
.factory("TweenService", [
    TweenService
]);

function TweenService() {

    return  {
        getKeyframeValues: getKeyframeValues,
        getAllEasing: getAllEasing
    }

    function getAllEasing() {
        return
        ["easeInQuad",
        "easeOutQuad",
        "easeInOutQuad",
        "easeInCubic",
        "easeOutCubic",
        "easeInOutCubic",
        "easeInQuart",
        "easeOutQuart",
        "easeInOutQuart",
        "easeInQuint",
        "easeOutQuint",
        "easeInOutQuint",
        "easeInSine",
        "easeOutSine",
        "easeInOutSine",
        "easeInExpo",
        "easeOutExpo",
        "easeInOutExpo",
        "easeInCirc",
        "easeOutCirc",
        "easeInOutCirc",
        "easeOutBounce",
        "easeInBack",
        "easeOutBack",
        "easeInOutBack",
        "elastic",
        "swingFromTo",
        "swingFrom",
        "swingTo",
        "bounce",
        "bouncePast",
        "easeFromTo",
        "easeFrom",
        "easeTo"]
    }

    function getKeyframeValues(start_dict, end_dict, duration, easeFunc, kf_arr) {
        //{ x: 0,  y: 50  }
        //{ x: 10, y: -30 }
        var tweenable = new Tweenable();
        var kf_arr = kf_arr || [];
        duration = duration || 1000;
        tweenable.tween({
          from: start_dict,
          to:   end_dict,
          duration: duration,
          easing: easeFunc
        }).seek(0);
        var intervals = parseInt(duration/60);
        console.log(intervals);
        for (var i = 0; i < intervals; i++) {

            tweenable.seek(i*60);
            tweenable.resume();
            kf_arr.push(tweenable.get());
            // console.log(tweenable.get());
        }
        kf_arr.forEach(function(kf, i) {kf_arr[i].percentage = i * (100/intervals)})
        // kf_arr.forEach(function(kf, i) {console.log(kf.percentage, kf[Object.keys(start_dict)[0]])})
        return kf_arr;
    }

}