exports.config = {
    framework: 'jasmine2',
    //appium port has to be 4723
     seleniumAddress: 'http://localhost:4723/wd/hub',


         capabilities: {

//brew install ideviceinstaller
//appium -U <uuid< --app <app_path>
//0df70c3eacd748d8d92a882cbec7b26787fa0396
//appium -U 0df70c3eacd748d8d92a882cbec7b26787fa0396

//ios_webkit_debug_proxy -c 0df70c3eacd748d8d92a882cbec7b26787fa0396:27753 -d
          //ios settings
                 browserName: '',
                 'appium-version': '1.4.11',
                 app: '/Users/nlmac/Git/uguru/mobile-app/platforms/ios/build/device/uguru.app',
                 platformName: 'iOS',
                  bundleId: 'com.beta.college.Uguru',
                  udid: '0df70c3eacd748d8d92a882cbec7b26787fa0396',
                  platformVersion: '7.12',
                   deviceName: 'TwFoB Work’s iPhone (7.1.2) [0df70c3eacd748d8d92a882cbec7b26787fa0396]',
                   autoWebview: 'true'

         // //android settings
                // browserName: '',
                // 'appium-version': '1.4.11',
                // app: '/Users/nlmac/Git/uguru/mobile-app/platforms/android/ant-build/MainActivity-debug.apk',
                // platformName: 'android',
                //  platformVersion: '4.4',
                //   deviceName: 'S5',
                //   autoWebview: 'true'
           
         },
         // comment this out if running for IOS
         //baseUrl: 'http://10.0.2.2:8000',

         // this is for ios
        baseUrl: 'http://localhost:8100',

        //   multiCapabilities: [
        //   {'browserName': 'chrome'},
        //   {'browserName': 'firefox'},
        //   {'browserName': 'phantomjs'}
        // ],
        specs:
        ['../test_case/workflows/workflow_1.js'],
        // suites:
        // {
        //     workflow: ['../test_case/workflows/workflow_1.js'],

        // },
        // resultJsonOutputFile: 'www/remote/tests/e2e/result.json',
        //rootElement: "[ng-app]" ,
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
            // browser.driver.manage().window().setSize(414, 736);

            //may need to uncomment this for IOS. but for sure comment out when on android
               //browser.driver.get("http://localhost:8100/#/");
              // browser.sleep(1000);



        }
        
};