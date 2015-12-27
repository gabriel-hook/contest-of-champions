import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sequence from 'gulp-sequence';

gulp.task('assets', () => gulp.src([
    './src/images/**/*',
])
    .pipe(plumber())
    .pipe(gulp.dest('./.build/images/')));

gulp.task('build', sequence('clean', 'assets', 'webpack'));
