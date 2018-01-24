var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer')
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
del = require('del'),
inject = require('gulp-inject'),
filter = require("gulp-filter"),
merge = require("merge-stream"),
mainBowerFiles = require("main-bower-files"),
nodemon = require('gulp-nodemon'),
livereload = require('gulp-livereload');


const config = require("./config.js");

// var minify = process.env.NODE_ENV == "production";
var minify = false;

// var injectMin = process.env.NODE_ENV == "production";
var injectMin = false;


gulp.task("serve", ["build"], function () {

 	livereload.listen({port:config.livereloadPort})

	var stream = nodemon({ 
		script: './server.js',
		ext:"js html css json",
		watch:["./src", "./server.js"],
		tasks:["build"]
	});
	

	stream.on("restart", function () {

		// setTimeout(function () {

			livereload.reload();

		// }, 2000);

	})

	stream.on("crash", function () {
		
		stream.emit('restart', 2000);
	})

	
})

gulp.task("build", ["clean"], function () {


	gulp.start("compile");
})


gulp.task('compile', ["js", "styles", "copy"], function () {


});


gulp.task("js", ["scripts"], function () {

	var important = gulp.src('dist/assets/js/vendor' + (minify && injectMin ? ".min" : "") + '.js', {read: false});
	var standard = gulp.src(["dist/assets/js/main" + (minify && injectMin ? ".min" : "") + ".js", 'dist/assets/**/*.css'], {read:false});

	return gulp.src('src/index.html')
	.pipe(inject(important, {ignorePath:"dist", starttag: '<!-- inject:head:{{ext}} -->'}))
	.pipe(inject(standard, {ignorePath:"dist"}))
	.pipe(gulp.dest('dist'));

})


gulp.task('scripts', ['vendor'], function() {
	return gulp.src([
		            "src/state/stateModule.js",
	                "src/app.js",
		            "src/**/*.js"
	            ])
	.pipe(concat('main.js'))
	// .pipe(rename({suffix: '.min'}))
	// .pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'));
});


gulp.task('styles', function() {
	return gulp.src('src/assets/css/**/*.css', { style: 'expanded' })
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	// .pipe(concat("styles.css"))
	// .pipe(rename({suffix: '.min'}))
	// .pipe(uglify())
	.pipe(gulp.dest('dist/assets/css'));
});

gulp.task("vendor", function () {

	var js = gulp.src(mainBowerFiles(), { base: __dirname + '/bower_components' })
	.pipe(filter("**/*.js"))
	.pipe(concat("vendor.js"))
	// .pipe(rename({suffix: '.min'}))
	// .pipe(uglify())
	.pipe(gulp.dest("dist/assets/js"));

	var css = gulp.src(mainBowerFiles())
	.pipe(filter("**/*.css"))
	.pipe(concat("vendor.css"))
	// .pipe(rename({suffix: '.min'}))
	// .pipe(uglify())
	.pipe(gulp.dest("dist/assets/css"));

	return merge(js, css);
});

gulp.task("html", function () {

	return gulp.src('src/assets/**/*.html')
	.pipe(gulp.dest("dist/assets/"))
});

gulp.task('images', function() {
	return gulp.src('src/assets/img/**/*')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('dist/assets/img'));
});

gulp.task('fonts', function () {

	return gulp.src("src/assets/css/**/*.*")
	.pipe(gulp.dest("dist/assets/css"))
});

gulp.task("misc", function () {

	var favicon = gulp.src(["./favicon.ico"])
	.pipe(gulp.dest("dist"));

	var api = gulp.src(["api/**/*.*"])
	.pipe(gulp.dest("dist/api"))

	return merge(favicon, api);
})

gulp.task("copy", ["misc", "html", "images", "fonts"], function () {


})

gulp.task('clean', function() {
	return del('dist');
});







