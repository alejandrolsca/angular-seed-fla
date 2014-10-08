var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var streamify  = require('gulp-streamify');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var browserify = require('browserify');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/modules/**/*.js'],
  html: ['./www/modules/**/*.html']
};

gulp.task('default', ['sass','watchify']);

gulp.task('sass', function(done) {
  gulp.src('./scss/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify('./www/modules/index.js', watchify.args));

  // Optionally, you can apply transforms
  // and other configuration options on the
  // bundler just as you would with browserify
  // bundler.transform('brfs');

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(streamify(ngAnnotate()))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest('./www/js'));
  }
  return rebundle();
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['watchify']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
