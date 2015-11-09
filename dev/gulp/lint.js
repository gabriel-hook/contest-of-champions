import gulp from 'gulp';
import plumber from 'gulp-plumber';
import lint from 'gulp-jshint';

gulp.task('lint', () => gulp.src([
    './gulpfile.js',
    './scripts/**/*.js',
    '!./scripts/**/lib/**/*.js'
  ])
  .pipe(plumber())
  .pipe(lint({
    "indent": 2,
    "white": true,
    "node": true,
    "undef": true,
    "unused": true,
    "-W014": true,
    "-W057": false,
    "-W058": false,
    "-W069": false,
    "-W083": false,
    "-W098": false,
    "-W117": false,
    "expr": true
  }))
  .pipe(lint.reporter('default', { verbose: true }))
);
