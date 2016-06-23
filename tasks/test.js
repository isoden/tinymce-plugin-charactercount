'use strict';

const path        = require('path'); 
const gulp        = require('gulp');
const qunit       = require('gulp-qunit');
const plumber     = require('gulp-plumber');
const browserSync = require('browser-sync');

// HTML確認用にローカルサーバーを起動する
browserSync({
  ui       : false,
  server   : path.join(__dirname, '..'),
  startPath: '../test/index.html'
});

module.exports = function () {
  return gulp.src(path.join(__dirname, '..', 'test/index.html'))
    .pipe(plumber())
    .pipe(qunit())
    .pipe(browserSync.reload({stream: true}));
};

module.exports.watch = function () {
  return gulp.watch(path.join(__dirname, '..', 'test/*'), ['test']);
};
