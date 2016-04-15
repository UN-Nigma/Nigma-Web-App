var gulp       = require("gulp"),
source     = require("vinyl-source-stream"),
browserify = require("browserify"),
watchify   = require("watchify"),
babelify   = require("babelify"),
concat     = require("gulp-concat"),
sass     = require("gulp-sass"),
sourcemaps     = require("gulp-sourcemaps"),
uglify     = require("gulp-uglify"),
stripdebug = require("gulp-strip-debug"),
htmlmin    = require("gulp-htmlmin"),
gutil      = require("gulp-util"),
browserSync = require('browser-sync').create(),
rename     = require("gulp-rename");
envify			= require('envify/custom');

function bundleScripts(watch){
	var bundler = browserify('./dev/js/app.js',{
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
		only: /dev/,
		presets: ["es2015", "react"]
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
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
  }

  //bundler.on('update',rebundle);
  rebundle();
};

/**
 * BROWSERIFY TASK
 * ************
 * Run Browserify
 */
 gulp.task('browserify',function(){
 	bundleScripts(true);
 });


/**
 * STYLUS TASK
 * ************
 * pre-compile stylus to CSS
 */

 gulp.task('sass', function() {
 	gulp.src('dev/style/main.sass')
 	.pipe(sourcemaps.init())
 	.pipe(sass({errLogToConsole: true, includePaths: ['bower_components/bourbon/app/assets/stylesheets', 'bower_components/neat/app/assets/stylesheets']}))
 	.pipe(sourcemaps.write('.'))
 	.pipe(gulp.dest('dist/css'))
 	.pipe(browserSync.stream({match: '**/*.css'}));
 });

/**
 * IMAGES TASK
 * ************
 */

 gulp.task('images', function() {
 	gulp.src('dev/images/**/*')
 	.pipe(gulp.dest('dist/images'))
 });

 gulp.task('lib', function() {
 	gulp.src('dev/lib/**/*')
 	.pipe(gulp.dest('dist/lib'))
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
 	.pipe(gulp.dest('dist'))
 	.pipe(browserSync.reload({stream: true}));
 });


 gulp.task('watch', function() {
  //bundleScripts(true);
  gulp.watch('dev/js/**/*.js', ['browserify']);
  gulp.watch('dev/style/**/*.sass', ['sass']);
  gulp.watch('dev/js/libs/**/*.js', ['ckeditor']);
  gulp.watch('dev/**/*.html', ['html']);
  gulp.watch('dev/images/**.*', ['images']);
  gulp.watch('dev/lib/**.*', ['lib']);
})


 gulp.task('serve', function() {
 	var historyApiFallback = require('connect-history-api-fallback')

 	browserSync.init({
 		server: "./dist",
 		index: "index.html",
 		port: 8000,
 		middleware: [ historyApiFallback() ]
 	});
 });

gulp.task('compile', function() {
	var bundler = browserify('./dev/js/app.js');

	bundler.transform(babelify.configure({
		only: /dev/,
		presets: ["es2015", "react"]
	}));
	bundler.transform(envify({NODE_ENV: process.env.NODE_ENV}));

	bundler.transform({ sourcemap: false }, 'uglifyify');

	return bundler.bundle()
		.pipe(source('main.js'))
		.pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/js'));

});




 gulp.task('build', ['lib', 'images', 'sass', 'ckeditor', 'html', 'browserify']);
 gulp.task('dev', ['build', 'watch']);

 gulp.task('release', ['lib', 'images', 'sass', 'ckeditor', 'html', 'compile'])



