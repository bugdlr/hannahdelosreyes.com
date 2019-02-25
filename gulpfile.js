'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const connect = require('gulp-connect');
const open = require('gulp-open');

function css(done) {
  return gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
    done();
};

function html(done) {
  return gulp.src('index.html')
    .pipe(connect.reload());
    done();
};

function server(done) {
  connect.server({
    livereload: true
  });
  done();
};

function watching(done) {
  gulp.watch('less/*.less', css);
  gulp.watch('index.html', html);
  gulp.watch('script.js', html);
  done();
};

function opening(done) {
  gulp.src('index.html')
  .pipe(open({uri: 'http://localhost:8080/'}));
  done();
};


gulp.task("css", css);
gulp.task("html", html);
gulp.task("watching", watching);
gulp.task("server", server);
gulp.task("opening", opening);

gulp.task('default', gulp.parallel(css, html, watching, server, opening));
