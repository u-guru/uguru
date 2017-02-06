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
    var keyCache = {recent: [], active: {}};
    var active = true;
    var MAX_KEY_CACHE_LENGTH = 10;
    // function preventDefaultCutPaste() {
    //     document.body.oncopy = function() { alert('yo');return false; }
    //     document.body.oncut = function() { return false; }
    //     document.body.onpaste = function() { return false; }
    // }

    function insertKeyEventToCache(e) {
        var letter = keyMappings.toChar[e.which];
        if (keyCache.recent.length < 10) {
            console.log(keyCache.recent.unshift(letter));
            console.log('current cache', keyCache.recent)
        } else {
            var popped = keyCache.recent.pop();
            console.log(popped);
            keyCache.recent.unshift(letter);
            console.log('new cache', keyCache.recent)
        }
    }

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
    var keyMappings = {
      toChar: {8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause/Break",20:"Caps Lock",27:"Esc",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"cmd",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},
      toKeyCode:{"Backspace":8,"Tab":9,"Enter":13,"Shift":16,"Ctrl":17,"Alt":18,"Pause/Break":19,"Caps Lock":20,"Esc":27,"Space":32,"Page Up":33,"Page Down":34,"End":35,"Home":36,"Left":37,"Up":38,"Right":39,"Down":40,"Insert":45,"Delete":46,"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,"A":65,"B":66,"C":67,"D":68,"E":69,"F":70,"G":71,"H":72,"I":73,"J":74,"K":75,"L":76,"M":77,"N":78,"O":79,"P":80,"Q":81,"R":82,"S":83,"T":84,"U":85,"V":86,"W":87,"X":88,"Y":89,"Z":90,"cmd":91,"Right Click":93,"Numpad 0":96,"Numpad 1":97,"Numpad 2":98,"Numpad 3":99,"Numpad 4":100,"Numpad 5":101,"Numpad 6":102,"Numpad 7":103,"Numpad 8":104,"Numpad 9":105,"Numpad *":106,"Numpad +":107,"Numpad -":109,"Numpad .":110,"Numpad /":111,"F1":112,"F2":113,"F3":114,"F4":115,"F5":116,"F6":117,"F7":118,"F8":119,"F9":120,"F10":121,"F11":122,"F12":123,"Num Lock":144,"Scroll Lock":145,"My Computer":182,"My Calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222}
    }

    return {
        setDeviceKeyboardState:setDeviceKeyboardState,
        initOptionPressedAndReleasedFunction: initOptionPressedAndReleasedFunction,
        initCopyPasteFunctionCallbacks: initCopyPasteFunctionCallbacks,
        initKeyboardKeydownFunc: initKeyboardKeydownFunc,
        keyMaps: keyMappings,
        record: insertKeyEventToCache,
        cache: keyCache
    }
};

