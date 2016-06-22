'use strict';

const path    = require('path'); 
const gulp    = require('gulp');
const qunit   = require('gulp-qunit');
const plumber = require('gulp-plumber');

module.exports = function () {
  return gulp.src(path.join(__dirname, '..', 'test/index.html'))
    .pipe(plumber())
    .pipe(qunit());
};

module.exports.watch = function () {
  return gulp.watch(path.join(__dirname, '..', 'test/*'), ['test']);
};
