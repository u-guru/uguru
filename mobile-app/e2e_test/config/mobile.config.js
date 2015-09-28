"use strict";
// for (var i = 0; i < 4; i++) {
//         switch (i) {
//             case 0:
//                 //set resolution 1
//                 browser.manage().window().setSize(320, 480);
//                 break;
//             case 1:
//                 //set resolution 2
//                 browser.manage().window().setSize(600, 800);
//                 break;
//             case 2:
//                 //set resolution 3
//                 browser.manage().window().setSize(768, 1024);
//                 break;
//             case 3:
//                 //set resolution 4
//                 browser.manage().window().setSize(1080, 1920);
//                 break;
//             default:
//                 return;
//         }
//     }
exports.config = {
    framework: 'jasmine2',

     // baseUrl: 'http://10.0.0.2:8000/',
     baseUrl: 'http://192.168.56.101:5555/',

    //appium port has to be 4723
      // seleniumAddress: 'http://localhost:4444/wd/hub',
     seleniumAddress: 'http://localhost:4723/wd/hub',

         // capabilities: {
         //         'browserName': 'chrome',
         //         // 'chromeOptions': {'args': ['show-fps-counter=true']}
         // },


          //  capabilities: {
          //   browserName: 'chrome',
          //   'appium-version': '1.4.10',
          //   platformName: 'Android',
          //    platformVersion: '4.4.4',
          //   deviceName: 'Android Emulator',
          // },

           capabilities: {
            browserName: '',
            app : '/home/twfob/Git/uguru/mobile-app/platforms/android/ant-build/MainActivity-debug.apk',
            'appium-version':'1.4.11',
            platformName: 'android',
            platformVersion: '4.4',
            deviceName: 'Android Emulator',
            'autoAcceptAlerts': 'true',
            autoWebview: true,
          },
        //   multiCapabilities: 
        //   [
         
        //  {'browserName': 'chrome'},
        //  {
        //   'browserName': 'firefox'
        //   // Additional spec files to be run on this capability only.
        
        //  }
        //   // {'browserName': 'phantomjs'}

        specs:

        [
          '../test_case/mobileTest/access.js'


        ],
        suites:
        {
            access: ['../test_case/mobileTest/access.js'],
            
            university: ['../test_case/mobileTest/workflows/access.js',
                         '../test_case/mobileTest/university.js'
                        ],

            sign:   [
                   '../test_case/mobileTest/workflows/access.js',
                   '../test_case/mobileTest/workflows/university.js', 
                   // '../test_case/mobileTest/sidemenu/sidemenu.js',
                      // '../test_case/mobileTest/guruProfile/home.js',
                      '../test_case/mobileTest/sidemenu/signup.js'
                    ],

            side:   [
                      // '../test_case/mobileTest/workflows/access.js',
                      // '../test_case/mobileTest/workflows/university.js', 
                      '../test_case/mobileTest/sidemenu/sidemenu.js'
                    ],
            major:  [ '../test_case/mobileTest/workflows/access.js',
                      '../test_case/mobileTest/workflows/university.js', 
                      '../test_case/mobileTest/becomeGuru/major.js'
                    ],
            course: [ 
                        // '../test_case/mobileTest/workflows/access.js',
                        // '../test_case/mobileTest/workflows/university.js', 
                        // '../test_case/mobileTest/workflows/major.js',
                        '../test_case/mobileTest/becomeGuru/course.js',
                    ],
            category:[
                        '../test_case/mobileTest/workflows/access.js',
                        '../test_case/mobileTest/workflows/university.js', 
                        '../test_case/mobileTest/workflows/major.js',
                        '../test_case/mobileTest/workflows/course.js',
                        '../test_case/mobileTest/becomeGuru/category.js'
                     ],
             photo:[
                          '../test_case/mobileTest/workflows/access.js',
                          '../test_case/mobileTest/workflows/university.js', 
                         // '../test_case/mobileTest/workflows/major.js',
                         // '../test_case/mobileTest/workflows/course.js',
                         // '../test_case/mobileTest/workflows/category.js',
                         '../test_case/mobileTest/workflows/lazy.js',
                         '../test_case/mobileTest/becomeGuru/photo.js'
                    ],
              guruHome:[
                          // '../test_case/mobileTest/workflows/access.js',
                          // '../test_case/mobileTest/workflows/university.js', 
                          // '../test_case/mobileTest/workflows/major.js',
                          // '../test_case/mobileTest/workflows/course.js',
                          // '../test_case/mobileTest/workflows/category.js',
                          // '../test_case/mobileTest/workflows/photo.js',
                           '../test_case/mobileTest/sidemenu/signup.js',

                          '../test_case/mobileTest/guruProfile/home.js'
                     ],
             credit:[
                         // '../test_case/mobileTest/workflows/access.js',
                         // '../test_case/mobileTest/workflows/university.js', 
                         // '../test_case/mobileTest/workflows/major.js',
                         // '../test_case/mobileTest/workflows/course.js',
                         // '../test_case/mobileTest/workflows/category.js',
                         // '../test_case/mobileTest/workflows/photo.js',
                         '../test_case/mobileTest/guruProfile/creditibility.js'
                    ],
             editGuru:[
                         // '../test_case/mobileTest/workflows/access.js',
                         // '../test_case/mobileTest/workflows/university.js', 
                         // '../test_case/mobileTest/workflows/major.js',
                         // '../test_case/mobileTest/workflows/course.js',
                         // '../test_case/mobileTest/workflows/category.js',
                         // '../test_case/mobileTest/workflows/photo.js',
                         '../test_case/mobileTest/guruProfile/editProfile.js'
                    ],
              becomeGuru:[
                         '../test_case/mobileTest/workflows/access.js',
                         '../test_case/mobileTest/workflows/university.js', 
                         '../test_case/mobileTest/becomeGuru/major.js',
                         '../test_case/mobileTest/becomeGuru/course.js',
                         '../test_case/mobileTest/becomeGuru/category.js',
                         '../test_case/mobileTest/becomeGuru/photo.js'
                         ],
              all : [
                      '../test_case/mobileTest/access.js',
                     '../test_case/mobileTest/university.js',
                     '../test_case/mobileTest/becomeGuru/major.js',
                     '../test_case/mobileTest/becomeGuru/course.js',
                     '../test_case/mobileTest/becomeGuru/category.js',
                     '../test_case/mobileTest/becomeGuru/photo.js',
                      '../test_case/mobileTest/guruProfile/home.js',
                      '../test_case/mobileTest/sidemenu/signup.js',
                      '../test_case/mobileTest/guruProfile/editProfile.js',
                      '../test_case/mobileTest/guruProfile/creditibility.js'
                    ],
              mobile : 
                       [
                           '../test_case/mobileTest/workflows/access.js',
                           '../test_case/mobileTest/university.js', 
                           '../test_case/mobileTest/becomeGuru/major.js',
                           '../test_case/mobileTest/becomeGuru/course.js',
                           '../test_case/mobileTest/becomeGuru/category.js',
                           '../test_case/mobileTest/becomeGuru/photo.js',
                           '../test_case/mobileTest/sidemenu/signup.js',
                           '../test_case/mobileTest/guruProfile/home.js',
                           '../test_case/mobileTest/guruProfile/editProfile.js',
                           '../test_case/mobileTest/guruProfile/creditibility.js'
                       ]

        },
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
           var wd = require('wd'),
                   protractor = require('protractor'),
                    wdBridge = require('wd-bridge')(protractor, wd);
                   wdBridge.initFromProtractor(exports.config);

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
                        success: ' * ✓ ',
                        failure: ' * ✗ ',
                        pending: '  * - '
                    },
                    customProcessors: []
                }));



    
            protractor.get = require('../test_case/globals.js').globals;
            protractor.run = require('../test_case/globals.js').run;
            global.doc =require('../test_case/newGlobals.js');
            global.EC  = protractor.ExpectedConditions;
            global.localhost = '192.168.0.105'
            // console.log( "W : "+ browser.params.screenSize.w+ " H :"+browser.params.screenSize.h)
            // browser.driver.manage().window().setSize(browser.params.screenSize.w, browser.params.screenSize.h);
             // browser.get("http://localhost:8100/#/")
            // browser.sleep(3000);

        }
        
};