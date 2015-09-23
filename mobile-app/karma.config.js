// Karma configuration
// Generated on Thu Mar 05 2015 05:00:58 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'www/remote/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      //angular source
      "lib/ionic/js/ionic.bundle.js",
      "lib/angular-mocks/angular-mocks.js",
      "lib/**/*.js",
      "lib/**/js/**.js",

      //app files
      "js/main.js",
      "js/directives/*.js",
      "js/factories/*.js",
      "js/services/RootService.js",
      "js/services/*.js",
      "js/controllers/student/student.home.ctrl.js",
      "js/controllers/student/*.js",
      "js/controllers/guru/guru.onboarding.ctrl.js",
      "js/controllers/guru/*.js",
      "js/controllers/onboarding/onboarding.request-location.ctrl.js",
      "js/controllers/onboarding/*js",
      "js/controllers/util/util.university.ctrl.js",
      "js/controllers/util/*.js",
      //test docs
      "tests/controllers/*.js",
    ],


    // list of files to exclude
    exclude: [
      'ionic.project',
      '/base/plugins/',
      'lib/angular-local-storage/*',
      'lib/**/Gruntfile.js',
      'lib/**/karma*.conf.js',
      'lib/facebook/*',
      'lib/angular-mocks/ngAnimate*',
      'lib/angular-mocks/ngMock*',
      'lib/**/*Spec.js',
      'lib/angular/*',
      'lib/ionic/js/angular/*',
      'lib/ionic/js/ionic-angular*',
      'lib/ionic/js/*min*',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
