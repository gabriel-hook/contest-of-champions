import gulp from 'gulp';
import sequence from 'gulp-sequence';
import plumber from 'gulp-plumber';
import esLint from 'gulp-eslint';
import sassLint from 'gulp-sass-lint';

gulp.task('lint:dev', () => gulp.src([
    './dev/**/*.js',
])
    .pipe(plumber())
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
);

gulp.task('lint:test', () => gulp.src([
    './test/**/*.js',
    './test/**/*.jsx',
])
    .pipe(plumber())
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
);

gulp.task('lint:scripts', () => gulp.src([
    './src/**/*.js',
    './src/**/*.jsx',
])
    .pipe(plumber())
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
);
gulp.task('lint:styles', () => gulp.src([
    './src/**/*.scss',
    '!./src/index.scss',
])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
);

gulp.task('lint', sequence('lint:dev', 'lint:test', 'lint:scripts', 'lint:styles'));
