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
         //     '../test_case/Release_One_Web/homepage/*'
        ],
        suites:
        {
          // search :     ['../test_case/Release_One_Web/homepage/search_box.js'],
          // breadcrumb : ['../test_case/Release_One_Web/homepage/breadcrumb.js'],
          team : '../test_case/Release_One_Web/team/team.js'
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
            
            global.isAngularSite = function(flag){
                browser.ignoreSynchronization = !flag;
            };

        }
        
};