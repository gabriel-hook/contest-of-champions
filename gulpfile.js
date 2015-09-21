'use strict';

var fs = require('fs');
var gulp = require('gulp');
var rename = require("gulp-rename");
var rimraf = require('gulp-rimraf');
var jsoncombine = require('gulp-jsoncombine');
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
gulp.task('build:js', function(){
  eachScript(function(name, files){
    //regular muliple javascript minification
    gulp.src(files, { base: './' })
        .pipe(rename(excludeNpmPaths))    
        .pipe(sourcemaps.init())
          .pipe(concat(name + '.min.js'))
          .pipe(uglify())
        .pipe(sourcemaps.write('.', { includeContent:false }))
        .pipe(gulp.dest('./js'));
  },function(name, json, files){
    //combine multiple json files into a namespaced 
    gulp.src(files)
        .pipe(jsoncombine(name+'.min.js', function(data){
          var string = namespaceJSON(json, data)
          return new Buffer(string, 'utf-8');
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
  });
});
gulp.task('build:css', function(){
  eachStyle(function(name, files){
    //regular multiple css minification
    gulp.src(files, { base: './' })
        .pipe(sourcemaps.init())
          .pipe(concat(name + '.min.css'))
          .pipe(minifyCss())
        .pipe(sourcemaps.write('.', { includeContent:false }))
        .pipe(gulp.dest('./css'));
  });
  //copy all fonts over
  gulp
    .src('./styles/fonts/*')
    .pipe(gulp.dest('./css/fonts'));
});

gulp.task('watch', function(){
    gulp.watch('./scripts/*', ['build:js']);
    gulp.watch('./styles/*', ['build:css']);
});

function eachScript(callback, jsonCallback){
  for(var i=0; i<scripts.length; i++){
    if(scripts[i].json)
      jsonCallback.call(null, scripts[i].name, scripts[i].json, scripts[i].files);
    else
      callback.call(null, scripts[i].name, scripts[i].files);
  }
}

function eachStyle(callback){
  for(var i=0; i<styles.length; i++){
    callback.call(null, styles[i].name, styles[i].files);
  }
}

function excludeNpmPaths(path){
  if(path.dirname.indexOf('node_modules') === 0){
    path.dirname = '/';
  }
}

function namespaceJSON(json, data){
  var i = 0;
  var string = '';
  var namespace = json.split('.');
  var currentNamespace = namespace[0];
  if(namespace.length === 1){
    string = 'var '+currentNamespace+' = '+ JSON.stringify(data) + ";\n";
  }
  else{
    string = 'var '+currentNamespace+' = '+currentNamespace+" || {};\n";
    for(i = 1; i < namespace.length - 1; i++){
      currentNamespace += '.' + namespace[i];
      string += currentNamespace+' = '+currentNamespace+" || {};\n";
    }
    currentNamespace += '.' + namespace[i];
    string += currentNamespace+' = '+JSON.stringify(data) + ";\n";
  }
  return string;
}