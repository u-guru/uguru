exports.config = {
    framework: 'jasmine2',
    // seleniumAddress: 'http://localhost:4444/wd/hub',


         capabilities: {
                 'browserName': 'chrome'
         },
        //   multiCapabilities: [
        //   {'browserName': 'chrome'},
        //   {'browserName': 'firefox'},
        //   {'browserName': 'phantomjs'}
        // ],
        specs: [
            //'../test_case/Release_One_Mobile/onboarding/onboarding_test.js',
            '../test_case/Release_One_Mobile/onboarding/swiping.js',
            '../test_case/Release_One_Mobile/onboarding/slect_bg.js',
            '../test_case/Release_One_Mobile/onboarding/manual_school.js'


        ],
        suites:
        {
            s  : '../test_case/Release_One_Mobile/onboarding/swiping.js',
            bg : '../test_case/Release_One_Mobile/onboarding/slect_bg.js',
            m  : '../test_case/Release_One_Mobile/onboarding/manual_school.js'

        },
        resultJsonOutputFile: 'www/remote/tests/e2e/result.json',
        rootElement: "[ng-app]" ,
       // rootElement: 'uguru' ,
        jasmineNodeOpts: {
                          showColors: true,
                          defaultTimeoutInterval: 400000,
                          isVerbose: true,
                          silent: true
                          ,
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
            protractor.get = require('../test_case/globals.js').globals;
            protractor.run = require('../test_case/globals.js').run;
            browser.driver.manage().window().setSize(414, 736);
            browser.driver.get('http://localhost:8100/#/onboarding');
            browser.sleep(2000);
            // browser.wait(function() 
            //   { 
            //     return !browser.driver.isElementPresent(by.css('.loading')); 
            //   }, 8000);
        }
        
};