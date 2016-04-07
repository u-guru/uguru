angular.module('sharedServices')
.factory("KeyboardService", [
	'Utilities',
	'$timeout',
	'DeviceService',
	KeyboardService
	]);

function KeyboardService(Utilities, $timeout, DeviceService) {

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



    function initOptionPressedAndReleasedFunction(on_press, on_release) {

        window.addEventListener("keydown", function(e){
            evt = (e) ? e : window.event
            if (evt.metaKey && !keydownNotRecent) {
                on_press && on_press();
                keydownNotRecent = true;
                $timeout(function() {
                    keydownNotRecent = null;
                }, 1000)
            }
        })

        document.addEventListener('keyup', function (e){
            if (e.keyCode === 91 && !keyupNotRecent) {
                on_release && on_release();
                keyupNotRecent = true;
                $timeout(function() {
                    keyupNotRecent = null;
                }, 1000);
            }
        }, false);
    }

    function defaultCopyFunction() {
        var controlPressed = false;

            window.addEventListener("keydown", function(e){
                evt = (e) ? e : window.event
                if (evt.ctrlKey) {
                    controlPressed = true;
                    console.log('Control pressed');
                }
            })
            window.addEventListener("keyup", function(e){
                evt = (e) ? e : window.event; // Some cross-browser compatibility.
                if (evt.ctrlKey) {
                    console.log('Control released');
                }
                if((evt.ctrlKey || evt.metaKey || evt.keyCode == 224 || evt.keyCode == 93 || evt.which == 91 )&& (evt.which == 67))
                {

                    controlPressed = false;
                    console.log("Is Control Press?", controlPressed);
                    return false;
                    // Manual Copy / Paste / Cut code here.
                }
            })

        }

    function setDeviceKeyboardState(bool) {
    	deviceKeyboardOpen = bool;
    }

    function closeKeyboardIfExists() {
        DeviceService.doesCordovaExist() && cordova.plugins.Keyboard && cordova.plugins.Keyboard.close();
    }

    return {
        setDeviceKeyboardState:setDeviceKeyboardState,
        closeKeyboardIfExists: closeKeyboardIfExists,
        initOptionPressedAndReleasedFunction: initOptionPressedAndReleasedFunction,
        initCopyPasteFunctionCallbacks: initCopyPasteFunctionCallbacks
    }
};






