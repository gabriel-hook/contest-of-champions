import fs from 'fs';
import glob from 'glob';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sequence from 'gulp-sequence';

gulp.task('css-fix', (complete) => {
    const cssFilename = glob.sync('./.build/styles/app-*.css')[ 0 ];
    const file = fs.createReadStream(cssFilename, 'utf8');
    let css = '';

    file.on('data', (chunk) => {
        css += chunk.toString()
            .replace(/url\(fonts\//g, 'url(../fonts/')
            .replace(/url\(\"\/fonts\//g, 'url("../fonts/');
    });
    file.on('end', () => fs.writeFile(cssFilename, css, (error) => {
        complete();
        if (error) {
            throw error;
        }
    }));
});

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

gulp.task('build', sequence('clean', 'webpack', 'css-fix', 'images', 'public'));
