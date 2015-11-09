import gulp from 'gulp';
import del from 'del';

gulp.task('clean:js', () => del([
  './build/*.js',
  './build/*.js.map'
],{
  force: true
}));

gulp.task('clean:css', () => del([
  './build/*.css',
  './build/*.css.map',
  './build/fonts/'
],{
  force: true
}));

gulp.task('clean', ['clean:js','clean:css']);
