WINDOWS = null;
      function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            console.log(userAgent);
            if (navigator.userAgent.match(/iemobile/i) || navigator.userAgent.match(/Windows Phone/i)  || navigator.userAgent.match(/IEMobile/i)) {
                    console.log('injecting windows specific css & js');
                    injectJs('windows.cordova.js');
                    injectCss('windows.css');
            }
            else if( userAgent.match( /Android/i ) )
              {
                // Read more here
                // https://developer.chrome.com/multidevice/user-agent
                console.log('ANDROID WEBVIEW DEVICE UA:', userAgent, '\n');
                var androidWebViewAgents = ['Build/KLP', 'Version', 'wv', 'Crosswalk'];
                for (var i = 0; i < androidWebViewAgents.length; i++ ) {
                  var indexUA = androidWebViewAgents[i];
                  if (userAgent.indexOf(indexUA) > -1) {
                    runningInCordova = true;
                    injectJs('android.cordova_plugins.js');
                    injectJs('android.cordova.js');
                    injectCss('android.css');
                    injectAndroidMetaContentScript();
                    break;
                  }
                }
                return 'Android';
              }
            else if ((!(userAgent.toLowerCase().indexOf('Firefox') > -1) && !(userAgent.toLowerCase().indexOf('safari') > -1)) || userAgent.indexOf('iPad') > 0 )
              {

                injectJs('ios.cordova_plugins.js');
                injectJs('ios.cordova.js');
                injectCss('ios.css');
                // injectJs('/static/remote/cordova.js');
                return 'iOS';

              }
            else {
                console.log('Mobile browser / desktop browser direction!');
                // injectCss('web.css')
                return 'unknown';
            }
    }

      function injectJs(link) {
          var scr = document.createElement('script');
          scr.type="text/javascript";
          scr.src=link;
          document.getElementsByTagName('head')[0].appendChild(scr)
      }

      function injectCss(file) {
        var link = document.createElement("link");
        link.href = file;
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);
      }

      console.log(getMobileOperatingSystem());