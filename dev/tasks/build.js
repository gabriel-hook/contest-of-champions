import eventstream from 'event-stream';
import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import conditional from 'gulp-if';
import rename from "gulp-rename";
import declaration from 'gulp-declare';
import jst from 'gulp-jst';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import minifyJs from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';
import minifyHtml from 'gulp-htmlmin';
import sourcemaps from 'gulp-sourcemaps';

import scripts from '../v1/scripts.json';
import styles from '../v1/styles.json';

const DEVELOPMENT = gutil.env.dev;

const distPath = './.build';

function renamePaths(override, options = {}){
  const { force } = options;
  return rename((path) => {
    //override with a default if we have one and its a node include
    if(force || (override && path.dirname.indexOf('node_modules') === 0)){
      path.dirname = override;
    }
    //fix backslash paths if coming from windows
    path.dirname = path.dirname.replace(/\\/g, '/');
  });
}

gulp.task('build:js', ['clean:js'], () => {
  //set up empty arrays for 
  let streams = {};
  for(const {name} of scripts)
    if(!streams[name])
      streams[name] = [];

  //get the streams
  for(const { name, files, json, template } of scripts){
    //if its JSON, store it to a variable
    if(json){
      streams[name].push(gulp.src(files, { base: './' })
          .pipe(plumber())
          .pipe(renamePaths('scripts/lib'))  
          .pipe(sourcemaps.init())
          .pipe(declaration({
            root: 'window',
            namespace: json,
            noRedeclare: true
          }))
          .pipe(concat(name + '.js'))
      );
    }
    //if its a template, underscore compile it and save to a variable
    else if(template){
      streams[name].push(gulp.src(files, { base: './' })
          .pipe(plumber())
          .pipe(renamePaths('templates/lib'))  
          .pipe(sourcemaps.init())
          .pipe(minifyHtml({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeAttributeQuotes: true
          }))
          .pipe(jst())
          .pipe(declaration({
            root: 'window',
            namespace: template,
            noRedeclare: true
          }))
      );
    }
    //process scripts normally
    else{
      streams[name].push(gulp.src(files, { base: './' })
          .pipe(plumber())
          .pipe(renamePaths('scripts/lib'))  
          .pipe(sourcemaps.init())
          .pipe(concat(name + '.js'))
      );
    }
  }

  //combined keyed streams and concat
  let combined = [];
  for(const key in streams){
    const stream = eventstream.merge(streams[key])
      .pipe(concat(key + '.js'))
      .pipe(conditional(!DEVELOPMENT, minifyJs({ 
        mangle: true,
        compress: true
      })))
      .pipe(conditional(!DEVELOPMENT, sourcemaps.write('.', { 
        includeContent:true 
      })))
      .pipe(gulp.dest(distPath));
    combined.push(stream);
  }
  return eventstream.merge(combined);
});

gulp.task('build:css', ['clean:css'], () => {
  let streams = [];
  streams.push(gulp.src('./v1/fonts/*.*')
    .pipe(plumber())
    .pipe(gulp.dest(`${ distPath }/fonts`))
  );
  //regular multiple css minification
  for(const {name, files} of styles){
    streams.push(gulp.src(files, { base: './' })
      .pipe(plumber())
      .pipe(renamePaths('styles', { force: true }))
      .pipe(sourcemaps.init({ loadMaps: false }))
        .pipe(concat(name + '.css'))
        .pipe(autoprefixer({
          browsers: 'last 10 versions',
          cascade: false
        }))
        .pipe(conditional(!DEVELOPMENT, minifyCss({
          keepSpecialComments: false,
          roundingPrecision: -1
        })))
        .pipe(conditional(!DEVELOPMENT, sourcemaps.write('.', { 
          includeContent:true 
        })))
        .pipe(gulp.dest(distPath))
    );
  };
  return eventstream.merge(streams);
});

gulp.task('build', ['build:js', 'build:css'], () => {
    let streams = [];
    streams.push(gulp.src([
            './v1/*',
            '!./v1/fonts',
            '!./v1/scripts',
            '!./v1/styles',
            '!./v1/templates',
        ])
            .pipe(plumber())
            .pipe(gulp.dest(distPath))
    );
    streams.push(gulp.src([
            './images/**/*'
        ])
        .pipe(plumber())
        .pipe(gulp.dest(`${ distPath }/images`))
    );
    return eventstream.merge(streams);
});
