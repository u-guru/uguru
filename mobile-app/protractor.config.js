exports.config = {
         capabilities: {
                //other browser names, phantomjs
                //
                 'browserName': 'chrome'
                // 'phantomjs.binary.path': require('phantomjs').path
         },
        specs: [
               // 'www/remote/tests/e2e/globals.js',
                //'www/remote/tests/e2e/test.spec.js'
               // 'www/remote/tests/e2e/request_test.js'
                //'www/remote/tests/e2e/template.js'
                //'www/remote/tests/e2e/sign_test.js'
                'www/remote/tests/e2e/session_test.js'

        ],
        rootElement: "[ng-app]" ,
       // rootElement: 'uguru' ,
        jasmineNodeOpts: {
                  showColors: true,
                  defaultTimeoutInterval: 40000,
                  isVerbose: true,
        },
        allScriptsTimeout: 40000,

         onPrepare: function(){

            browser.driver.get('http://localhost:8100/');
            
        }
        
};