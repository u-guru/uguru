angular.module('uguru.shared.services')
.factory("KeyboardService", [
    'UtilitiesService',
    '$timeout',
    KeyboardService
    ]);

function KeyboardService(Utilities, $timeout) {

    var deviceKeyboardExists = false;
    var deviceKeyboardOpen = false;
    var keyupNotRecent;
    var keydownNotRecent;
    // function preventDefaultCutPaste() {
    //     document.body.oncopy = function() { alert('yo');return false; }
    //     document.body.oncut = function() { return false; }
    //     document.body.onpaste = function() { return false; }
    // }

    function initCopyPasteFunctionCallbacks(copy_func, paste_func) {
        (copy_func && copy_func()) || defaultCopyFunction();
        (paste_func && past_func()) || defaultPasteFunc();


        function defaultPasteFunc() {
            return;
        }
    }

    function initKeyboardKeydownFunc(cb, parent_elem) {
        parent_elem = parent_elem || document;
        parent_elem.addEventListener('keydown', function(e) {
            cb && cb(e);
        })
    }


    function initOptionPressedAndReleasedFunction(on_press, on_release, code, key, immediate, delay) {
        // if (on_press) {
            var delay = delay || 0;
            window.addEventListener("keydown", function(e){

                if (document.activeElement && document.activeElement.nodeName.toLowerCase() === 'input') {
                    return;
                }

                if (!immediate) {
                    delay = delay || 250;
                }
                evt = (e) ? e : window.event
                if (((key && evt[key])||true) && evt.keyCode === code && !keydownNotRecent) {
                    on_press && on_press(e);
                    keydownNotRecent = true;
                    $timeout(function() {
                        keydownNotRecent = null;
                    }, delay)
                }
                // if ((evt.ctrlKey && evt.keyCode === 17) && !keyupNotRecent) {
                //     on_press && on_press(e);
                //     keydownNotRecent = true;
                //     $timeout(function() {
                //         keydownNotRecent = null;
                //     }, 1000)
                // }
            })
        // }

        // if (on_release) {
            document.addEventListener('keyup', function (e){
                if (document.activeElement && document.activeElement.nodeName.toLowerCase() === 'input') {
                    return;
                }
                if (((key && evt[key])||true) && e.keyCode === code && !keyupNotRecent) {
                    var delay = 0;
                    if (!immediate) {
                        delay = delay || 250;
                    }
                    // console.log('command released', e);
                    on_release && on_release(e);
                    keyupNotRecent = true;
                    $timeout(function() {
                        keyupNotRecent = null;
                    }, delay);
                }
                // if ((evt.ctrlKey || evt.keyCode === 17) && !keyupNotRecent) {
                //     on_release && on_release(e);
                //     keyupNotRecent = true;
                //     $timeout(function() {
                //         keyupNotRecent = null;
                //     }, 1000);
                // }
            }, false);
        // }
    }

    function defaultCopyFunction() {
        var cmdPressed = false;
        var ctrlPressed = false;

            window.addEventListener("keydown", function(e){
                evt = (e) ? e : window.event
                if (evt.ctrlKey) {
                    cmdPressed = true;
                    // console.log('CMD pressed');
                }
            })
            window.addEventListener("keyup", function(e){
                evt = (e) ? e : window.event; // Some cross-browser compatibility.
                // control key
                if (evt.ctrlKey) {
                    // console.log('ctrl key pressed');
                }
                if((evt.metaKey || evt.keyCode == 224 || evt.keyCode == 93 || evt.which == 91 )&& (evt.which == 67))
                {

                    cmdPressed = false;
                    return false;
                    // Manual Copy / Paste / Cut code here.
                }
            })

        }

    function setDeviceKeyboardState(bool) {
        deviceKeyboardOpen = bool;
    }

    // function closeKeyboardIfExists() {
    //     DeviceService.doesCordovaExist() && cordova.plugins.Keyboard && cordova.plugins.Keyboard.close();
    // }

    return {
        setDeviceKeyboardState:setDeviceKeyboardState,
        initOptionPressedAndReleasedFunction: initOptionPressedAndReleasedFunction,
        initCopyPasteFunctionCallbacks: initCopyPasteFunctionCallbacks,
        initKeyboardKeydownFunc: initKeyboardKeydownFunc
    }
};