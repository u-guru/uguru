exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',


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
                  
                // 'www/remote/tests/e2e/session_test.js'
          //      'www/remote/tests/e2e/question_test.js'
              //'www/remote/tests/e2e/university_test.js'
             // 'www/remote/tests/e2e/task_test.js'
             // 'www/remote/tests/e2e/onboarding_test.js'
                'www/remote/tests/e2e/sign_test.js'

        ],
        rootElement: "[ng-app]" ,
       // rootElement: 'uguru' ,
        jasmineNodeOpts: {
                  showColors: true,
                  defaultTimeoutInterval: 40000,
                  isVerbose: true,
                  silent: true,
                  print: function () {}
        },
        allScriptsTimeout: 40000,
        onPrepare: function () {
            var SpecReporter = require('jasmine-spec-reporter');
            // add jasmine spec reporter
            jasmine.getEnv().addReporter(new SpecReporter(
                {
                    displayStacktrace: 'none',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
                    displayFailuresSummary: false, // display summary of all failures after execution
                    displaySuccessfulSpec: true,  // display each successful spec
                    displayFailedSpec: true,      // display each failed spec
                    displayPendingSpec: false,    // display each pending spec
                    displaySpecDuration: false,   // display each spec duration
                    displaySuiteNumber: false,    // display each suite number (hierarchical)
                    colors: {
                        success: 'green',
                        failure: 'red',
                        pending: 'cyan'
                    },
                    prefixes: {
                        success: '✓ ',
                        failure: '✗ ',
                        pending: '- '
                    },
                    customProcessors: []
                }));
            protractor.get = require('./www/remote/tests/e2e/globals.js').globals;
            protractor.run = require('./www/remote/tests/e2e/globals.js').run;


        }
        
};