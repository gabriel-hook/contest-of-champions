import './dev/gulp/build.js';
import './dev/gulp/clean.js';
import './dev/gulp/lint.js';
import './dev/gulp/webpack.js';
import gulp from 'gulp';

gulp.task('default', ['build']);
