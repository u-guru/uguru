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
<<<<<<< HEAD
      // seleniumAddress: 'http://localhost:4444/wd/hub',
     baseUrl: 'http://10.0.0.2:8000/',
=======
    //appium port has to be 4723
>>>>>>> e51c1bbeeea8bfd503a9eedbdfe42e1cab4ad86b
     seleniumAddress: 'http://localhost:4723/wd/hub',

         // capabilities: {
         //         'browserName': 'chrome',
         //         // 'chromeOptions': {'args': ['show-fps-counter=true']}
         // },

<<<<<<< HEAD
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
=======
         capabilities: {


          //ios settings
                 browserName: '',
                 'appium-version': '1.4.11',
                 app: '/Users/nlmac/Git/uguru/mobile-app/platforms/ios/build/emulator/uguru.app',
                 platformName: 'iOS',
                  platformVersion: '8.4',
                   deviceName: 'iPhone 6',
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

        //   multiCapabilities: [
        //   {'browserName': 'chrome'},
        //   {'browserName': 'firefox'},
        //   {'browserName': 'phantomjs'}
>>>>>>> e51c1bbeeea8bfd503a9eedbdfe42e1cab4ad86b
        // ],
        //  params: {
        //   screenSize: {
        //     w: 414,
        //     h: 736
        //   }
        // },
        specs:
<<<<<<< HEAD
        [
          '../test_case/mobileTest/access.js'


        ],
        // suites:
        // {
        //     access: ['../test_case/mobileTest/access.js'],
            
        //     university: ['../test_case/mobileTest/workflows/access.js',
        //                  '../test_case/mobileTest/university.js'
        //                 ],

        //     sign:   ['../test_case/mobileTest/workflows/access.js',
        //            '../test_case/mobileTest/workflows/university.js', 
        //            '../test_case/mobileTest/sidemenu/sidemenu.js',
        //            '../test_case/mobileTest/sidemenu/signup.js'
        //             ],

        //     side:   [ '../test_case/mobileTest/workflows/access.js',
        //            '../test_case/mobileTest/workflows/university.js', 
        //             '../test_case/mobileTest/sidemenu/sidemenu.js'
        //             ],
        //     major:  [ '../test_case/mobileTest/workflows/access.js',
        //               '../test_case/mobileTest/workflows/university.js', 
        //               '../test_case/mobileTest/becomeGuru/major.js'
        //             ],
        //     course: [  '../test_case/mobileTest/workflows/access.js',
        //                 '../test_case/mobileTest/workflows/university.js', 
        //                 '../test_case/mobileTest/workflows/major.js',
        //                 '../test_case/mobileTest/becomeGuru/course.js',
        //             ],
        //     category:[
        //                 '../test_case/mobileTest/workflows/access.js',
        //                 '../test_case/mobileTest/workflows/university.js', 
        //                 '../test_case/mobileTest/workflows/major.js',
        //                 '../test_case/mobileTest/workflows/course.js',
        //                 '../test_case/mobileTest/becomeGuru/category.js'
        //              ],
        //      photo:[
        //                   '../test_case/mobileTest/workflows/access.js',
        //                   '../test_case/mobileTest/workflows/university.js', 
        //                  // '../test_case/mobileTest/workflows/major.js',
        //                  // '../test_case/mobileTest/workflows/course.js',
        //                  // '../test_case/mobileTest/workflows/category.js',
        //                  '../test_case/mobileTest/workflows/lazy.js',
        //                  '../test_case/mobileTest/becomeGuru/photo.js'
        //             ],
        //       guruHome:[
        //                   // '../test_case/mobileTest/workflows/access.js',
        //                   // '../test_case/mobileTest/workflows/university.js', 
        //                   // '../test_case/mobileTest/workflows/major.js',
        //                   // '../test_case/mobileTest/workflows/course.js',
        //                   // '../test_case/mobileTest/workflows/category.js',
        //                   // '../test_case/mobileTest/workflows/photo.js',
        //                   '../test_case/mobileTest/guruProfile/home.js'
        //              ],
        //      credit:[
        //                  // '../test_case/mobileTest/workflows/access.js',
        //                  // '../test_case/mobileTest/workflows/university.js', 
        //                  // '../test_case/mobileTest/workflows/major.js',
        //                  // '../test_case/mobileTest/workflows/course.js',
        //                  // '../test_case/mobileTest/workflows/category.js',
        //                  // '../test_case/mobileTest/workflows/photo.js',
        //                  '../test_case/mobileTest/guruProfile/creditibility.js'
        //             ],
        //      editGuru:[
        //                  // '../test_case/mobileTest/workflows/access.js',
        //                  // '../test_case/mobileTest/workflows/university.js', 
        //                  // '../test_case/mobileTest/workflows/major.js',
        //                  // '../test_case/mobileTest/workflows/course.js',
        //                  // '../test_case/mobileTest/workflows/category.js',
        //                  // '../test_case/mobileTest/workflows/photo.js',
        //                  '../test_case/mobileTest/guruProfile/editProfile.js'
        //             ],
        //       becomeGuru:[
        //                  '../test_case/mobileTest/workflows/access.js',
        //                  '../test_case/mobileTest/workflows/university.js', 
        //                  '../test_case/mobileTest/becomeGuru/major.js',
        //                  '../test_case/mobileTest/becomeGuru/course.js',
        //                  '../test_case/mobileTest/becomeGuru/category.js',
        //                  '../test_case/mobileTest/becomeGuru/photo.js'
        //                  ],
        //       all : [
        //               '../test_case/mobileTest/access.js',
        //              '../test_case/mobileTest/university.js',
        //              '../test_case/mobileTest/becomeGuru/major.js',
        //              '../test_case/mobileTest/becomeGuru/course.js',
        //              '../test_case/mobileTest/becomeGuru/category.js',
        //              '../test_case/mobileTest/becomeGuru/photo.js'
        //             ]

        // },
        rootElement: "[ng-app]" ,
=======
        ['../test_case/workflows/workflow_1.js'],
        // suites:
        // {
        //     workflow: ['../test_case/workflows/workflow_1.js'],

        // },
        // resultJsonOutputFile: 'www/remote/tests/e2e/result.json',
        //rootElement: "[ng-app]" ,
>>>>>>> e51c1bbeeea8bfd503a9eedbdfe42e1cab4ad86b
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
<<<<<<< HEAD
         
=======
            protractor.get = require('../test_case/globals.js').globals;
            protractor.run = require('../test_case/globals.js').run;
            // browser.driver.manage().window().setSize(414, 736);

            //may need to uncomment this for IOS. but for sure comment out when on android
              browser.driver.get("http://localhost:8100/#/");
              // browser.sleep(1000);
>>>>>>> e51c1bbeeea8bfd503a9eedbdfe42e1cab4ad86b


    
            protractor.get = require('../test_case/globals.js').globals;
            protractor.run = require('../test_case/globals.js').run;
            global.doc =require('../test_case/newGlobals.js');
            global.EC  = protractor.ExpectedConditions;
            console.log( "W : "+ browser.params.screenSize.w+ " H :"+browser.params.screenSize.h)
            // browser.driver.manage().window().setSize(browser.params.screenSize.w, browser.params.screenSize.h);
            // browser.driver.get("http://localhost:8100/#/")
            // browser.sleep(3000);

        }
        
};