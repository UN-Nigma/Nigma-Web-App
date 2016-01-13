var gulp       = require("gulp"),
    source     = require("vinyl-source-stream"),
    browserify = require("browserify"),
    watchify   = require("watchify"),
    reactify   = require("reactify"),
    babelify   = require("babelify"),
    concat     = require("gulp-concat"),
    stylus     = require("gulp-stylus"),
    uglify     = require("gulp-uglify"),
    webserver  = require("gulp-webserver"),
    stripdebug = require("gulp-strip-debug"),
    htmlmin    = require("gulp-htmlmin"),
    gutil      = require("gulp-util"),
    rename     = require("gulp-rename"),
    nib        = require("nib");


function bundleScripts(watch){
  var bundler = browserify('./dev/js/main.js',{
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  if(watch) {
    bundler = watchify(bundler);
  }

  bundler
    .transform(babelify.configure({
      only: /dev/
    }) )



  function rebundle() {
    var stream = bundler.bundle();
    var started = new Date().getTime();

    stream.on('end',function() {
      gutil.log('Browserify finished');
    })
    .on("error", function(err) {
      gutil.log("Error: " + err.message);
    });
    stream.pipe(source('main.js'))
    .pipe(rename('bundle.js')) // so it won't open by mistake when looking for main.js using cmd-T
    .pipe(gulp.dest('dist/js'));
  }

  bundler.on('update',rebundle);
  return rebundle();
};

/**
 * BROWSERIFY TASK
 * ************
 * Run Browserify
 */
gulp.task('browserify',function(){
  return bundleScripts(false);
});


/**
 * STYLUS TASK
 * ************
 * pre-compile stylus to CSS
 */

gulp.task('stylus', function() {
  gulp.src('dev/styl/main.styl')
    .pipe(stylus({
      compress: true,
      use: nib()
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'))
});

/**
 * IMAGES TASK
 * ************
 */

gulp.task('images', function() {
  gulp.src('dev/images/**/*')
    .pipe(gulp.dest('dist/images'))
});

/**
 * CKEDITOR TASK
 * ************
 * Copy CKEDITOR library to dist
 */


gulp.task('ckeditor', function() {
  gulp.src('dev/ckeditor/**/**.*')
    .pipe(gulp.dest('dist/ckeditor'))
});


/**
 * SERVER TASK
 * ************
 * Run server
 * default port: 8000
 */

gulp.task('server', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
      fallback : 'index.html',
      port: 8000
  }));
});



/**
 * HTML TASK
 * ************
 */

gulp.task('html', function(){
	gulp.src('dev/index.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true,
		minifyURLs: true,
		minifyJS: true
		}))
	.pipe(gulp.dest('dist'));
	});


gulp.task('watch', function() {
  bundleScripts(true);
  gulp.watch('dev/styl/**/*.styl', ['stylus']);
  gulp.watch('dev/js/libs/**/*.js', ['ckeditor']);
  gulp.watch('dev/**/*.html', ['html']);
  gulp.watch('dev/images/**.*', ['images']);
})


gulp.task('build', ['images', 'stylus', 'ckeditor', 'html', 'browserify']);
gulp.task('dev', ['build', 'server', 'watch']);
