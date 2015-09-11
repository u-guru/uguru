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
              '../test_case/Release_One_Mobile/Request/*'
        ],
        suites:
        {
          init :   '../test_case/Release_One_Mobile/Request/first_course.js',
          add  :   '../test_case/Release_One_Mobile/Request/add_course.js',
          addS :   '../test_case/WorkFlows/workflow_three.js',
          add_session : '../test_case/Release_One_Mobile/Request/add_session.js',
          add_question : '../test_case/Release_One_Mobile/Request/add_question.js',
          add_task : '../test_case/Release_One_Mobile/Request/add_task.js',

          delete_session_Hold : [ '../test_case/backHome.js','../test_case/Release_One_Mobile/Request/delete_session_Hold.js'],
          delete_session_Click: [ '../test_case/backHome.js','../test_case/Release_One_Mobile/Request/delete_session_Click.js']

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
	          //facebook log in
       			protractor.run.setUp("http://localhost:8100/#/new-home","jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
            // browser.sleep(800);     
        }
        
};