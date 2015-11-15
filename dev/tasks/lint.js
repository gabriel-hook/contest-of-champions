import gulp from 'gulp';
import sequence from 'gulp-sequence';
import plumber from 'gulp-plumber';
import jshint from 'gulp-jshint';
import eslint from 'gulp-eslint';

gulp.task('lint:v1:js', () => gulp.src([
    './v1/scripts/**/*.js',
    '!./v1/scripts/**/lib/**/*.js',
])
    .pipe(plumber())
    .pipe(jshint({
        'indent': 2,
        'white': true,
        'node': true,
        'undef': true,
        'unused': true,
        '-W014': true,
        '-W057': false,
        '-W058': false,
        '-W069': false,
        '-W083': false,
        '-W098': false,
        '-W117': false,
        'expr': true,
    }))
    .pipe(jshint.reporter('default', { verbose: true }))
);
gulp.task('lint:v1', [ 'lint:v1:js' ]);

gulp.task('lint:v2:js', () => gulp.src([
    './dev/**/*.js',
    './v2/**/*.js',
    './v2/**/*.jsx',
])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
);
gulp.task('lint:v2', [ 'lint:v2:js' ]);

gulp.task('lint', sequence('lint:v1', 'lint:v2'));
