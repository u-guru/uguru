      //inspeclet code
    //   window.__insp = window.__insp || [];
    //   __insp.push(['wid', 1863310177]);
    //   (function() {
    //   function ldinsp(){if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
    //   setTimeout(ldinsp, 500); document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
    //   })();

      var start_dom_time = Date.now();
      var _local, _startpage, _ipaddress;
      var _autoredirects = false;
      var deviceReadyLoadTime;
      var bodyLoadTime;
      var calcTimeSinceInit = function() {
        if (start_dom_time) {
            var current_time = (new Date()).getTime();
            var time_ms = current_time - start_dom_time;
            var time_s = (time_ms / 1000.0).toPrecision(3)
            var loadTime = time_s;
            return loadTime
        }
      }
      var onBodyLoad = function() {
        var bodyLoadTime = calcTimeSinceInit();
        console.log('Body dom load complete, load time:', bodyLoadTime, 'seconds');
      }

      var injectAndroidMetaContentScript = function() {
        var meta = document.createElement('meta');
        meta.httpEquiv = "Content-Security-Policy";
        meta.content = "default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *"
        document.getElementsByTagName('head')[0].appendChild(meta);
      }


      //init dom
      var start_dom_time = (new Date()).getTime()
      var calcBodyLoad = function(start_dom_time) {
        console.log(start_dom_time)
        var current_time = (new Date()).getTime();
        var time_ms = current_time - start_dom_time;
        var time_s = parseInt(time_ms % 1000.0)
        console.log(time_s)
      }
      // //g-analytics
      // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      // ga('create', 'UA-66145138-1', 'auto');
      // ga('send', 'pageview');
      // (function(d, s, id) {
      //   var js, fjs = d.getElementsByTagName(s)[0];
      //   if (d.getElementById(id)) return;
      //   js = d.createElement(s); js.id = id;
      //   js.src = "//connect.facebook.net/en_US/sdk.js";
      //   fjs.parentNode.insertBefore(js, fjs);
      // }(document, 'script', 'facebook-jssdk'));

      // window.fbAsyncInit = function() {
      //   FB.init({
      //     appId      : '1416375518604557',
      //     cookie     : true,
      //     xfbml      : true,
      //     version    : 'v2.2'
      //   });
      // }

      //mixpanel analytics
    //     (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
    // for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
    // mixpanel.init("a023529351da6a26661d05b4b1bd6758");


  //g-webfonts




  //intercom settings
  window.intercomSettings = {
    app_id: "yoz6vu28",
    widget: {"activator": "#Intercom"}
  };
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/yoz6vu28';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
