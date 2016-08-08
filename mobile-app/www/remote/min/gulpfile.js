'use strict';
var appName = '<%= ngModulName %>';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var beep = require('beepbeep');
var express = require('express');
var path = require('path');
var openFile = require('open');
var stylish = require('jshint-stylish');
var connectLr = require('connect-livereload');
var streamqueue = require('streamqueue');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var minifyCSS = require('gulp-minify-css');
var debug = require('gulp-debug');
var autoprefixer = require('gulp-autoprefixer');
// var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');

var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var karma = require('karma').server;
var preprocess = require('gulp-preprocess');
var replace = require('gulp-replace-task');
var fs = require('fs');
var htmlmin = require('gulp-htmlmin');
var changed = require('gulp-changed');
var uncss = require('gulp-uncss');

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
var minifyConfig = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeComments: true
};

var errorHandler = function(error) {
  if (build || prePush) {
    throw error;
  } else {
    beep(2, 170);
    plugins.util.log(error);
  }
};

// our main sequence, with some conditional jobs depending on params
gulp.task('sass:watch', function () {
  // gulp.watch('**/*.scss', ['sass']);
  gulp.watch('**/*.scss').on('change', function(file) {
      // plugins.livereload.changed(file.path);
      // gutil.log(path.dirname(file.path));
      var folder = path.dirname(file.path).replace('/scss','/compiled');
      // gutil.log(folder);
      sass(file.path, {
        sourcemap: true
      })
      .on('error', sass.logError)
      .pipe(sourcemaps.write('../compiled'))
      .pipe(gulp.dest(folder));

  });
});

gulp.task('sass',function(done){
  // var sassPath = ['preapp/css/scss/loader.scss']
  var sassPath = ['preapp/css/scss/loader.scss'];
  var saveTo = sassPath[0].replace('/scss/','/compiled/');
  // sass(sassPath, {sourcemap: false})
  //     .on('error', sass.logError)
  //     .pipe(plugins.concat('test.css'))
  //     .pipe(gulp.dest('preapp'));

      // .pipe(debug())
      // // for file sourcemaps
      // .pipe(sourcemaps.write('maps', {
      //     includeContent: false,
      //     sourceRoot: 'source'
      // }))
      // .pipe(gulp.dest('../min'));
});




gulp.task('compile-css', function(done) {

  var cssStream = gulp.src([
      'shared/css/ionic.app.min.css',
      'shared/css/compiled/style.css',
      'shared/css/compiled/utility.css',
      'shared/css/compiled/components.css',
      'shared/css/compiled/animation.css',
      'shared/css/compiled/profile.css',
      'preapp/css/compiled/preapp.css',
      'admin/css/compiled/admin.css',
      'shared/css/lib/prism.css',
      'jeselle/css/compiled/*.css',
      'gabrielle/css/compiled/*.css'
      // 'loader.css'
    ],{cwd: ''})
  .pipe(debug())
  .pipe(plugins.if(!build, plugins.changed('../min')));

  return streamqueue({ objectMode: true }, cssStream)
  // .pipe(autoprefixer('last 2 versions'))
  .pipe(plugins.if(build, plugins.stripCssComments()))
  .pipe(minifyCSS({keepSpecialComments : 0}))
  .pipe(plugins.if(build, plugins.rev()))
  .pipe(plugins.concat('app.css'))
  // .pipe(uncss({
  //     html: ['dest/templates/**/*html']
  // }))
  // .pipe(minifyCSS())
  .pipe(gulp.dest('../min'));

});

gulp.task('jsHint', function(done) {
  return gulp
    .src([
      '!gulpfile.js',
      '!shared/js/lib/**/*.js',
      '**/*.js',
      ], { cwd: '' })
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('jsHint:watch',function(){
     gulp.watch(['**/*js']).on('change', function(file) {
      // plugins.livereload.changed(file.path);
      // gutil.log(gutil.colors.yellow('JS changed' + ' (' + file.path + ')'));
         gulp.src(file.path)
         .pipe(plugins.jshint())
         .pipe(plugins.jshint.reporter(stylish));
     });
});
gulp.task('compile-base-js', function(done) {
  var scriptStream = gulp.src([
      // pretty much same as this 'shared/js/lib/*.js',

      // 'shared/js/lib/bowser.min.js',
      // 'shared/js/lib/snap.svg.min.js',
      // 'shared/js/lib/ionic.bundle.min.js',
      // 'shared/js/lib/restangular.min.js',
      // 'shared/js/lib/lodash.min.js',


      // //services
      // 'shared/js/services/LocalStorageService.js',
      // 'shared/js/services/*.js',

      // //admin/service
      // 'admin/js/AdminAnimToolService.js',
      // 'admin/js/AdminWorkflowService.js',
      // 'admin/js/SpecService.js',
      // 'admin/js/SpecContentService.js',
      // 'admin/js/AdminDirectives.js',
      // 'admin/js/AdminActionController.js',

      // //directive
      // 'shared/js/directives/AnimationDirectives.js',
      // 'shared/js/directives/*.js',

      // 'util/base.main.js',
      // 'templates.js',
      // // 'templates.js',
      // // 'util/base.main.js',
      // // 'templates.js',
      // // //prepapp ctrl
      // 'preapp/js/SplashController.js',
      // 'preapp/js/*.js'


      // //shared ctrl
      // // 'shared/js/controllers/RootController.js',
      // // 'shared/js/controllers/*.js',

      'shared/js/lib/bowser.min.js',
      'shared/js/lib/snap.svg.min.js',
      'shared/js/lib/ionic.bundle.min.js',
      'shared/js/lib/restangular.min.js',
      'shared/js/lib/lodash.min.js',
      //directive
      'shared/js/AnimationDirectives.js',
      'shared/js/directives/*.js',
      //services
      'shared/js/services/LocalStorageService.js',
      'shared/js/services/*.js',
      'util/base.main.js',
      'templates.js',
      //prepapp ctrl
      'preapp/js/SplashController.js',
      'preapp/js/*.js',
      'jeselle/js/*.js',
      'gabrielle/js/*.js',

      //admin/service
      'admin/js/services/AdminAnimToolService.js',
      'admin/js/*.js',
      'admin/js/**/*.js',
      //shared ctrl
      'shared/js/controllers/RootController.js',
      'shared/js/controllers/*.js'
    ]);

  return streamqueue({ objectMode: true }, scriptStream)
    .pipe(debug())
    .pipe(plugins.if(build, plugins.ngAnnotate()))
    .pipe(plugins.if(build, plugins.uglify()))
    .pipe(plugins.if(build, plugins.rev()))
    .pipe(plugins.if(build, plugins.concat('base.js')))
    .pipe(gulp.dest('../min/util/'));
});
gulp.task('compile-js', function(done) {
  var scriptStream = gulp.src([
      // pretty much same as this 'shared/js/lib/*.js',

      'shared/js/lib/bowser.min.js',
      'shared/js/lib/snap.svg.min.js',
      'shared/js/lib/ionic.bundle.min.js',
      'shared/js/lib/restangular.min.js',
      'shared/js/lib/lodash.min.js',
      //directive
      'shared/js/AnimationDirectives.js',
      'shared/js/directives/*.js',
      //services
      'shared/js/services/LocalStorageService.js',
      'shared/js/services/*.js',
      'main.js',
      'templates.js',
      //prepapp ctrl
      'preapp/js/SplashController.js',
      'preapp/js/*.js',
      'preapp/js/menu/*.js',
      'preapp/js/started/*.js',
      'jeselle/js/*.js',
      'gabrielle/js/*.js',

      //admin/service
      'admin/js/services/AdminAnimToolService.js',
      'admin/js/*.js',
      'admin/js/**/*.js',
      //shared ctrl
      'shared/js/controllers/RootController.js',
      'shared/js/controllers/*.js',
    ]);

  return streamqueue({ objectMode: true }, scriptStream)
    .pipe(debug())
    .pipe(plugins.if(build, plugins.ngAnnotate()))
    .pipe(plugins.if(build, plugins.uglify()))
    .pipe(plugins.if(build, plugins.rev()))
    .pipe(plugins.if(build, plugins.concat('app.js')))
    .pipe(gulp.dest('../min'));
});

gulp.task('compile-temp',function(done){

    var templateStream = gulp
        .src([
          // 'shared/templates/root.html',
          // 'admin/templates/**/*.html',
          // 'preapp/templates/**/*.html',
          '!*master.index.html',
          '!*index.html',
          '**/*html',
          // 'admin/templates/*html',
          // 'admin/templates/*bugs.*html',
          // 'admin/templates/components/*tpl',
          // 'admin/templates/docs/*html',
          // 'shared/templates/*html',
          // 'shared/templates/components/*tpl',
          // 'shared/templates/components/svg/*tpl',
          // 'preapp/templates/*html',
          // 'preapp/templates/components/*tpl',
          '**/*tpl',
          '**/*svg'], { cwd: '' }).pipe(plugins.angularTemplatecache('templates.js', {
        root: '',
        module: 'uguru',
        htmlmin: build && minifyConfig
      }));

    return streamqueue({ objectMode: true }, templateStream)
          .pipe(plugins.if(build, plugins.ngAnnotate()))
          .pipe(plugins.if(build, plugins.uglify()))
          .pipe(plugins.if(build, plugins.rev()))
          .pipe(plugins.if(build, plugins.concat('templates.js'))).pipe(gulp.dest('.'));
});

gulp.task('clean', function(done) {
    del(['templates.js', 'dest/scripts/*', 'app.js','app.css', 'dest/templates/**'], done);
});

gulp.task('templates', function() {
  //PART ONE, MOVE ALL TEMPLATES TO RIGHT FOLDER
  var templateLocations = ['admin/templates/**/**/**',
   'shared/templates/**/**/**', 
   'preapp/templates/**/**/**',
    'jeselle/templates/**/**/**', 
    'gabrielle/templates/**/**/**'];
  for (var i = 0; i < templateLocations.length; i++) {

    gulp.src([templateLocations[i]], { cwd: '' })
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.join(targetDir, 'templates/' + templateLocations[i].split('/**')[0])))
    .on('error', errorHandler);
  }


  // //part two create templatesjs
  // var dest = path.join(targetDir, 'scripts');

  // var minifyConfig = {
  //   collapseWhitespace: true,
  //   collapseBooleanAttributes: true,
  //   removeAttributeQuotes: true,
  //   removeComments: true
  // };

  // var templateStream = gulp.src([
  //       'templates/admin/templates/*html',
  //       'templates/admin/templates/components/*tpl',
  //       'templates/shared/templates/**/**/*',
  //       'templates/preapp/templates/**/**/*',
  //     ], { cwd: 'dest/' })
  //   .pipe(plugins.angularTemplatecache('templates.js', {
  //     root: '/',
  //     module: 'uguru',
  //     htmlmin: build && minifyConfig
  //   }));
  //   return streamqueue({ objectMode: true }, templateStream)
  //       .pipe(plugins.if(build, plugins.ngAnnotate()))
  //       .pipe(plugins.if(build, plugins.uglify()))
  //       .pipe(plugins.if(build, plugins.rev()))
  //       .pipe(plugins.if(build, plugins.concat('templates.js')))
  //       .pipe(gulp.dest('dest/scripts'))

  //       .on('error', errorHandler);
});



gulp.task('copy-prod', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['app.js', 'app.css'], { base: './' })
  .pipe(gulp.dest('../../../../app/static/remote/min/'));
});

gulp.task('default', function(done) {
  runSequence(
    'clean',
    'compile-css',
    'templates',
    'compile-temp',
    // // 'jsHint',
    'compile-js',
    'compile-base-js',
    'copy-prod',
    // 'clean',
    // 'index',
    // build ? 'noop' : 'watchers',
    // build ? 'noop' : 'serve',
    done);
});