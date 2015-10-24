import del from 'del';
import eventstream from 'event-stream';
import gulp from 'gulp';
import babel from 'gulp-babel';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import conditional from 'gulp-if';
import jshint from 'gulp-jshint';
import rename from "gulp-rename";
import declaration from 'gulp-declare';
import jst from 'gulp-jst';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import minifyJs from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';
import minifyHtml from 'gulp-htmlmin';
import sourcemaps from 'gulp-sourcemaps';
import scripts from './scripts.json';
import styles from './styles.json';

const DEVELOPMENT = util.env.dev;

gulp.task('default', ['build']);

gulp.task('clean', ['clean:js','clean:css']);

gulp.task('clean:js', () => {
  return del([
    './build/*.js',
    './build/*.js.map'
  ],{
    force: true
  });
});

gulp.task('clean:css', () => {
  return del([
    './build/*.css',
    './build/*.css.map',
    './build/fonts/'
  ],{
    force: true
  });
});

gulp.task('build', ['build:js', 'build:css']);

gulp.task('build:js', ['clean:js'], () => {
  //set up empty arrays for 
  let streams = {};
  for(let {name} of scripts)
    if(!streams[name])
      streams[name] = [];

  //get the streams
  for(let {name, files, json, template} of scripts){
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
  for(let key in streams){
    let stream = eventstream.merge(streams[key])
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

gulp.task('build:css', ['clean:css'], () => {
  let streams = [];
  streams.push(gulp.src('./styles/fonts/*')
    .pipe(plumber())
    .pipe(gulp.dest('./build/fonts'))
  );
  //regular multiple css minification
  for(let {name, files} of styles){
    streams.push(gulp.src(files, { base: './' })
      .pipe(plumber())
      .pipe(renamePaths('styles'))
      .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(conditional(!DEVELOPMENT, autoprefixer({
          browsers: 'last 10 versions',
          cascade: false
        })))
        .pipe(concat(name + '.css'))
        .pipe(conditional(!DEVELOPMENT, minifyCss({
          keepSpecialComments: false,
          roundingPrecision: -1
        })))
        .pipe(conditional(!DEVELOPMENT, sourcemaps.write('.', { 
          includeContent:true 
        })))
        .pipe(gulp.dest('./build'))
    );
  };
  return eventstream.merge(streams);
});

gulp.task('watch', () => {
  gulp.watch([ './scripts/**/*', './templates/**/*' ], [ 'build:js' ]);
  gulp.watch('./styles/**/*', [ 'build:css' ]);
});

gulp.task('lint', () => {
  return gulp.src([
      './gulpfile.js',
      './scripts/**/*.js',
      '!./scripts/**/lib/**/*.js'
    ])
    .pipe(plumber())
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
    .pipe(jshint.reporter('default', { verbose: true }));
});

function renamePaths(override){
  return rename(function(path){
    //override with a default if we have one and its a node include
    if(override && path.dirname.indexOf('node_modules') === 0){
      path.dirname = override;
    }
    //fix backslash paths if coming from windows
    path.dirname = path.dirname.replace(/\\/g, '/');
  });
}
