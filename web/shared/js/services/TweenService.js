angular.module('uguru.shared.services')
.factory("TweenService", [
    TweenService
]);

function TweenService() {
    var specialPropertyTypes = ['background-color', 'background', 'fill', 'color', 'stroke', 'border-color', 'border']
    return  {
        getKeyframeValues: getKeyframeValues,
        getAllEasing: getAllEasing,
        getAllAnimatable: getAllAnimatable,
        getCubicBezierArrs: getAllAnimatable,
        preComputeValues: preComputeValues,
        getKeyframeValuesByProperty: getKeyframeValuesByProperty,
        animatableProps: animatableProps

    }

    function getAllEasing() {
        return easings

        // "easeInElastic", // easings.net or https://github.com/ai/easings.net/blob/master/vendor/jquery.easing.js
        // "easeOutElastic",
        // "easeInOutElastic",
        // "easeInBounce",
        // "easeOutBounce",
        // "easeInOutBounce",


        // "sway", // http://goo.gl/n3DjKQ
        // "hardSway", // http://goo.gl/xX8hna

        // deprecated
    }

    function getCubicBezierArrs() {
        return {
            "nameOfCB": [1,1,1,1]
        }
    }

    function getArrayOfDecimals(value) {
          var r = /[\d*\.?\d-*]+/g;
          var m;
          var resultArr = [];
          while ((m = r.exec(value)) != null) {
            resultArr.push(m[0]);
          }
          return resultArr
    }

    function getAllAnimatable() {
        return animatableProps;
    }

    function getCustomEasingFunction() {
        return {
            t: 'now',
            b: 'start' || 0,
            c: 'end' || 1,
            d: 'duration' || 1000
        }
    }

    function parseSpecialPropertyType(property, value) {
        return 'rgba(' + value.split('|').join(',') + ')'
    }

    function preComputeValues(property, duration, start, end, ease, result_arr) {
        duration = parseFloat(duration)
        result_arr.cache = [];

        property = property.trim();


        var startDict = {};
        startDict[property] = start;
        var endDict = {};
        endDict[property] = end;


        var t = new Tweenable();
        if (specialPropertyTypes.indexOf(property) > -1) {
            start = parseSpecialPropertyType(property, start);
            end = parseSpecialPropertyType(property, end);
        }
        if (ease.indexOf('|') > -1) {
            var easeSplit = ease.split('|');
            if (ease && ease.length && easeSplit.length === 4) {
                easeSplit.forEach(function(val, i) {easeSplit[i] = parseFloat(val)});
                Tweenable.setBezierFunction('cb-function', easeSplit[0], easeSplit[1], easeSplit[2], easeSplit[3]);
                ease = 'cb-function'
            }
        }
        if (ease.indexOf(',') > -1) {
            ease = ease.replace('(', '').replace(')', '');
            var easeSplit = ease.split(',');
            if (ease && ease.length && easeSplit.length === 4) {
                easeSplit.forEach(function(val, i) {easeSplit[i] = parseFloat(val)});
                Tweenable.setBezierFunction('cb-function', easeSplit[0], easeSplit[1], easeSplit[2], easeSplit[3]);
                ease = 'cb-function'
            }
        }

        if (typeof(start) !== 'object') {
            var tempStart = start;
            var start = {};
            start[property] = tempStart
        }
        if (typeof(end) !== 'object') {
            var tempEnd = end;
            var end = {};
            end[property] = tempEnd
        }

        var iterations = (duration/1000 * 60);//fps

        t.tween({
          from: start,
          to:   end,
          duration: duration,
          easing: ease
        }).seek(0).pause()
        var appendLastValueAtEnd = false;
        if (t.get()[property] !== start[property]) {
            appendLastValueAtEnd = true;

            var newDuration = iterations/62 * 1000;
            result_arr.cache.push(start[property]);
            t.tween({
              from: start,
              to:   end,
              duration: newDuration,
              easing: ease
            }).seek(0).pause();
            iterations = iterations - 2;
        }


        for (var i = 0; i < iterations; i++) {
            var seekValue = duration/iterations * i;
            var value = t.seek(seekValue).resume().pause().get()[property]
            result_arr.cache.push(round(value, 15));
        }
        t.stop(true);

        result_arr.cache.push(round(t.get()[property], 15));
        if (appendLastValueAtEnd) {
            result_arr.cache.push(end[property])
        }
        // if (result_arr.cache[result_arr.cache.length - 2] !== end[property]) {
        //     console.log(property[end])
        //     result_arr.cache.push(end[property]);
        //     console.log(result_arr.cache)
        // }
        result_arr.cache.push(null)
        t.dispose();
        if (property === 'counter') {
            formatCounterValues(start.counter, end.counter, result_arr.cache);
        }
        // console.log('\n')
        // console.log(ease, '<>', property)
        // console.log('START 3 values: \n' + result_arr.cache.slice(0,3).join(",\n") +'\n' + '\nEND 3 values:\n' + result_arr.cache.slice(result_arr.cache.length - 4,result_arr.cache.length).join(",\n") + '\n')
        return result_arr
        // t.dispose();
    }

    function formatCounterValues(start, end, arr) {
        var num = getArrayOfDecimals(arr[0])[0];
        var nonNumeric = start.split(num).filter(function(val, i) {return val.length});
        var replaceStart;
        if (start.indexOf(nonNumeric[0]) === 0) {
            replaceStart = nonNumeric[0];
        }
        arr.forEach(function(val, i) {
            if (!val) return;
            if (replaceStart) {
                arr[i] = replaceStart + arr[i].replace(replaceStart, '');
            }
        })
    }

    function precision(a) {
      if (!isFinite(a)) return 0;
      var e = 1, p = 0;
      while (Math.round(a * e) / e !== a) { e *= 10; p++; }
      return p;
    }

    function round(value, decimals) {
        if (typeof value !== 'number') return value
        if (precision(value) > 18) {
            return Number(value.toFixed(15));
        }
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    function getKeyframeValuesByProperty(property, start_val, end_val, duration, easeFunc, max_keyframe) {
        if (!easeFunc) {
            easeFunc = 'linear'
        }
        if (!max_keyframe) {
            max_keyframe = 60;
        }
        duration = duration || 1000;
        var vals = {start: {}, end:{}};
        vals.start[property] = start_val;
        vals.end[property] = end_val;
        return getKeyframeValues(vals.start, vals.end, duration, easeFunc, max_keyframe);
    }

    function getKeyframeValues(start_dict, end_dict, duration, easeFunc, kf_arr, max_keyframe) {
        if (property)
        if (!max_keyframe) max_keyframe = 30;
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


        return kf_arr;

    }

}


var animatableProps =
[
"translateX",
"translateY",
"translateZ",
"scaleX",
"scaleY",
"rotate",
"skewX",
"skewY",
"scaleZ",
"rotateX",
"rotateY",
"rotateZ",
"perspective",
"rotate3d",
"-webkit-text-fill-color",
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

var easings = ["easeInQuad",
        "linear",
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
        "easeInOutBounce",
        "easeInBounce",
        "easeOutBounce",
        "easeInElastic",
        "easeOutElastic",
        "easeInOutElastic",
        "bouncePast",
        "swingFromTo",
        "swingFrom",
        "swingTo",
        "easeFromTo",
        "easeFrom",
        "easeTo"
        ]
