import gulp from 'gulp';
import plumber from 'gulp-plumber';
import jshint from 'gulp-jshint';
import eslint from 'gulp-eslint';

gulp.task('lint:js', () => gulp.src([
    './src/scripts/**/*.js',
    '!./src/scripts/**/lib/**/*.js',
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
    .pipe(jshint.reporter('fail'))
);

gulp.task('lint:dev', () => gulp.src([
    './dev/**/*.js',
])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('lint', [ 'lint:js', 'lint:dev' ]);
