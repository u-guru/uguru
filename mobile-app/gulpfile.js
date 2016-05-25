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
var preprocess = require('gulp-preprocess');
var replace = require('gulp-replace-task');
var fs = require('fs');
var htmlmin = require('gulp-htmlmin');
var changed = require('gulp-changed');
var uncss = require('gulp-uncss');

/**
 * Parse arguments
 */
var args = require('yargs')
    .alias('uld', 'update-local-device')
    .alias('b', 'build')
    .alias('m', 'min')
    .default('build', false)
    .argv;

var build = args.build;
var min = args.min;
var uld = args.uld;
var targetDir = path.resolve('dest');
gulp.task('replace', function() {

    var env = args.env || 'localdev';
    var start = args.page || 'university';
    var ip = args.ip;

    var filename = env + '.json';
    var settings = JSON.parse(fs.readFileSync('./config/' + filename, 'utf8'));

    gulp.src('./www/js/constants.js/')
      .pipe(replace({
        patterns: [
          {
            match: 'local',
            replacement: settings.local
          },
          {
            match: 'startpage',
            replacement: start
          },
          {
            match: 'ipaddress',
            replacement: ip
          }
        ]
      }))
      .pipe(gulp.dest('./www/remote/js/'));

    gulp.src('./platforms/android/AndroidManifest.xml')
      .pipe(replace({
        patterns: [
        {
          match: /adjustResize/g,
          replacement: 'adjustPan'
        },
        {
          match: /android:theme="@android:style\/Theme.Black.NoTitleBar/g,
          replacement: 'android:theme="@android:style/Theme.Translucent.NoTitleBar'
        }
        ]
      }))
      .pipe(gulp.dest('./platforms/android/'));
});


gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname));
  app.listen(4000);
});


var IS_WATCH = false;
// gulp.task('watch', function() {
//   IS_WATCH = true;
//   gulp.watch('www/remote/css/sass/*.scss', ['sass', 'sassy']);
//   // gulp.watch('www/remote/js/**/*js', ['jshint-current']);
// });
gulp.task('jshint-current',function(){
     gulp.watch('www/remote/js/**/*js').on('change', function(file) {
      // plugins.livereload.changed(file.path);
      // gutil.log(gutil.colors.yellow('JS changed' + ' (' + file.path + ')'));
         gulp.src(file.path)
         .pipe(plugins.jshint())
         .pipe(plugins.jshint.reporter(stylish))
         .on('error', errorHandler);
     });
});

gulp.task('sass:watch', function () {
    IS_WATCH = true;
  gulp.watch('www/remote/css/sass/*scss', ['sass']);
});

gulp.task('sass', function(done) {
  gulp.watch('www/remote/css/sass/**/*scss').on('change', function(file) {
   // plugins.livereload.changed(file.path);
   gutil.log(gutil.colors.yellow('CSS changed' + ' (' + file.path + ')'));
      gulp.src('www/remote/css/sass/**/*scss')
        // .pipe(sass({
        //   onError: function(err) {
        //     //If we're watching, don't exit on error
        //     if (IS_WATCH) {
        //       console.log(gutil.colors.red(err));
        //     } else {
        //       done(err);
        //     }
        //   }
        // }))
        .pipe(sass().on('error',function(error){
          gutil.log(gutil.colors.yellow('error' + ' (' + error + ')'));

        }))
        .pipe(gulp.dest('www/remote/css/sass'))
        .on('end', done);
  });


  // gulp.src(['www/remote/css/sass/*scss','!www/remote/css/sass/mixin.scss'])
  //   .pipe(sass().on('error',function(err) {
  //       //If we're watching, don't exit on error
  //       if (IS_WATCH) {
  //         gutil.log(gutil.colors.red(err));
  //       } else {
  //         done(err);
  //       }
  //     }))
  //   // .pipe(plugins.concat('new.css'))
  //   .pipe(gulp.dest('www/remote/css/sass'))
  //   .on('end', done);
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

// global error handler
var errorHandler = function(error) {
  // if (build || prePush) {
  if (build) {
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
  var cssStream1 = gulp.src('www/remote/css/ionic.app.min.css');
  var cssStream2 = gulp.src('www/remote/css/sass/utility.css');
  var cssStream3 = gulp.src('www/remote/css/sass/components.css');
  var cssStream4 = gulp.src('www/remote/css/sass/style.css');
  var cssStream5 = gulp.src('www/remote/css/sass/swiper.css');
  var cssStream6 = gulp.src('www/remote/css/sass/loading.css');
  var cssStream7 = gulp.src('www/remote/lib/dropzone/dropzone.min.css');
  var cssStream8 = gulp.src('www/remote/css/sass/material.css');
  var cssStream9 = gulp.src('www/remote/css/sass/animate.css');
  var cssStream10 = gulp.src('www/remote/css/sass/magic.css');
  var cssStream11 = gulp.src('www/remote/css/sass/animation.css');
  var cssStream12 = gulp.src('www/remote/css/sass/desktop.css');
  var cssStream13 = gulp.src('www/remote/css/sass/universal.css');
  var cssStream14 = gulp.src('www/remote/css/sass/modals.css');
  var cssStream15 = gulp.src('www/remote/css/sass/admin.css');
  var cssStream16 = gulp.src('www/remote/css/sass/home.css');
  var cssStream17 = gulp.src('www/remote/css/sass/onboarding.css');
  var cssStream18 = gulp.src('www/remote/css/sass/request.css');

  var cssStream19 = gulp.src('www/remote/css/sass/profile.css');
  var cssStream20 = gulp.src('www/remote/css/sass/profile-color.css');

  var cssStream21 = gulp.src('www/remote/css/sass/splash.css');
  var cssStream22 = gulp.src('www/remote/css/sass/splash-animation.css');
  var cssStream23 = gulp.src('www/remote/css/sass/powerups.css');
  var cssStream24 = gulp.src('www/remote/css/dev/gpa/style.css');
  var cssStream25 = gulp.src('www/remote/css/sass/intercom.css');
  var cssStream26 = gulp.src('www/remote/css/sass/samir.css');
  var cssStream27 = gulp.src('www/remote/css/sass/essay.css');
  var cssStream28 = gulp.src('www/remote/css/sass/angular-fx.css');
  var cssStream29 = gulp.src('www/remote/css/sass/gabrie/style.css');
  var cssStream30 = gulp.src('www/remote/css/sass/jeselle/utility.css');
  var cssStream31 = gulp.src('www/remote/css/sass/jeselle/style.css');





  return streamqueue({ objectMode: true }, cssStream1, cssStream2, cssStream3,
    cssStream4, cssStream5, cssStream6, cssStream7, cssStream8, cssStream9, cssStream10,
    cssStream11, cssStream12, cssStream13, cssStream14, cssStream15, cssStream16, cssStream17, cssStream18,
    cssStream19, cssStream20, cssStream21, cssStream22, cssStream23, cssStream24, cssStream25, cssStream26,
    cssStream27, cssStream28, cssStream29, cssStream30, cssStream31)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(plugins.if(build, plugins.stripCssComments()))
    .pipe(minifyCSS({keepSpecialComments : 0}))
    .pipe(plugins.if(build, plugins.rev()))
    .pipe(plugins.concat('main.css'))
    // .pipe(uncss({
    //     html: ['dest/templates/**/*html']
    // }))
    // .pipe(minifyCSS())
    .pipe(gulp.dest(path.join(targetDir, 'styles')))
    .on('error', errorHandler);
});

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
        'templates/**/*'
      ], { cwd: 'dest/' })
    // .pipe(debug())
    .pipe(plugins.angularTemplatecache('templates.js', {
      root: '/static/remote/templates/',
      module: 'uguru',
      htmlmin: build && minifyConfig
    }));

    streamqueue({ objectMode: true }, templateStream)
        .pipe(plugins.if(build, plugins.ngAnnotate()))
        .pipe(plugins.if(build, plugins.uglify()))
        .pipe(plugins.if(build, plugins.rev()))
        .pipe(plugins.if(build, plugins.concat('templates.js')))
        .pipe(gulp.dest(dest))

        .on('error', errorHandler);
  var scriptStream = gulp

    .src([
      'templates.js',
      'lib/google/webfont.js',
      'lib/uguru/detect.mobile.js',
      'lib/uguru/preload.analytics.js',
      'lib/ionic/js/ionic.bundle.min.v2.js',
      'lib/angular-ui-custom/ui-bootstrap-custom*.min.js',
      'lib/lodash/dist/lodash.js',
      'lib/cta/cta*.js',
      'lib/peel/peel.js',
      'lib/countup/*.js',
      'lib/theatre/*.js',
      'lib/fastMatcher.js',
      'lib/facebook/openfb.js',
      'lib/scroll/waypoints.min.js',
      'lib/scroll/iscroll.js',
      'lib/facebook/ngopenfb.js',
      'lib/facebook/facebookConnectPlugin.js',
      'lib/facebook/*.js',
      'lib/dropzone/*min.js',
      'lib/ngElastic/*.js',
      'lib/ngMoment/moment.min.js',
      'lib/mo-js/mo.min.js',
      'lib/ngMoment/*.js',
      'lib/snap-svg/*js',
      'lib/swiper/*js',
      'lib/angular-google-maps/angular-google-maps.min.js',
      // 'http://maps.google.com/maps/api/js?sensor=false',
      // 'lib/angular-google-maps/google-marker-with-labels.js',
      'lib/restangular/dist/restangular.js',
      'lib/angular-strap/angular-strap.min.js',
      'lib/angular-strap/angular-strap.tpl.min.js',
      'lib/angular-fx/TweenMax.min.js',
      'lib/angular-fx/ng-fx.min.js',
      'lib/angular-fx/ng-fx-720.min.js',
      // 'lib/angular-animate/angular-animate.js',
      'lib/ngCordova/dist/ng-cordova.js',
      'lib/progressbar/*.js',
      'lib/parallax/*.js',
      'lib/interact/interact.min.js',
      'lib/spinningwheel/spinning-wheel.min.js',
      'lib/velocity/velocity.min.js',
      'lib/velocity/velocity.ui.min.js',
      'lib/velocity/angular-velocity.min.js',
      'lib/card/card.js',
      // 'cordova.js',
      // 'plugins/*/www/*.js',
      'js/shared/stats.js',
      'js/main.js',
      'js/factories/LocalStorage.js',
      'js/factories/University.js',
      'js/factories/*.js',
      'js/directives/customDirectives.js',
      'js/services/RootService.js',
      'js/services/*.js',
      'js/services/hardware/*.js',
      'js/shared/GeolocationService.js',
      'js/shared/DeviceService.js', //first shared service
      'js/shared/Settings.js',
      'js/shared/Utilities.js',
      '!js/shared/*LogService.js',
      'js/shared/uTracker.js',
      'js/shared/RankingService.js',

      'js/shared/TipService.js',
      'js/shared/Settings.js',
      'js/directives/*.js',
      'js/device/*.js',
      '!js/shared/Jeselle*.js',
      'js/shared/*.js',


      'js/university/AddUniversityCtrl.js',
      'js/university/*.js',
      'js/essay/*.js',
      'js/access/*.js',

      // 'js/controllers/student/home.ctrl.js',
      'js/controllers/student/student.ctrl.js',
      'js/controllers/student/*.js',
      'js/controllers/guru/guru.ctrl.js',
      'js/controllers/guru/*.js',
      'js/controllers/gpa/GPAController.js',
      'js/controllers/gpa/*.js',
      'js/controllers/food/*.js',
      'js/controllers/sound/*.js',
      'js/controllers/transit/*.js',
      '!js/controllers/util/*bugs*js',
      'js/controllers/util/*js',
      'js/controllers/dev/util.dev.ctrl.js',
      'js/controllers/dev/util.devtools.ctrl.js',
      'js/controllers/desktop/SettingsCtrl.js',
      'js/controllers/desktop/*',
      'js/controllers/gpa/GPAController.js',
      'js/controllers/gpa/IntroController.js',
      'js/controllers/food/GrubHomeCtrl.js',
      'js/controllers/food/GrubDetailsCtrl.js',
      'js/controllers/food/GrubFiltersCtrl.js',
      'js/controllers/food/restaurants.js',
      'js/controllers/sound/MusicHomeCtrl.js',
      'js/controllers/sound/*.js',
      'js/controllers/transit/TransitHomeCtrl.js',
      'js/controllers/transit/*.js'
      ], { cwd: 'www/remote' })
    // .src(['templates.js', 'app.js', '**/*.js'], { cwd: 'app/scripts' })

    .pipe(plugins.if(!build, plugins.changed(dest)));

  // return streamqueue({ objectMode: true }, scriptStream, templateStream)
  return streamqueue({ objectMode: true }, scriptStream)
    .pipe(plugins.if(build, plugins.ngAnnotate()))
    .pipe(plugins.if(build, plugins.uglify()))
    .pipe(plugins.if(build, plugins.rev()))
    .pipe(plugins.if(build, plugins.concat('app.js')))
    .pipe(gulp.dest(dest));
});


// lint js sources based on .jshintrc ruleset
gulp.task('jsHint', function(done) {
  return gulp
    .src([
      // 'cordova.js',
      // 'cordova_plugins.js',
      'js/main.js',
      'js/directives/*.js',
      'js/factories/*.js',
      'js/services/RootService.js',
      'js/services/*.js',
      'js/services/hardware/*.js',
      'js/controllers/student/student.home.ctrl.js',
      'js/controllers/student/*.js',
      'js/controllers/student/settings/*.js',
      'js/controllers/guru/guru.onboarding.ctrl.js',
      'js/controllers/guru/*.js',
      'js/controllers/util/util.university.ctrl.js',
      'js/controllers/util/*.js',
      ], { cwd: 'www/remote' })
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))

    .on('error', errorHandler);
    // done();
});

// copy images
gulp.task('images', function() {
   gulp.src([
      'templates/**/*png',
       ], { cwd: 'www/remote' })
    .pipe(gulp.dest(path.join(targetDir, 'templates')))

    .on('error', errorHandler);
});

// copy templates
gulp.task('templates', function() {
  return gulp.src([
        'templates/**/*html',
        'templates/**/*tpl',
        'templates/**/*svg'
      ], { cwd: 'www/remote' })
    .pipe(changed(path.join(targetDir, 'templates')))
    .pipe(htmlmin({   collapseWhitespace: true,
                      collapseBooleanAttributes: true,
                      removeAttributeQuotes: true,
                      removeComments: true
                  })) // we can take this out it out
    .pipe(gulp.dest(path.join(targetDir, 'templates')))
    .on('error', errorHandler);
});

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
    [
      'images',
      'templates',
      'styles',
      'jsHint',
    ],
    'scripts',
    // 'index',
    build ? 'noop' : 'watchers',
    build ? 'noop' : 'serve',
    done);
});

gulp.task('min', function(done) {
  runSequence(
    'min-scripts'
    );
});


gulp.task('preprocess-regular', function() {
    return gulp.src(['js/main.js'], { cwd: 'www/remote' })
    .pipe(preprocess({context: {ADMIN:false}}))
    .pipe(gulp.dest('www/remote/js/'));
});

gulp.task('preprocess-admin', function() {
    return gulp.src(['js/main.js'], { cwd: 'www/remote' })
    .pipe(preprocess({context: {ADMIN:true}}))
    .pipe(gulp.dest('www/remote/js/admin/'));
});

gulp.task('uld', function(done) {
  var runSequence = require('run-sequence').use(gulp);
  runSequence(['preprocess-admin']);
});