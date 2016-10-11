import fs from 'fs';
import glob from 'glob';
import string from 'string-to-stream';
import source from 'vinyl-source-stream';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sequence from 'gulp-sequence';

gulp.task('css-fix', (complete) => {
    const cssFilename = glob.sync('./build/styles/app-*.css')[ 0 ];
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
    .pipe(gulp.dest('./build/images/')));

gulp.task('public', () => gulp.src([
    './src/manifest.json',
    './src/.nojekyll',
])
    .pipe(plumber())
    .pipe(gulp.dest('./build/')));

gulp.task('prestigecalc', () => {
    const idMap = require('../../src/data/champions/prestige.js');
    const { CHAMPION } = require('../../src/data/model/Champion.js');
    const { default: champions } = require('../../src/data/champions.js');
    const csv = [
        'PID,CID,TYPE,1,2,3,4,5',
        ...Object.keys(CHAMPION)
            .map((key) => {
                const uid = CHAMPION[ key ];
                let typeId = 'none';
                const stars = [ false, false, false, false, false ];
                champions
                    .filter(({ attr }) => uid === attr.uid)
                    .forEach(({ attr }) => {
                        typeId = attr.typeId;
                        stars[ attr.stars - 1 ] = true;
                    });
                return [
                    idMap[ key ] || key,
                    key,
                    typeId,
                    ...stars,
                ].join(',');
            })
            .filter((row) => row)
            .sort(),
    ].join('\r\n');
    return string(csv)
        .pipe(source('coef-ids.csv'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('build', sequence('clean', 'webpack', 'css-fix', 'images', 'public', 'prestigecalc'));
