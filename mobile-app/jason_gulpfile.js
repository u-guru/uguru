'use strict';


var gulp 		= require('gulp');
var plugins 	= require('gulp-load-plugins')();
var svgmin      = require('gulp-svgmin');
var svgstore    = require('gulp-svgstore');
var cheerio     = require('gulp-cheerio');

var del 		= require('del');
var beep 		= require('beepbeep');
var express 	= require('express');
var path 		= require('path');
var open 		= require('open');
var stylish 	= require('jshint-stylish');
var connectLr 	= require('connect-livereload');
var streamqueue = require('streamqueue');
var runSequence = require('run-sequence');
var merge 		= require('merge-stream');
var minifyCSS 	= require('gulp-minify-css');
var debug 		= require('gulp-debug');
var autoprefixer= require('gulp-autoprefixer');
var sass 		= require('gulp-sass');
var rename 		= require('gulp-rename');
var gutil 		= require('gulp-util');
var karma 		= require('karma').server;
var preprocess 	= require('gulp-preprocess');
var replace 	= require('gulp-replace-task');
var fs 			= require('fs');
var browserSync = require('browser-sync').create();





// var args = require('yargs').argv;
var args = require('yargs')
    .alias('uld', 'update-local-device')
    .alias('b', 'build')
    .default('build', false)
    .argv;

var build = args.build;
var uld = args.uld;
var targetDir = path.resolve('dest');

var errorHandler = function(error) {
  if (build) {
    throw error;
  } else {
    beep(2, 170);
    plugins.util.log(error);
  }
};

var done = function()
{
	console.log("DONE")
}

var paths = {
  svg: 'templates/svg/*',
  html:'templates/**/*.html'
};


//All the gulp task
gulp.task('clean',function() {
	console.log(targetDir)
	del([targetDir]);
});

gulp.task('Copy Templates',function() {
	return gulp.src([
	      'templates/**/*.html',
	      'templates/**/**/*.html',
	      'templates/**/**/**/*.html',
	      'templates/svg/**/*.html',
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
	      'templates/dev/*html',
	      'templates/elements/*',
	      'templates/elements/**/**',
	      'templates/elements/**/**/**',
	      'templates/elements/**/**/**/**',
	      'templates/elements/**/**/**/**/**',
	      'templates/guru/*html',
	      'templates/components/modals/*html',
	      'templates/components/details/*html',
	      'templates/components/inputs/*html',
	      'templates/components/**/**/**.html',
	      'templates/splash/*.html',
	      'templates/splash/**/*.html',
	      'templates/splash/**/**/**.html',

	    ], { cwd: 'www/remote' })
	  .pipe(gulp.dest(path.join(targetDir, 'templates')))
	  .on('error', errorHandler);
});
gulp.task('Copy SVG Icon',function()
{
	console.log( targetDir)
	return gulp.src(['templates/svg/main/**/*'],{ cwd: 'www/remote' })
	   .pipe(svgmin())
	   .pipe(svgstore({ fileName: 'all.svg', inlineSvg: true}))
	   .pipe(rename({basename: 'allIcons'}))
	   .pipe(gulp.dest(path.join(targetDir, 'svg')))
	   .pipe(gulp.dest(path.join(path.resolve('www/remote/templates'), 'svg')))

});

var includes = require('gulp-file-include');

gulp.task('html', function() {
  return gulp.src('templates/splash.html',{ cwd: 'www/remote' })
    .pipe(includes({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.join(targetDir, 'templates')))
});

gulp.task('styles',function() {
	console.log("styles")
});

gulp.task('jsHint',function() {
	console.log("jsHint")
});

gulp.task('scripts',function() {
	console.log("scripts")
});
gulp.task('noop', function() {
	console.log("SKIP")
});

gulp.task('watchers', function() {
	console.log("watchers")
});
gulp.task('serve', function() {
	console.log("serve")
});

gulp.task('default',function() {
	runSequence(
	  'clean',
	  [
	    'Copy SVG Icon',
	    'jsHint',
	    'scripts'
	  ],
	  'html',
	  // // 'index',
	  build ? 'noop' : ['watchers','serve'],
	  done);
});


