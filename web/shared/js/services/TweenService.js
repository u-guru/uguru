angular.module('uguru.shared.services')
.factory("TweenService", [
    TweenService
]);

function TweenService() {

    return  {
        getKeyframeValues: getKeyframeValues,
        getAllEasing: getAllEasing,
        getAllAnimatable: getAllAnimatable,
        getCubicBezierArrs: getAllAnimatable
    }

    function getAllEasing() {
        return ["easeInQuad",
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
        "easeInBack",
        "easeOutBack",
        "easeInOutBack",
        // "easeInElastic", // easings.net or https://github.com/ai/easings.net/blob/master/vendor/jquery.easing.js
        // "easeOutElastic",
        // "easeInOutElastic",
		// "sway", // http://goo.gl/n3DjKQ
        // "hardSway", // http://goo.gl/xX8hna
        // "easeInBounce",
        "easeOutBounce",
        // "easeInOutBounce",
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

    function getCubicBezierArrs() {
        return {
            "nameOfCB": [1,1,1,1]
        }
    }

    function getAllAnimatable() {
        return animatableProps;
    }

    function getKeyframeValues(start_dict, end_dict, duration, easeFunc, kf_arr, max_keyframe) {
        if (!max_keyframe) max_keyframe = 30;
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
        }).seek(0)
        var intervals = (duration/1000 * 60)/2;
        var chunkSize = duration/intervals;
        for (var i = 1; i < (intervals + 2); i++) {



            tweenable.seek(i*chunkSize);
            kf_arr.push(tweenable.get());
            tweenable.resume();
            // console.log(tweenable.get());
        }
        // console.log(kf_arr);
        // kf_arr.forEach(function(kf, i) {kf_arr[i].percentage = i * (100/(intervals + 2))})
        // kf_arr.forEach(function(kf, i) {console.log(kf.percentage, kf[Object.keys(start_dict)[0]])})
        kf_arr.forEach(function(kf, i) {kf_arr[i].percentage = i/(kf_arr.length - 1) * 100})
        // console.log(kf_arr[0], kf_arr[kf_arr.length - 1])
        return kf_arr;

    }

}


var animatableProps =
["-webkit-text-fill-color",
"-webkit-text-stroke",
"-webkit-text-stroke-color",
"-webkit-touch-callout",
"all",
"appearance",
"backdrop-filter",
"background",
"background-color",
"background-position",
"background-size",
"border",
"border-bottom",
"border-bottom-color",
"border-bottom-left-radius",
"border-bottom-right-radius",
"border-bottom-width",
"border-color",
"border-left",
"border-left-color",
"border-left-width",
"border-radius",
"border-right",
"border-right-color",
"border-right-width",
"border-top",
"border-top-color",
"border-top-left-radius",
"border-top-right-radius",
"border-top-width",
"border-width",
"bottom",
"box-shadow",
"clip",
"clip-path",
"color",
"column-count",
"column-gap",
"column-rule",
"column-rule-color",
"column-rule-width",
"column-width",
"columns",
"contain",
"filter",
"flex",
"flex-basis",
"flex-grow",
"flex-shrink",
"font",
"font-size",
"font-size-adjust",
"font-stretch",
"font-weight",
"grid-column-gap",
"grid-gap",
"grid-row-gap",
"height",
"left",
"letter-spacing",
"line-height",
"margin",
"margin-bottom",
"margin-left",
"margin-right",
"margin-top",
"mask",
"mask-position",
"mask-size",
"max-height",
"max-width",
"min-height",
"min-width",
"motion-offset",
"motion-rotation",
"object-position",
"opacity",
"order",
"outline",
"outline-color",
"outline-offset",
"outline-width",
"padding",
"padding-bottom",
"padding-left",
"padding-right",
"padding-top",
"perspective",
"perspective-origin",
"right",
"scroll-snap-coordinate",
"scroll-snap-destination",
"shape-image-threshold",
"shape-margin",
"shape-outside",
"text-decoration",
"text-decoration-color",
"text-emphasis",
"text-emphasis-color",
"text-indent",
"text-shadow",
"top",
"transform",
"transform-origin",
"vertical-align",
"visibility",
"width",
"word-spacing",
"z-index",
"-moz-outline-radius",
"-moz-outline-radius-bottomleft",
"-moz-outline-radius-bottomright",
"-moz-outline-radius-topleft",
"-moz-outline-radius-topright"]
