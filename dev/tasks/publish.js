import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import sequence from 'gulp-sequence';
import publish from 'gulp-gh-pages';

gulp.task('build:all', sequence('clean:all', 'build', 'webpack'));

gulp.task('publish', ['build:all'], () => {
    return gulp.src('./build/**/*')
        .pipe(plumber())
        .pipe(publish({
            branch: 'es6',
        }));
});
