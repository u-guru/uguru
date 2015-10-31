

exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',


         capabilities: {
                 'browserName': 'chrome'
         },
        //   multiCapabilities: [
        //   {'browserName': 'chrome'},
        //   {'browserName': 'firefox'},
        //   {'browserName': 'safari'},

        //   // {'browserName': 'phantomjs'}
        // ],
        specs: [
             'e2e/production/workflow#1.js',
             'e2e/production/workflow#2.js',
             'e2e/production/workflow#3.js'

        ],
        // suites:
        // {
        //   // search :     ['../test_case/Release_One_Web/homepage/search_box.js'],
        //    // breadcrumb : ['../test_case/Release_One_Web/homepage/breadcrumb.js'],
        //   //team : '../test_case/Release_One_Web/team/team.js',
          
        // },
        suites: {
                // start_one : '../test_case/Release_One_Web/homepage/started_box.js',
                // start_two : '../test_case/Release_One_Web/homepage/started_box_2.js',
                // breadcrumb : ['../test_case/Release_One_Web/homepage/breadcrumb.js'],
                // loading : 'Release_One_Web/homepage/loading.js'
                  
                    faq : 'Release_One_Web/faq.js',
                    workpane :'Release_One_Web/workpane.js',
                     whypane : 'Release_One_Web/whypane.js',
                    searchpane : 'Release_One_Web/searchpane.js',
                    splash : 'Release_One_Web/style/splashPosition.js',
                    button : 'Release_One_Web/style/button.js',
                    overlap: 'Release_One_Web/style/overlap.js'
        },
        // resultJsonOutputFile: '../test_case/Release_One_Web/result.json',
        // rootElement: "[ng-app]" ,
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
         allScriptsTimeout: 5000,
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
            // protractor.get = require('../test_case/globals.js').globals;
            // protractor.run = require('../test_case/globals.js').run;


       			// protractor.run.setUp("http://localhost:8100/#/new-home","jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
            // browser.sleep(800);

            global.protractor = protractor;
            global.browser = browser;
            global.$ = browser.$;
            global.$$ = browser.$$;
            global.element = browser.element;     
            global.dv = browser.driver;
            global.EC = protractor.ExpectedConditions;
            global.web =require('./Release_One_Web/global.po.js');
            global.home =require('./e2e/PageObjects/homePageObject.js');
            global.support =require('./e2e/PageObjects/supportPageObject.js');

            dv.get('http://www.uguru.me/');

            global.isAngularSite = function(flag){
                browser.ignoreSynchronization = !flag;
            };

        }
        
};