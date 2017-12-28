/**
 * Created by surakarnawi on 01/12/2017.
 * Needs compressing images and minifying css
 */
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const sassLint = require('gulp-sass-lint');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], {read:false})
        .pipe(mocha({reporter:'list'}))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function () {
    gulp.run('mocha');
    gulp.watch(['./**/*.js', 'test/**/*.js'], ['mocha']);
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
      .pipe(sass({}).on('error', function(err) {
        return notify().write(err);
      }))
      .pipe(gulp.dest('./public/'));
});

gulp.task('sasslint', function () {
  return gulp.src('src/stylesheets/*.s+(a|c)ss')
      .pipe(sassLint({
        configFile: '/config/.sass-lint.yml'
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
});

gulp.task('sass-watch', function () {
  gulp.watch('./src/stylesheets/*.scss', function (event) {
    console.log('watched event ' + event.type + ' for ' + event.path);
  });
});

gulp.task('copying-images', function() {
  return gulp.src(['./src/images/**/*'])
        // compressing images
        // .pipe(imagemin({ optimizationLevel: 4}))
        .pipe(gulp.dest('./public/images'));
});

gulp.task('copying-js', function() {
  return gulp.src(['./src/javascripts/**/*'])
      .pipe(gulp.dest('./public/javascripts'));
});


gulp.task('default', ['watch-mocha']);

gulp.task('watch', ['sass', 'sasslint', 'sass-watch', 'copying-images', 'copying-js']);

