import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import sequence from 'gulp-sequence';
import commit from 'gulp-gh-pages';

const DEVELOPMENT = gutil.env.dev;

gulp.task('assets', () => gulp.src([
    './images/**/*',
])
    .pipe(plumber())
    .pipe(gulp.dest('./.build/images/')));

gulp.task('gh-pages', () => gulp.src([
    './.build/**/*',
    './dev/docs/**/*',
])
    .pipe(plumber())
    .pipe(commit({
        push: DEVELOPMENT,
    })));

gulp.task('publish', [ 'lint:scripts', 'lint:styles' ], sequence('clean', 'assets', 'webpack', 'gh-pages'));
