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
     seleniumAddress: 'http://localhost:4444/wd/hub',
       baseUrl: 'http://localhost:8000',
     // seleniumAddress: 'http://localhost:4723/wd/hub',

         capabilities: {
                 'browserName': 'chrome'
         },

          //  capabilities: {
          //   browserName: 'chrome',
          //   'appium-version': '1.4.10',
          //   platformName: 'Android',
          //   platformVersion: '4.4.2',
          //   deviceName: 'Android Emulator',
          // },414, 736
          multiCapabilities: 
          [
         
         // {'browserName': 'chrome',
         //    params: {
         //        screenSize: {
         //          width: 414,
         //          length: 736.
         //        }
         //  },
         {
          'browserName': 'firefox'
          // Additional spec files to be run on this capability only.
        
         }
          // {'browserName': 'phantomjs'}
        ],
         params: {
          login: {
            user: 'Jane',
            password: '1234'
          }
        },
        // specs:
        // [
        //   '../test_case/mobileTest/access.js',
        //   '../test_case/mobileTest/university.js',
        //   '../test_case/mobileTest/sidemenu/signup.js'



        // ],
        suites:
        {
            access: ['../test_case/mobileTest/access.js'],
            
            university: ['../test_case/mobileTest/workflows/access.js',
                         '../test_case/mobileTest/university.js'
                        ],

            sign:   ['../test_case/mobileTest/workflows/access.js',
                   '../test_case/mobileTest/workflows/university.js', 
                   '../test_case/mobileTest/sidemenu/signup.js'
                    ],

            side:   [ '../test_case/mobileTest/workflows/access.js',
                   '../test_case/mobileTest/workflows/university.js', 
                    '../test_case/mobileTest/sidemenu/sidemenu.js'
                    ],
            major:  [ '../test_case/mobileTest/workflows/access.js',
                      '../test_case/mobileTest/workflows/university.js', 
                      '../test_case/mobileTest/becomeGuru/major.js'
                    ],
            course: [  '../test_case/mobileTest/workflows/access.js',
                        '../test_case/mobileTest/workflows/university.js', 
                        '../test_case/mobileTest/workflows/major.js',
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
                         '../test_case/mobileTest/workflows/major.js',
                         '../test_case/mobileTest/workflows/course.js',
                         '../test_case/mobileTest/workflows/category.js',
                         '../test_case/mobileTest/becomeGuru/photo.js'
                    ],
              guruHome:[
                          // '../test_case/mobileTest/workflows/access.js',
                          // '../test_case/mobileTest/workflows/university.js', 
                          // '../test_case/mobileTest/workflows/major.js',
                          // '../test_case/mobileTest/workflows/course.js',
                          // '../test_case/mobileTest/workflows/category.js',
                          // '../test_case/mobileTest/workflows/photo.js',
                          '../test_case/mobileTest/guruProfile/home.js'
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
          // var wd = require('wd'),
          //   protractor = require('protractor'),
          //    wdBridge = require('wd-bridge')(protractor, wd);
          //   wdBridge.initFromProtractor(exports.config);


    
            protractor.get = require('../test_case/globals.js').globals;
            protractor.run = require('../test_case/globals.js').run;
            global.doc =require('../test_case/newGlobals.js');
            global.EC  = protractor.ExpectedConditions;
            browser.driver.manage().window().setSize(414, 736);
            browser.get("http://localhost:8100/#/")
            browser.sleep(3000);
        }
        
};