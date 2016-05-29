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
      // .pipe(plugins.livereload.changed(file));
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
      'shared/**/*.css',
      'preapp/**/*.css'//,
      // 'loader.css'
    ],{cwd: ''})
  .pipe(debug())
  .pipe(plugins.if(!build, plugins.changed('../min')));

  return streamqueue({ objectMode: true }, cssStream)
  .pipe(autoprefixer('last 2 versions'))
  .pipe(plugins.if(build, plugins.stripCssComments()))
  .pipe(minifyCSS({keepSpecialComments : 0}))
  .pipe(plugins.if(build, plugins.rev()))
  .pipe(plugins.concat('app_version.css'))
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
gulp.task('compile-js', function(done) {
  var scriptStream = gulp.src([
      'shared/js/lib/*.js',
      //directive
      'shared/js/AnimationDirectives.js',
      'shared/js/directives/*.js',
      //services
      'shared/js/services/LocalStorageService.js',
      'shared/js/services/*.js',
      //admin/service
      'admin/js/AdminAnimToolService.js',
      'admin/js/*.js',
      'js/main.js',
      //shared ctrl
      'shared/controllers/RootController.js',
      'shared/controllers/*.js',
      //prepapp ctrl
      'preapp/js/SplashController.js',
      'preapp/js/*.js',
      'templates.js'
    ]);

  return streamqueue({ objectMode: true }, scriptStream)
    // .pipe(debug())
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
          '!index.html',
          '**/*html',
          '**/*tpl',
          '**/*svg'], { cwd: '' })
      // .pipe(debug())
      .pipe(plugins.angularTemplatecache('templates.js', {
        root: '/static/remote/templates/',
        module: 'uguru',
        htmlmin: build && minifyConfig
      }));

    return streamqueue({ objectMode: true }, templateStream)
          .pipe(plugins.if(build, plugins.ngAnnotate()))
          .pipe(plugins.if(build, plugins.uglify()))
          .pipe(plugins.if(build, plugins.rev()))
          .pipe(plugins.if(build, plugins.concat('templates.js')))
          .pipe(gulp.dest('../min'));
});

gulp.task('clean', function(done) {
  del(['templates.js','app.js','app_version.css'], done);
});

gulp.task('default', function(done) {
  runSequence(
    'clean',
    'compile-css',
    'compile-temp',
    // 'jsHint',
    'compile-js',
    // 'index',
    // build ? 'noop' : 'watchers',
    // build ? 'noop' : 'serve',
    done);
});