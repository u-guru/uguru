exports.config = {
    framework: 'jasmine2',
     seleniumAddress: 'http://localhost:4444/wd/hub',


         capabilities: {
                 'browserName': 'chrome'
         },
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
       


    
            protractor.get = require('../test_case/globals.js').globals;
            protractor.run = require('../test_case/globals.js').run;
            global.doc =require('../test_case/newGlobals.js');
            global.EC  = protractor.ExpectedConditions;
            browser.driver.manage().window().setSize(414, 736);
            browser.get("http://localhost:8100/#/")
            browser.sleep(3000);
        }
        
};