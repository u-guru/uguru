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

gulp.task('compile-css', function(done) {

  var cssStream = gulp.src([
      'loader.css'
    ],{cwd: 'css'}).pipe(plugins.if(!build, plugins.changed('../min')));

  return streamqueue({ objectMode: true }, cssStream)
  .pipe(autoprefixer('last 2 versions'))
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
      '**/*.js',
      ], { cwd: 'js' })
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('jshint:watch',function(){
     gulp.watch('**/*js').on('change', function(file) {
      // plugins.livereload.changed(file.path);
      // gutil.log(gutil.colors.yellow('JS changed' + ' (' + file.path + ')'));
         gulp.src(file.path)
         .pipe(plugins.jshint())
         .pipe(plugins.jshint.reporter(stylish));
     });
});
gulp.task('compile-js', function(done) {
  var scriptStream = gulp.src([
      'js/lib/*.js',
      'js/main.js',
      'js/**/*.js'
    ]);

  return streamqueue({ objectMode: true }, scriptStream)
    .pipe(plugins.if(build, plugins.ngAnnotate()))
    .pipe(plugins.if(build, plugins.uglify()))
    .pipe(plugins.if(build, plugins.rev()))
    .pipe(plugins.if(build, plugins.concat('app.js')))
    .pipe(gulp.dest('../min'));
});

gulp.task('compile-temp',function(done){

    var templateStream = gulp
        .src([
          '**/*.html',
          '**/*.tpl'
        ], { cwd: 'templates' })
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
  del(['templates.js','app.js','app.css'], done);
});

gulp.task('default', function(done) {
  runSequence(
    'clean',
    'compile-css',
    'compile-temp',
    'jsHint',
    'compile-js',
    // 'index',
    // build ? 'noop' : 'watchers',
    // build ? 'noop' : 'serve',
    done);
});