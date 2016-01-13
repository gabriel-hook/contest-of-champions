import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sequence from 'gulp-sequence';

gulp.task('images', () => gulp.src([
    './src/images/**/*',
])
    .pipe(plumber())
    .pipe(gulp.dest('./.build/images/')));

gulp.task('public', () => gulp.src([
    './src/manifest.json',
    './src/.nojekyll',
])
    .pipe(plumber())
    .pipe(gulp.dest('./.build/')));

gulp.task('build', sequence('clean', 'webpack', 'images', 'public'));
