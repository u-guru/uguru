'use strict';

var appName = '<%= ngModulName %>';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var beep = require('beepbeep');
var express = require('express');
var path = require('path');
var open = require('open');
var stylish = require('jshint-stylish');
var connectLr = require('connect-livereload');
var streamqueue = require('streamqueue');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var minifyCSS = require('gulp-minify-css');
var debug = require('gulp-debug');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var karma = require('karma').server;


/**
 * Parse arguments
 */
var args = require('yargs')
    .alias('b', 'build')
    .default('build', false)
    .argv;

var build = args.build;
var targetDir = path.resolve('dest');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname));
  app.listen(4000);
});

// var tinylr;
// gulp.task('livereload', function() {
//   tinylr = require('tiny-lr')();
//   tinylr.listen(4002);
// });

// function notifyLiveReload(event) {
//   var fileName = require('path').relative(__dirname, event.path);

//   tinylr.changed({
//     body: {
//       files: [fileName]
//     }
//   });
// }

// gulp.task('styles', function() {
//       return gulp.src('www/remote/css/sass/*.scss')
//         .pipe(sass({ style: 'expanded' }))
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
//         .pipe(gulp.dest('css'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(minifycss())
//         .pipe(gulp.dest('css'));
// });

// gulp.task('watch', function() {
//   gulp.watch('www/remote/css/sass/*.scss', ['sass']);
//   // gulp.watch('www/remote/css/sass/*.scss', notifyLiveReload);
// });

var IS_WATCH = false;
gulp.task('watch', function() {
  IS_WATCH = true;
  gulp.watch('www/remote/css/sass/*.scss', ['sass', 'sassy']);
});

gulp.task('sass', function(done) {
  gulp.src('www/remote/css/sass/new.scss')
    .pipe(sass({
      onError: function(err) {
        //If we're watching, don't exit on error
        if (IS_WATCH) {
          console.log(gutil.colors.red(err));
        } else {
          done(err);
        }
      }
    }))
    .pipe(plugins.concat('new.css'))
    .pipe(gulp.dest('www/remote/css/sass'))
    .on('end', done);
});

gulp.task('sassy', function(done) {
  gulp.src('www/remote/css/sass/components.scss')
    .pipe(sass({
      onError: function(err) {
        //If we're watching, don't exit on error
        if (IS_WATCH) {
          console.log(gutil.colors.red(err));
        } else {
          done(err);
        }
      }
    }))
    .pipe(plugins.concat('components.css'))
    .pipe(gulp.dest('www/remote/css/sass'))
    .on('end', done);
});

gulp.task('run_test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.config.js',
        singleRun: true
    }, function() {
        done();
    });
});

// global error handler
var errorHandler = function(error) {
  if (build || prePush) {
    throw error;
  } else {
    beep(2, 170);
    plugins.util.log(error);
  }
};


// clean target dir
gulp.task('clean', function(done) {
  del([targetDir], done);
});

// precompile .scss and concat with ionic.css
gulp.task('styles', function() {
  var options = build ?
                { style: 'compressed' } :
                { style: 'expanded' };
  var cssStream2 = gulp.src('www/remote/css/ionic.app.min.css');
  var cssStream3 = gulp.src('www/remote/css/pure-min.css');
  var cssStream4 = gulp.src('www/remote/css/sass/grids-responsive-min.css');
  var cssStream5 = gulp.src('www/remote/css/sass/style.css');
  var cssStream6 = gulp.src('www/remote/css/sass/views/access.css');
  var cssStream7 = gulp.src('www/remote/css/sass/views/home.css');
  var cssStream8 = gulp.src('www/remote/css/sass/views/side-menu.css')
  var cssStream9 = gulp.src('www/remote/css/sass/views/university.css')
  var cssStream10 = gulp.src('www/remote/css/sass/views/modals.css')
  var cssStream11 = gulp.src('www/remote/css/sass/views/skills.css')
  var cssStream12 = gulp.src('www/remote/css/sass/views/major.css')
  var cssStream13 = gulp.src('www/remote/css/sass/views/courses.css')
  var cssStream14 = gulp.src('www/remote/css/sass/views/photo.css')
  var cssStream15 = gulp.src('www/remote/css/sass/views/guru.css')
  var cssStream16 = gulp.src('www/remote/css/sass/samir.css')
  var cssStream17 = gulp.src('www/remote/css/sass/views/guru-profile.css')
  var cssStream18 = gulp.src('www/remote/css/sass/views/guru-credibility.css')
  var cssStream19 = gulp.src('www/remote/css/sass/ios.css')
  // .src('www/remote/css/responsive.css');
  // var cssStream3 = gulp
  // .src('www/remote/css/angular-strap.css');
  // var cssStream4 = gulp
  // .src('www/remote/css/app.css');
  // var cssStream5 = gulp
  // .src('www/remote/css/style.css');
  // var cssStream6 = gulp
  // .src('www/remote/css/animate.css');
  // var cssStream6 = gulp
  // .src('www/remote/css/animate.css');

  return streamqueue({ objectMode: true }, cssStream2, cssStream3,
    cssStream4, cssStream5, cssStream6, cssStream7, cssStream8,
    cssStream9, cssStream10, cssStream11, cssStream12, cssStream13,
    cssStream14, cssStream15, cssStream16, cssStream17, cssStream18, cssStream19).pipe(plugins.concat('main.css'))
    .pipe(plugins.if(build, plugins.stripCssComments()))
    .pipe(minifyCSS())
    .pipe(plugins.if(build, plugins.rev()))
    .pipe(gulp.dest(path.join(targetDir, 'styles')))
    .on('error', errorHandler);
});


// build templatecache, copy scripts.
// if build: concat, minsafe, uglify and versionize
gulp.task('scripts', function() {
  var dest = path.join(targetDir, 'scripts');

  var minifyConfig = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeComments: true
  };

  // prepare angular template cache from html templates
  // (remember to change appName var to desired module name)
  var templateStream = gulp
      .src([
        'templates/root.html',
        'templates/access.html',
        'templates/university.html',
        'templates/university.container.html',
        'templates/majors.container.html',
        'templates/guru.courses.container.html',
        'templates/signup.html',
        'templates/guru.remote.html',
        'templates/guru.languages.container.html',
        'templates/guru.experiences.container.html',
        'templates/payments.html',
        'templates/student.guru-book.html',
        'templates/student.settings.html',
        'templates/student.settings.html',
        'templates/add-course.modal.html',
        'templates/add-university.modal.html',
        'templates/university.modal.html',
        'templates/signup.modal.html',
        // 'templates/become-guru.modal.html',
        'templates/offline.html',
        'templates/*html',
        // 'templates/guru/*html',
        // 'templates/components/modals/*html',
        // 'templates/components/details/*html',
        // 'templates/components/inputs/*html'
      ], { cwd: 'www/remote' })

    .pipe(plugins.angularTemplatecache('templates.js', {
      root: 'templates/',
      module: 'uguru',
      htmlmin: build && minifyConfig
    }));

  var scriptStream = gulp

    .src([
      'templates.js',
      'lib/ionic/js/ionic.bundle.min.js',
      'lib/angular-ui-custom/ui-bootstrap-custom*.min.js',
      'lib/lodash/dist/lodash.js',
      'lib/stripe/stripe.js',
      'lib/angular-google-maps/angular-google-maps.min.js',
      'lib/restangular/dist/restangular.js',
      'lib/angular-strap/angular-strap.min.js',
      'lib/angular-strap/angular-strap.tpl.min.js',
      'lib/angular-animate/angular-animate.js',
      'lib/ngCordova/dist/ng-cordova.js',
      'lib/progressbar/*.js',
      'lib/interact/interact.min.js',
      'lib/spinningwheel/spinning-wheel.min.js',
      'lib/velocity/velocity.min.js',
      'lib/velocity/velocity.ui.min.js',
      'lib/velocity/angular-velocity.min.js',
      'lib/card/card.js',
      // 'cordova.js',
      // 'plugins/*/www/*.js',
      "js/main.js",
      "js/factories/LocalStorage.js",
      "js/factories/University.js",
      "js/factories/*.js",
      "js/shared/DeviceService.js",
      "js/device/*.js",
      "js/services/RootService.js",
      "js/shared/Settings.js",
      "js/shared/Utilities.js",
      "js/shared/*.js",
      "js/university/*.js",
      "js/access/*.js",
      "js/services/*.js",
      "js/services/hardware/*.js",
      "js/controllers/student/home.ctrl.js",
      "js/controllers/student/*.js",
      "js/controllers/guru/guru.ctrl.js",
      "js/controllers/guru/*.js",
      // "js/controllers/student/settings/*.js",
      // "js/controllers/util/util.university.ctrl.js",
      "js/controllers/util/*.js",
      // "js/controllers/onboarding/onboarding.request-location.ctrl.js",
      // "js/controllers/onboarding/*.js"
      ], { cwd: 'www/remote' })
    // .src(['templates.js', 'app.js', '**/*.js'], { cwd: 'app/scripts' })

    .pipe(plugins.if(!build, plugins.changed(dest)));

  // return streamqueue({ objectMode: true }, scriptStream, templateStream)
  return streamqueue({ objectMode: true }, scriptStream, templateStream)
    .pipe(plugins.if(build, plugins.ngAnnotate()))
    .pipe(plugins.if(build, plugins.concat('app.js')))
    .pipe(plugins.if(build, plugins.uglify()))
    .pipe(plugins.if(build, plugins.rev()))

    .pipe(gulp.dest(dest))

    .on('error', errorHandler);
});

// lint js sources based on .jshintrc ruleset
gulp.task('jsHint', function(done) {
  return gulp
    .src([
      // 'cordova.js',
      // 'cordova_plugins.js',
      "js/main.js",
      // "js/directives/*.js",
      // "js/factories/*.js",
      // "js/services/RootService.js",
      // "js/services/*.js",
      // "js/services/hardware/*.js",
      // "js/controllers/student/student.home.ctrl.js",
      // "js/controllers/student/*.js",
      // "js/controllers/student/settings/*.js",
      // "js/controllers/guru/guru.onboarding.ctrl.js",
      // "js/controllers/guru/*.js",
      // "js/controllers/util/util.university.ctrl.js",
      // "js/controllers/util/*.js",
      ], { cwd: 'www/remote' })
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))

    .on('error', errorHandler);
    done();
});

// copy fonts
// gulp.task('fonts', function() {
//   return gulp
//     .src(['app/fonts/*.*', 'bower_components/ionic/fonts/*.*'])

//     .pipe(gulp.dest(path.join(targetDir, 'fonts')))

//     .on('error', errorHandler);
// });


// copy templates
gulp.task('templates', function() {
  return gulp.src([
        'templates/student.home.html',
        'templates/student.home.body.html',
        'templates/student.guru-book.html',
        'templates/student.settings.html',
        'templates/student.settings.html',
        'templates/components/modals/add-course.modal.html',
        'templates/components/modals/add-university.modal.html',
        'templates/components/modals/university.modal.html',
        // 'templates/components/modals/signup.modal.html',
        'templates/components/modals/become-guru.modal.html',
        'templates/util/offline.html',
        'templates/*html',
        'templates/guru/*html',
        'templates/components/modals/*html',
        'templates/components/details/*html',
        'templates/components/inputs/*html',

      ], { cwd: 'www/remote' })
    .pipe(gulp.dest(path.join(targetDir, 'templates')))

    .on('error', errorHandler);
});

// generate iconfont
gulp.task('iconfont', function(){
  return gulp.src('app/icons/*.svg', {
      buffer: false
    })
    .pipe(plugins.iconfontCss({
      fontName: 'ownIconFont',
      path: 'app/icons/own-icons-template.css',
      targetPath: '../styles/own-icons.css',
      fontPath: '../fonts/'
    }))
    .pipe(plugins.iconfont({
        fontName: 'ownIconFont'
    }))
    .pipe(gulp.dest(path.join(targetDir, 'fonts')))
    .on('error', errorHandler);
});

// copy images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.*')
    .pipe(gulp.dest(path.join(targetDir, 'images')))

    .on('error', errorHandler);
});

// // concatenate and minify vendor sources
// gulp.task('vendor', function() {
//   var vendorFiles = require('./vendor.json');

//   return gulp.src(vendorFiles)
//     .pipe(plugins.concat('vendor.js'))
//     .pipe(plugins.if(build, plugins.uglify()))
//     .pipe(plugins.if(build, plugins.rev()))

//     .pipe(gulp.dest(targetDir))

//     .on('error', errorHandler);
// });


// inject the files in index.html
// gulp.task('index', function() {

//   // build has a '-versionnumber' suffix
//   var cssNaming = build ? 'styles/main-*' : 'styles/main*';

//   // injects 'src' into index.html at position 'tag'
//   var _inject = function(src, tag) {
//     return plugins.inject(src, {
//       starttag: '<!-- inject:' + tag + ':{{ext}} -->',
//       read: false,
//       addRootSlash: false
//     });
//   };

//   // get all our javascript sources
//   // in development mode, it's better to add each file seperately.
//   // it makes debugging easier.
//   var _getAllScriptSources = function() {
//     var scriptStream = gulp.src(['scripts/app.js', 'scripts/**/*.js'], { cwd: targetDir });
//     return streamqueue({ objectMode: true }, scriptStream);
//   };

//   return gulp.src('app/index.html')
//     // inject css
//     .pipe(_inject(gulp.src(cssNaming, { cwd: targetDir }), 'app-styles'))
//     // inject vendor.js
//     .pipe(_inject(gulp.src('vendor*.js', { cwd: targetDir }), 'vendor'))
//     // inject app.js (build) or all js files indivually (dev)
//     .pipe(plugins.if(build,
//       _inject(gulp.src('app*.js', { cwd: targetDir }), 'app'),
//       _inject(_getAllScriptSources(), 'app')
//     ))

//     .pipe(gulp.dest(targetDir))
//     .on('error', errorHandler);
// });



// start watchers
gulp.task('watchers', function() {
  plugins.livereload.listen();
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**', ['fonts']);
  gulp.watch('app/icons/**', ['iconfont']);
  gulp.watch('app/images/**', ['images']);
  gulp.watch('app/scripts/**/*.js', ['jsHint', 'scripts', 'index']);
  gulp.watch('./vendor.json', ['vendor']);
  gulp.watch('app/templates/**/*.html', ['scripts', 'index']);
  gulp.watch('app/index.html', ['index']);
  gulp.watch(targetDir + '/**')
    .on('change', plugins.livereload.changed)
    .on('error', errorHandler);
});

// no-op = empty function
gulp.task('noop', function() {});

// our main sequence, with some conditional jobs depending on params
gulp.task('default', function(done) {
  runSequence(
    'clean',
    // 'iconfont',
    [
      // 'fonts',
      'templates',
      'styles',
      // 'images',
      'jsHint',
      'scripts'
      // 'vendor'
    ],
    // 'index',
    build ? 'noop' : 'watchers',
    build ? 'noop' : 'serve',
    done);
});