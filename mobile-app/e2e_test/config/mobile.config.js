exports.config = {
    framework: 'jasmine2',
    //appium port has to be 4723
     seleniumAddress: 'http://localhost:4723/wd/hub',


         capabilities: {


          //ios settings
                 'browserName': '',
                 'appium-version': '1.4.11',
                 app: '/Users/nlmac/Git/uguru/mobile-app/platforms/ios/build/emulator/uguru.app',
                 platformName: 'ios',
                  platformVersion: '8.4',
                   deviceName: 'iPhone 6'

         // //android settings
         //        'browserName': 'chrome',
         //        'appium-version': '1.4.11',
         //        platformName: 'android',
         //         platformVersion: '5.1',
         //          deviceName: 'Google Nexus 5'
           
         },

         //0800695a006a24a8

        //   multiCapabilities: [
        //   {'browserName': 'chrome'},
        //   {'browserName': 'firefox'},
        //   {'browserName': 'phantomjs'}
        // ],
        specs:
        [

        ],
        suites:
        {
            workflow: ['../test_case/workflows/workflow_1.js'],

        },
        // resultJsonOutputFile: 'www/remote/tests/e2e/result.json',
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
             browser.driver.get("http://localhost:8100/#/");
             browser.sleep(1000);



        }
        
};