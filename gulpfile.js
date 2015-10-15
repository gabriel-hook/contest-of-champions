'use strict';

var del = require('del');
var eventstream = require('event-stream');
var gulp = require('gulp');
var util = require('gulp-util');
var conditional = require('gulp-if');
var jshint = require('gulp-jshint');
var batch = require('gulp-batch');
var sequence = require('gulp-sequence');
var rename = require("gulp-rename");
var declare = require('gulp-declare');
var jst = require('gulp-jst');
var concat = require('gulp-concat');
var minifyJs = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
var scripts = require('./scripts.json');
var styles = require('./styles.json');

var DEVELOPMENT = util.env.dev;

gulp.task('default', sequence('clean', 'build'));

gulp.task('clean', ['clean:js','clean:css']);
gulp.task('clean:js', function(){
  return del([
    './build/*.js',
    './build/*.js.map'
  ]);
});
gulp.task('clean:css', function(){
  return del([
    './build/*.css',
    './build/*.css.map',
    './build/fonts/'
  ]);
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
        .pipe(rename(excludeNpmPaths.bind(null, 'scripts/lib/')))  
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
        .pipe(minifyHtml({
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeAttributeQuotes: true
        }))
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
        .pipe(concat(key + '.js'))
        .pipe(conditional(!DEVELOPMENT, minifyJs({ 
          mangle: true,
          compress: true
        })))
        .pipe(conditional(!DEVELOPMENT, sourcemaps.write('.', { 
          includeContent:true 
        })))
        .pipe(gulp.dest('./build'));
    combined.push(stream);
  }
  return eventstream.merge(combined);
});
gulp.task('build:css', function(){
  var streams = [];
  streams.push(gulp.src('./styles/fonts/*')
      .pipe(gulp.dest('./build/fonts'))
  );
  processStyles(function(name, files){
    //regular multiple css minification
    streams.push(gulp.src(files, { base: './' })
        .pipe(rename(excludeNpmPaths.bind(null, 'styles/')))
        .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(concat(name + '.css'))
          .pipe(conditional(!DEVELOPMENT, minifyCss({
            keepSpecialComments: 0,
            roundingPrecision: -1
          })))
          .pipe(conditional(!DEVELOPMENT, sourcemaps.write('.', { 
            includeContent:true 
          })))
          .pipe(gulp.dest('./build'))
    );
  });
  return eventstream.merge(streams);
});

gulp.task('watch', function(){
    gulp.watch([
      './scripts/**/*',
      './templates/**/*'
    ], batch(function(events, done){
      sequence('clean:js','build:js', done);
    }));
    gulp.watch('./styles/**/*', batch(function(events, done){
      sequence('clean:css','build:css', done);
    }));
});

gulp.task('lint', function(){
  return gulp.src([
      './scripts/**/*.js',
      '!./scripts/**/lib/**/*.js'
    ])
      .pipe(jshint({
        "indent": 2,
        "white": true,
        "node": true,
        "undef": true,
        "unused": true,
        "-W014": true,
        "-W057": false,
        "-W058": false,
        "-W069": false,
        "-W083": false,
        "-W098": false,
        "-W117": false,
        "expr": true
      }))
      .pipe(jshint.reporter('default', { verbose: true }))
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

function excludeNpmPaths(override, path){
  if(path.dirname.indexOf('node_modules') === 0){
    path.dirname = override;
  }
}
