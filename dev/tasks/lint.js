import gulp from 'gulp';
import sequence from 'gulp-sequence';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import sasslint from 'gulp-sass-lint';

gulp.task('lint:scripts', () => gulp.src([
    './dev/**/*.js',
    './src/**/*.js',
    './src/**/*.jsx',
])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
gulp.task('lint:styles', () => gulp.src([
    './src/**/*.scss',
    '!./src/index.scss',
])
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
);

gulp.task('lint:dev', () => gulp.src([
    './dev/**/*.js',
])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('lint', sequence('lint:dev', 'lint:scripts', 'lint:styles'));
