'use strict';

var fs = require('fs');
var gulp = require('gulp');
var rename = require("gulp-rename");
var rimraf = require('gulp-rimraf');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var jst = require('gulp-jst');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var scripts = require('./scripts.json');
var styles = require('./styles.json');

gulp.task('default', ['build', 'watch']);

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
gulp.task('build:js', function(complete){
  processScripts(function processScript(name, files, done){
    //regular muliple javascript minification
    gulp.src(files, { base: './' })
        .pipe(rename(excludeNpmPaths))    
        .pipe(sourcemaps.init())
          .pipe(concat(name + '.min.js'))
          .pipe(uglify())
        .pipe(sourcemaps.write('.', { includeContent:true }))
        .pipe(gulp.dest('./js'))
        .on('end', done);
  }, function processJSON(name, json, files, done){
    //combine multiple json files into namespaced definitions
    gulp.src(files, { base: './' })
        .pipe(sourcemaps.init())
        .pipe(declare({
          root: 'window',
          namespace: json,
          noRedeclare: true
        }))
        .pipe(concat(name + '.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.', { includeContent:true }))
        .pipe(gulp.dest('./js'))
        .on('end', done);
  }, function processTemplate(name, template, files, done){
    //combine multiple html files into namespaced compiled templates
    gulp.src(files, { base: './' })
        .pipe(sourcemaps.init())
        .pipe(jst())
        .pipe(declare({
          root: 'window',
          namespace: template,
          noRedeclare: true
        }))
        .pipe(concat(name + '.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.', { includeContent:true }))
        .pipe(gulp.dest('./js'))
        .on('end', done);

  }, complete);
});
gulp.task('build:css', function(complete){
  processStyles(function(name, files, done){
    //regular multiple css minification
    gulp.src(files, { base: './' })
        .pipe(sourcemaps.init())
          .pipe(concat(name + '.min.css'))
          .pipe(minifyCss())
        .pipe(sourcemaps.write('.', { includeContent:true }))
        .pipe(gulp.dest('./css'))
        .on('end', done);
  },
  function(done){
    //copy all fonts over
    gulp
      .src('./styles/fonts/*')
      .pipe(gulp.dest('./css/fonts'))
      .on('end', done);
  },
  complete);
});

gulp.task('watch', function(){
    gulp.watch('./scripts/*', ['build:js']);
    gulp.watch('./styles/*', ['build:css']);
});

function processScripts(scriptCallback, jsonCallback, templateCallback, complete){
  var done = doneCallback(complete);
  for(var i=0; i<scripts.length; i++){
    if(scripts[i].json)
      jsonCallback.call(null, scripts[i].name, scripts[i].json, scripts[i].files, done);
    else if(scripts[i].template)
      templateCallback.call(null, scripts[i].name, scripts[i].template, scripts[i].files, done);
    else
      scriptCallback.call(null, scripts[i].name, scripts[i].files, done);
  }
}

function processStyles(styleCallback, copyCallback, complete){
  var done = doneCallback(complete);
  for(var i=0; i<styles.length; i++){
    styleCallback.call(null, styles[i].name, styles[i].files, done);
  }
  copyCallback.call(null, done);
}

function doneCallback(complete){
  var count = scripts.length;
  return function done(){
    count --;
    if(count === 0)
      complete();
  }
}

function excludeNpmPaths(path){
  if(path.dirname.indexOf('node_modules') === 0){
    path.dirname = 'scripts/lib/';
  }
}