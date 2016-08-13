exports.config = {
    framework: 'jasmine2',
    // seleniumAddress: 'http://localhost:4444/wd/hub',


         capabilities: {
                //other browser names, phantomjs
                //
                 'browserName': 'chrome'

                // 'phantomjs.binary.path': require('phantomjs').path
         },
        //   multiCapabilities: [
        //   {'browserName': 'chrome'},
        //   {'browserName': 'firefox'},
        //   {'browserName': 'phantomjs'}
        // ],
        specs: [
               // 'www/remote/tests/e2e/globals.js',
                //'www/remote/tests/e2e/test.spec.js'
               // 'www/remote/tests/e2e/request_test.js'
                //'www/remote/tests/e2e/template.js'
                  
                // 'www/remote/tests/e2e/session_test.js'
          //      'www/remote/tests/e2e/question_test.js'
              //'www/remote/tests/e2e/university_test.js'
             // 'www/remote/tests/e2e/task_test.js'
                'www/remote/tests/e2e/onboarding_test.js',
                'www/remote/tests/e2e/sign_test.js',
                'www/remote/tests/e2e/setting_test_fb.js',
                'www/remote/tests/e2e/setting_test_email.js',
                'www/remote/tests/e2e/university_test_fb.js',
                'www/remote/tests/e2e/uguru_test_fb.js'


        ],
        suites:
        {
          //setting
          o :'www/remote/tests/e2e/onboarding_test.js',
          //onboarding
          l :'www/remote/tests/e2e/sign_test.js',
          //Setting
          sf:'www/remote/tests/e2e/setting_test_fb.js',
          se:'www/remote/tests/e2e/setting_test_email.js',
          //school
          uf:'www/remote/tests/e2e/university_test_fb.js',
          //uguru
          ugf :'www/remote/tests/e2e/uguru_test_fb.js'

        },

        resultJsonOutputFile: 'www/remote/tests/e2e/result.json',
        rootElement: "[ng-app]" ,
       // rootElement: 'uguru' ,
        jasmineNodeOpts: {
                          showColors: true,
                          defaultTimeoutInterval: 400000,
                          isVerbose: true,
                          silent: true,
                          print: function() {}

                          },
        getPageTimeout: 10000,
        allScriptsTimeout: 400000,
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
            browser.driver.manage().window().setSize(414, 736);


        }
        
};