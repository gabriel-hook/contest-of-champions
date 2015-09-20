'use strict';

var fs = require('fs');
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var scripts = require('./scripts.json');
var styles = require('./styles.json');

gulp.task('default', ['build']);

gulp.task('clean', ['clean:js','clean:css']);
gulp.task('clean:js', function(){
  return gulp.src('./js/*', { read: false })
    .pipe(rimraf({ force: true }));
});
gulp.task('clean:css', function(){
  return gulp.src('./css/*', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('build', ['build:js', 'build:css']);
gulp.task('build:js', function(){
  eachScript(function(name, files){
    gulp.src(files)
        .pipe(sourcemaps.init())
          .pipe(concat(name+'.min.js'))
          .pipe(uglify())
        .pipe(sourcemaps.write('.', {addComment: false}))
        .pipe(gulp.dest('./js'));
  });
});
gulp.task('build:css', function(){
  eachStyle(function(name, files){
    gulp.src(files)
        .pipe(sourcemaps.init())
          .pipe(concat(name+'.min.css'))
          .pipe(minifyCss())
        .pipe(sourcemaps.write('.', {addComment: false}))
        .pipe(gulp.dest('./css'));
  });
  gulp
    .src('./styles/fonts/*')
    .pipe(gulp.dest('./css/fonts'))
});


function eachScript(callback){
  for(var i=0; i<scripts.length; i++){
    callback.call(null, scripts[i].name, scripts[i].files);
  }
}
function eachStyle(callback){
  for(var i=0; i<styles.length; i++){
    callback.call(null, styles[i].name, styles[i].files);
  }
}