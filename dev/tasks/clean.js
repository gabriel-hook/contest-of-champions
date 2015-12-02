import gulp from 'gulp';
import del from 'del';

gulp.task('clean:all', () => del([
    './.build',
    './.publish',
], {
    force: true,
}));

gulp.task('clean', [ 'clean:all' ]);
