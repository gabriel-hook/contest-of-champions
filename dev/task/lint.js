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
    .pipe(esLint.failAfterError()));

gulp.task('lint:test', () => gulp.src([
    './test/**/*.js',
    './test/**/*.jsx',
])
    .pipe(plumber())
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError()));

gulp.task('lint:src', () => gulp.src([
    './src/**/*.js',
    './src/**/*.jsx',
])
    .pipe(plumber())
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError()));

gulp.task('lint:style', () => gulp.src([
    './src/**/*.scss',
])
    .pipe(sassLint({
        'maxBuffer': 1228800,
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError()));

gulp.task('lint', sequence('lint:dev', 'lint:test', 'lint:src', 'lint:style'));
