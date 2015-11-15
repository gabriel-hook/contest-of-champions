import gulp from 'gulp';
import './dev/tasks/build.js';
import './dev/tasks/clean.js';
import './dev/tasks/publish.js';
import './dev/tasks/webpack.js';

gulp.task('default', (callback) => {
    callback();
    console.log('See README.md for task details.')
});
