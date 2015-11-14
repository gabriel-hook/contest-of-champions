import gulp from 'gulp';
import './dev/tasks/build.js';
import './dev/tasks/clean.js';
import './dev/tasks/lint.js';
import './dev/tasks/publish.js';
import './dev/tasks/webpack.js';

gulp.task('default', ['build']);
