'use strict';
var appName = '<%= ngModulName %>';
var gulp = require('gulp');
var filter = require('gulp-filter');
var shell = require('gulp-shell')
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
var tap = require('gulp-tap');
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
var targetPath = 'www/remote/min';

var minifyConfig = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeComments: true
};


gulp.task('style', function() {
  return gulp.src(['**/css/scss/*.scss'],{cwd: targetPath})
        .pipe(filter(noPartials))//avoid compiling SCSS partials
        .pipe(sass())
        .pipe(gulp.dest('preapp/css/compiled'));
})

gulp.task('start-sass', shell.task(['sass --watch www/remote/min/preapp/css/scss/:www/remote/min/preapp/css/compiled www/remote/min/shared/css/scss/:www/remote/min/shared/css/compiled www/remote/min/gabrielle/css/scss/:www/remote/min/gabrielle/css/compiled www/remote/min/jeselle/css/scss/:www/remote/min/jeselle/css/compiled www/remote/min/admin/css/scss/:www/remote/min/admin/css/compiled']));
// our main sequence, with some conditional jobs depending on params

gulp.task('sass',function(done){

  var sassPath = ['www/remote/min/preapp/css/scss/loader.scss'];
  return gulp.src(
    ['shared/**/*.scss', 'preapp/**/.css'],{cwd:targetPath})
    .pipe(tap(function(file,t){
      var folder = path.dirname(file.path).replace('/scss','/compiled');
      // gutil.log(folder);
      sass(file.path, {
        sourcemap: true
      })
      .on('error', sass.logError)
      .pipe(sourcemaps.write('../compiled'))
      .pipe(gulp.dest(folder));
    }));
  // sass(sassPath, {sourcemap: false})
  //     .on('error', sass.logError)
  //     .pipe(plugins.concat('test.css'))
  //     // .pipe(gulp.dest('compiled',{cwd:targetPath}))
  //     .pipe(debug());
      // for file sourcemaps
      // .pipe(sourcemaps.write('maps', {
      //     includeContent: false,
      //     sourceRoot: 'source'
      // }))
      // .pipe(gulp.dest('../min'));
});




gulp.task('compile-css', function(done) {

  var cssStream = gulp.src([
      '!preapp/css/compiled/loader.css',
      '!shared/css/ionic.app.min.backup.css',
      '!preapp/css/loader.css',
      'shared/**/*.css',
      'preapp/**/*.css',
      'admin/**/*.css'
    ],{cwd: targetPath})
  .pipe(debug())
  .pipe(plugins.changed('../min'));
  // .pipe(debug());

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
  .pipe(gulp.dest(targetPath));

});

gulp.task('jsHint', function(done) {
  return gulp
    .src([
      '!gulpfile.js',
      '!shared/js/lib/**/*.js',
      '**/*.js',
      ], { cwd: 'www/remote' })
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('jsHint:watch',function(done){
     gulp.watch([
      '!gulpfile.js',
      '!shared/js/lib/**/*.js',
      '**/*.js',
      ],{cwd: targetPath}).on('change', function(file) {

      // plugins.livereload.changed(file.path);
      // gutil.log(gutil.colors.yellow('JS changed' + ' (' + file.path + ')'));
         gulp.src(file.path)
         .pipe(plugins.jshint())
         .pipe(plugins.jshint.reporter(stylish));
     });
});
gulp.task('compile-js', function(done) {
  var scriptStream = gulp.src([

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

      //admin/service
      'admin/js/AdminAnimToolService.js',
      'admin/js/**/*.js',
      //shared ctrl
      'shared/js/controllers/RootController.js',
      'shared/js/controllers/*.js',
    ], { cwd: targetPath });

  return streamqueue({ objectMode: true }, scriptStream)
    .pipe(debug())
    // .pipe(plugins.if(build, plugins.ngAnnotate()))
    // .pipe(plugins.if(build, plugins.uglify()))
    // .pipe(plugins.if(build, plugins.rev()))
    // .pipe(plugins.if(build, plugins.concat('app.js')))

    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.rev())
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(targetPath));
});

gulp.task('compile-temp',function(done){

    var templateStream = gulp
        .src([
          // 'shared/templates/root.html',
          // 'admin/templates/**/*.html',
          // 'preapp/templates/**/*.html',
          '!*master.index.html',
          '!*index.html',
          '!dest/**/*',
          '**/*html',
          '**/*tpl',
          '**/*svg'], { cwd: targetPath })
      .pipe(debug())
      .pipe(plugins.angularTemplatecache('templates.js', {
        root: '/static/remote/templates/',
        module: 'uguru',
        htmlmin: build && minifyConfig
      }));

    return streamqueue({ objectMode: true }, templateStream)
          // .pipe(plugins.if(build, plugins.ngAnnotate()))
          // .pipe(plugins.if(build, plugins.uglify()))
          // .pipe(plugins.if(build, plugins.rev()))
          // .pipe(plugins.if(build, plugins.concat('templates.js')))
          .pipe(plugins.ngAnnotate())
          .pipe(plugins.uglify())
          .pipe(plugins.rev())
          .pipe(plugins.concat('templates.js'))
          .pipe(gulp.dest(targetPath));
});


gulp.task('clean', function(done) {
  // gutil.log(done);
  del(
    ['templates.js',
    'app.js',
    'app_version.css'
    ],{ cwd: targetPath},done);

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
  // gulp.watch(targetDir + '/**/**')
  //   .on('change', plugins.livereload.changed)
  //   .on('error', errorHandler);
});
gulp.task('copyTo', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['www/remote/min/preapp/css/compiled/loader.css',
            'www/remote/min/preapp/css/compiled/loader.css.map'
            ])
  .pipe(gulp.dest('../app/static/remote/min/preapp/css/compiled/'));

  gulp.src(['app.js', 'app_version.css'], {  cwd: targetPath })
  .pipe(gulp.dest('../app/static/remote/min/'));
});


gulp.task('default', function(done) {
  runSequence(
    'clean',
    'sass',
    'compile-css',
    'compile-temp',
    // 'jsHint',
    'compile-js',
    'copyTo',
    // 'index',
    // build ? 'noop' : 'watchers',
    // build ? 'noop' : 'serve',
    done);
});

gulp.task('min', function(done) {
  runSequence(
    'min-scripts'
    )
})


gulp.task('preprocess-regular', function() {
    return gulp.src(['js/main.js'], { cwd: 'www/remote' })
    .pipe(preprocess({context: {ADMIN:false}}))
    .pipe(gulp.dest('www/remote/js/'))
})

gulp.task('preprocess-admin', function() {
    return gulp.src(['js/main.js'], { cwd: 'www/remote' })
    .pipe(preprocess({context: {ADMIN:true}}))
    .pipe(gulp.dest('www/remote/js/admin/'))
})

gulp.task('uld', function(done) {
  var runSequence = require('run-sequence').use(gulp);
  runSequence(['preprocess-admin']);
});
