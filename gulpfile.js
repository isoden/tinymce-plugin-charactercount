'use strict';

const gulp = require('gulp');

gulp.task('test'      , require('./tasks/test')      );
gulp.task('test:watch', require('./tasks/test').watch);
