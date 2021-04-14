"use strict";
var IP = '192.168.0.110'
exports.config = {
    framework: 'jasmine2',

     // baseUrl: 'http://10.0.0.2:8000/',
     // baseUrl: 'http://192.168.56.109:5555/',
        seleniumAddress: 'http://localhost:4723/wd/hub',
         capabilities: {
          browserName: '',
           //app : '/home/twfob/Git/uguru/mobile-app/platforms/android/ant-build/MainActivity-debug.apk',
           app : '/Users/Jason-work/Git/uguru/mobile-app/platforms/android/build/outputs/apk/android-armv7-debug.apk',


            // app : '/home/twfob/Git/uguru/mobile-app/platforms/android/build/outputs/apk/android-armv7-debug-unaligned.apk',
          'appium-version':'1.4.10',
          platformName: 'Android',
          platformVersion: '4.4',
          deviceName: 'Android Emulator',
          // 'autoAcceptAlerts': 'true',
          autoWebview:true

        },
        specs:

        [
          '../e2e/browser/firsttimeusrSpec.js', 
          // '../e2e/workflows/workflow#*.js',    


        ],
        suites:
        {
            access: ['../e2e/access/*Spec.js'],
            
            university: [
                         '../test_case/mobileTest/workflows/access.js',
                         '../e2e/university/universitySpec.js'
                        ],
            home : 
                  [
                    '../test_case/mobileTest/workflows/access.js',
                    '../test_case/mobileTest/workflows/university.js', 
                    '../e2e/workflows/home.js',
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

            major:  [
                      '../test_case/mobileTest/workflows/access.js',
                      '../test_case/mobileTest/workflows/university.js', 
                      '../e2e/becomeGuru/majorSpec.js'
                    ],
            alert:  [
        
                      '../e2e/alertTest.js'
                    ],
            course: [ 
                        '../test_case/mobileTest/workflows/access.js',
                        '../test_case/mobileTest/workflows/university.js', 
                        '../e2e/workflows/major.js',
                        '../e2e/becomeGuru/courseSpec.js',
                    ],
            category:[
                        '../test_case/mobileTest/workflows/access.js',
                        '../test_case/mobileTest/workflows/university.js', 
                        '../e2e/workflows/major.js',
                        '../e2e/workflows/course.js',
                        '../e2e/becomeGuru/categorySpec.js'
                     ],
             photo:[
                          '../test_case/mobileTest/workflows/access.js',
                          '../test_case/mobileTest/workflows/university.js', 
                          '../e2e/workflows/major.js',
                          '../e2e/workflows/course.js',
                          '../e2e/workflows/category.js',
                          '../e2e/becomeGuru/photoSpec.js'
                    ],
              guruHome:[
                          // '../test_case/mobileTest/workflows/access.js',
                          // '../test_case/mobileTest/workflows/university.js', 
                          //  '../e2e/workflows/home.js',
                          //  '../e2e/workflows/major.js',
                          //  '../e2e/workflows/course.js',
                          //  '../e2e/workflows/category.js',
                          //  '../e2e/becomeGuru/photoSpec.js',
                           '../e2e/account/signupSpec.js',
                           // '../e2e/guruProfile/homeSpec.js',

                          // '../test_case/mobileTest/guruProfile/home.js'
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
                          '../test_case/mobileTest/sidemenu/signup.js',
                         '../test_case/mobileTest/guruProfile/home.js',
                         '../test_case/mobileTest/guruProfile/editProfile.js'
                    ],
              becomeGuru:[
                         '../e2e/becomeGuru/majorSpec.js',
                         '../e2e/becomeGuru/courseSpec.js',
                         '../e2e/becomeGuru/categorySpec.js',
                         '../e2e/becomeGuru/photoSpec.js'
                         ],
              all : [
                      '../e2e/access/*Spec.js',
                      '../e2e/university/*Spec.js',
                      '../e2e/becomeGuru/major.js',
                      '../e2e/becomeGuru/course.js',
                      '../e2e/becomeGuru/category.js',
                      '../e2e/becomeGuru/photo.js',
                      '../test_case/mobileTest/guruProfile/home.js',
                      '../test_case/mobileTest/sidemenu/signup.js',
                      '../test_case/mobileTest/guruProfile/editProfile.js',
                      '../test_case/mobileTest/guruProfile/creditibility.js'
                    ],
              mobile : 
                       [
                           '../e2e/access/*Spec.js',
                           '../e2e/university/*Spec.js',
                           '../e2e/workflows/home.js',
                           '../e2e/becomeGuru/majorSpec.js',
                           '../e2e/becomeGuru/courseSpec.js',
                           '../e2e/becomeGuru/categorySpec.js',
                           '../e2e/becomeGuru/photoSpec.js',
                           '../test_case/mobileTest/sidemenu/signup.js',
                           '../test_case/mobileTest/guruProfile/home.js',
                           '../test_case/mobileTest/guruProfile/editProfile.js',
                           '../test_case/mobileTest/guruProfile/creditibility.js'
                       ],
               work_A : [
                           '../test_case/mobileTest/workflows/access.js',
                           '../test_case/mobileTest/workflows/university.js', 
                           '../e2e/workflows/home.js',
                           '../e2e/workflows/side.js',
                           '../e2e/workflows/editUniversity.js',
                           // '../e2e/becomeGuru/majorSpec.js',
                           // '../e2e/becomeGuru/courseSpec.js',
                           // '../e2e/becomeGuru/categorySpec.js',
                           // '../e2e/becomeGuru/photoSpec.js'
                       ],
                work_C_sign : [
                           '../e2e/workflows/access.js',
                           '../test_case/mobileTest/workflows/university.js', 
                           '../e2e/workflows/home.js',
                           '../e2e/workflows/side.js',
                           '../e2e/workflows/SignAtSidebar.js',
                           '../e2e/workflows/major.js',
                           '../e2e/workflows/course.js',
                           '../e2e/workflows/category.js',
                           '../e2e/becomeGuru/photoSpec.js',
                           '../e2e/side/switchStudentSpec.js',
                           // '../e2e/becomeGuru/majorSpec.js',
                           // '../e2e/becomeGuru/courseSpec.js',
                           // '../e2e/becomeGuru/categorySpec.js',
                           // '../e2e/becomeGuru/photoSpec.js',
                           // '../e2e/workflows/side.js'
                       ],
                 work_C_log : [
                            '../e2e/workflows/access.js',
                            '../test_case/mobileTest/workflows/university.js', 
                            '../e2e/workflows/home.js',
                            '../e2e/workflows/side.js',
                            '../e2e/workflows/LoginAtSidebar.js',
                            '../e2e/workflows/major.js',
                            '../e2e/workflows/course.js',
                            '../e2e/workflows/category.js',
                            '../e2e/becomeGuru/photoSpec.js',
                            '../e2e/side/switchStudentSpec.js',
                            // '../e2e/becomeGuru/majorSpec.js',
                            // '../e2e/becomeGuru/courseSpec.js',
                            // '../e2e/becomeGuru/categorySpec.js',
                            // '../e2e/becomeGuru/photoSpec.js',
                            // '../e2e/workflows/side.js'
                        ],
                 work_D : [
                            '../e2e/workflows/access.js',
                            '../test_case/mobileTest/workflows/university.js', 
                            '../e2e/workflows/home.js',
                            '../e2e/workflows/side.js',
                            '../e2e/workflows/SignAtSidebar.js',
                            '../e2e/workflows/major.js',
                            '../e2e/workflows/course.js',
                            '../e2e/workflows/category.js',
                            '../e2e/becomeGuru/photoSpec.js',
                            '../e2e/workflows/side.js',
                            '../e2e/side/switchStudentSpec.js',
                            // '../e2e/becomeGuru/majorSpec.js',
                            // '../e2e/becomeGuru/courseSpec.js',
                            // '../e2e/becomeGuru/categorySpec.js',
                            // '../e2e/becomeGuru/photoSpec.js',
                            // '../e2e/workflows/side.js'
                        ],
                  bugs : [
                            // // '../e2e/bugs/error_universitylist.js', //doesn't need anymore
                            // '../e2e/bugs/error_universityScroll.js',
                            // '../e2e/bugs/error_gps.js',
                            // '../e2e/bugs/error_majorScroll.js',
                            // '../e2e/bugs/error_majorSearch.js',
                            //   '../e2e/bugs/error_courseList.js',
                            // '../e2e/bugs/error_profileEditTest.js',
                            // // '../e2e/bugs/error_guruProfileButton.js', //imcomplicated 
                            // '../e2e/bugs/error_sideFacebookButton.js',
                            // '../e2e/bugs/error_editPassword.js',
                            // '../e2e/bugs/error_loginNewAccount.js',
                            // '../e2e/bugs/error_loginExistAccount.js', 
                            // // '../e2e/bugs/error_GPSalertAfterLogoff.js', // prob doesn't need
                            //    '../e2e/bugs/error_guruProfileMajorCourse.js', //imcomplicated 
                            //  '../e2e/bugs/error_scrollAddSkill.js', 
                            //  '../e2e/bugs/error_phone.js', 
                            //   '../e2e/bugs/error_QAsupport.js', 
                            //   '../e2e/bugs/error_profilePhoto.js', 
                            //   // '../e2e/bugs/error_profileName.js',  // incomplicated 
                            // '../e2e/bugs/error_BecomeGuruToProfile.js', 
                            // // '../e2e/bugs/error_sidebar.js', 
                          ],
      production_error  :[
                            
                          // '../e2e/production/error_7.js',
                          // '../e2e/production/error_9.js',
                          // '../e2e/production/error_11.js',
                          '../e2e/production/issue#3935.js',
                         ]

        },
        // restartBrowserBetweenTests: true,
        rootElement: "[ng-app]" ,

       // rootElement: 'uguru' ,
        jasmineNodeOpts: {
                          showColors: true,
                          defaultTimeoutInterval: 4000000,
                          isVerbose: true,
                          silent: true
                          ,
                          print: function() {}

                          },
        getPageTimeout: 4000000,
        allScriptsTimeout: 4000000,
        onPrepare: function () {
           var wd = require('wd'),
                   protractor = require('protractor'),
                    wdBridge = require('wd-bridge')(protractor, wd);
                   wdBridge.initFromProtractor(exports.config);

            var SpecReporter = require('jasmine-spec-reporter');
            // var webdriver = require('selenium-webdriver');

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


// var webdriver = require('selenium-webdriver'),
//     By = require('selenium-webdriver').By,
//     until = require('selenium-webdriver').until;

// var driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();

    
            protractor.get = require('../test_case/globals.js').globals;
            protractor.run = require('../test_case/globals.js').run;

            global.doc =require('../test_case/newGlobals.js');
            global.account = require('../e2e/account/accountPageObject.js');
            global.credibility = require('../e2e/guruProfile/creditibilityPageObject.js');
            global.guruprofile = require('../e2e/guruProfile/GuruProfilePageObject.js');
            global.guru = require('../e2e/guruProfile/guruPageObject.js');
            global.university = require('../e2e/university/universityPageObject.js');
            global.access = require('../e2e/access/accessPageObject.js');
            global.major = require('../e2e/becomeGuru/majorPageObject.js');
            global.course = require('../e2e/becomeGuru/coursePageObject.js');
            global.category = require('../e2e/becomeGuru/categoryPageObject.js');
            global.home= require('../e2e/home/homePageObject.js');
            global.photo = require('../e2e/becomeGuru/photoPageObject.js');
            global.sidebar= require('../e2e/side/sidebarPageObject.js');




            global.EC  = protractor.ExpectedConditions;
            global.localhost = IP

            browser.manage().deleteAllCookies();
            // browser.executeScript('window.sessionStorage.clear();');
            // browser.executeScript('window.localStorage.clear();');
            // console.log( "W : "+ browser.params.screenSize.w+ " H :"+browser.params.screenSize.h)
            // browser.driver.manage().window().setSize(browser.params.screenSize.w, browser.params.screenSize.h);
             // browser.get("http://localhost:8100/#/")
            // browser.sleep(3000);

        }
        
};