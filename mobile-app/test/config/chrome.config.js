
var device = 'desktop'
var IP = "http://localhost:5000/static/remote/index.html"
 // var IP = "http://localhost:8100"

exports.config = {
     params: {
                screenSize : "1600x1050"
              },
    framework: 'jasmine2',
     seleniumAddress: 'http://localhost:4444/wd/hub',


         capabilities: {
             'browserName': 'chrome'
         },
        specs:
        [
          '../e2e/browser/firsttimeusrSpec.js', 
          // '../e2e/browser/iphoneSpec.js', 
   
        ],
          suites:
        {
            feature : [
                  '../e2e/browser/loginSpec.js', 
                  '../e2e/browser/chatSpec.js',
                  '../e2e/browser/paymentSpec.js',
                  '../e2e/browser/referralsSpec.js'

                 ],
            ios  :[
                  // '../e2e/browser/iphoneSpec.js',    
                  '../e2e/ios/loginSpec.js',
                  '../e2e/ios/paymentSpec.js',
                 '../e2e/ios/referralSpec.js',
                 '../e2e/ios/chatSpec.js',

                 ]
          
        },
   
        // resultJsonOutputFile: '../test_case/Release_One_Web/result.json',
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
        // getPageTimeout: 10000,
         allScriptsTimeout: 15000,

        onPrepare: function () {
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
            global.EC  = protractor.ExpectedConditions;

            global.lib = require('../e2e/components/lib.js');
            // global.demo =require('../e2e/components/DemographicPageObject.js');
            // global.university =require('../e2e/components/universityPageObject.js');
            // global.home =require('../e2e/components/foodMainPageObject.js');
            // global.gpa =require('../e2e/components/GPAPageObject.js');
            // global.side = require('../e2e/components/sidePageObject.js');
            global.account = require('../e2e/components/accountPageObject.js');
            // global.map = require('../e2e/components/mapPageObject.js');
              global.doc =require('../test_case/newGlobals.js');
              // global.account = require('../e2e/old/account/accountPageObject.js');
              global.credibility = require('../e2e/old/guruProfile/creditibilityPageObject.js');
              global.guruprofile = require('../e2e/old/guruProfile/GuruProfilePageObject.js');
              global.guru = require('../e2e/old/guruProfile/guruPageObject.js');
              global.university = require('../e2e/old/university/universityPageObject.js');
              global.access = require('../e2e/old/access/accessPageObject.js');
              global.major = require('../e2e/old/becomeGuru/majorPageObject.js');
              global.course = require('../e2e/old/becomeGuru/coursePageObject.js');
              global.category = require('../e2e/old/becomeGuru/categoryPageObject.js');
              global.home= require('../e2e/old/home/homePageObject.js');
              global.photo = require('../e2e/old/becomeGuru/photoPageObject.js');
              global.sidebar= require('../e2e/old/side/sidebarPageObject.js');
            global.url = IP 
            global.device = device
            // global.screenlist = screenSizes

            // browser.manage().deleteAllCookies();
            // browser.executeScript('window.sessionStorage.clear();');
            // browser.executeScript('window.localStorage.clear();');
            browser.getCapabilities().then(function(caps)
              {
                global.platform = caps.caps_.platform.toUpperCase();
                global.browserName = caps.caps_.browserName.toUpperCase();
                // console.log(caps.caps_.platform)
                // console.log(caps.caps_.browserName)  
                console.log("Platform : ",global.platform)
                console.log("BrowserName : ",global.browserName)  
              });
            var w =  Number(browser.params.screenSize.split('x')[0])
            var h =  Number(browser.params.screenSize.split('x')[1]) 
            console.log( "W : "+ w+ " H :"+h)
            browser.driver.manage().window().setSize(w,h);

            browser.get(url);
            // browser.get("http://"+localhost+":8100");
            browser.sleep(3000);

        }


};