'use strict';

var fs = require('fs');
var eventstream = require('event-stream');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sequence = require('gulp-sequence');
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

gulp.task('default', sequence('clean', 'build'));

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
  var streams = {};
  for(var i=0; i<scripts.length; i++)
    if(!streams[scripts[i].name])
      streams[scripts[i].name] = [];
  //get the streams
  processScripts(function processScript(name, files){
    streams[name].push(gulp.src(files, { base: './' })
        .pipe(rename(excludeNpmPaths))  
        .pipe(sourcemaps.init())  
        .pipe(concat(name + '.js'))
    );
  }, function processJSON(name, namespace, files){
    streams[name].push(gulp.src(files, { base: './' })
        .pipe(sourcemaps.init())
        .pipe(declare({
          root: 'window',
          namespace: namespace,
          noRedeclare: true
        }))
        .pipe(concat(name + '.js'))
    );
  }, function processTemplate(name, namespace, files){
    streams[name].push(gulp.src(files, { base: './' })
        .pipe(sourcemaps.init())
        .pipe(jst())
        .pipe(declare({
          root: 'window',
          namespace: namespace,
          noRedeclare: true
        }))
    );
  });
  //combined keyed streams and concat
  var combined = [];
  for(var key in streams){
    var stream = eventstream.merge(streams[key])
        .pipe(concat(key + '.min.js'))
        .pipe(uglify({ 
          mangle: true
        }))
        .pipe(sourcemaps.write('.', { includeContent:true }))
        .pipe(gulp.dest('./js'));
    combined.push(stream);
  }
  return eventstream.merge(combined);
});
gulp.task('build:css', function(){
  var streams = [];
  streams.push(gulp.src('./styles/fonts/*')
      .pipe(gulp.dest('./css/fonts'))
  );
  processStyles(function(name, files){
    //regular multiple css minification
    streams.push(gulp.src(files, { base: './' })
        .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(concat(name + '.min.css'))
          .pipe(minifyCss())
        .pipe(sourcemaps.write('.', { includeContent:true }))
        .pipe(gulp.dest('./css'))
    );
  });
  return eventstream.merge(streams);
});

gulp.task('watch', function(){
    watch('./scripts/**/*', batch(function(events, done){
      sequence('clean:js','build:js', done);
    }));
    watch('./styles/**/*', batch(function(events, done){
      sequence('clean:css','build:css', done);
    }));
});

gulp.task('lint', function(){
  return gulp.src([
      './scripts/**/*.js',
      '!./scripts/**/lib/**/*.js'
    ])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
});

function processScripts(scriptCallback, jsonCallback, templateCallback){
  for(var i=0; i<scripts.length; i++){
    if(scripts[i].json)
      jsonCallback.call(null, scripts[i].name, scripts[i].json, scripts[i].files);
    else if(scripts[i].template)
      templateCallback.call(null, scripts[i].name, scripts[i].template, scripts[i].files);
    else
      scriptCallback.call(null, scripts[i].name, scripts[i].files);
  }
}

function processStyles(styleCallback){
  for(var i=0; i<styles.length; i++){
    styleCallback.call(null, styles[i].name, styles[i].files);
  }
}

function excludeNpmPaths(path){
  if(path.dirname.indexOf('node_modules') === 0){
    path.dirname = 'scripts/lib/';
  }
}