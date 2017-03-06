"use strict";

var gulp = require("gulp"),
		sass = require("gulp-sass"),
		bourbon = require("node-bourbon").includePaths,
		neat = require("node-neat").includePaths,
		refills = require("node-refills").includePaths,
		jade = require('gulp-jade'),
		images = require('gulp-image'),
		connect = require('gulp-connect');


// Optimize and copy images
gulp.task('images', function () {
  gulp.src('app/images/*')
    .pipe(images({
			pngquant: false,
      optipng: false,
      zopflipng: false,
      jpegRecompress: false,
      jpegoptim: false,
      mozjpeg: false,
      gifsicle: false,
      svgo: false,
      concurrent: 10
		}))
    .pipe(gulp.dest('dist/images'));
});

// Copy fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/css/fonts'))
})

// Copy javascript
gulp.task('javascript', function() {
  return gulp.src('app/javascript/**/*')
    .pipe(gulp.dest('dist/javascript'))
})

// Compile SASS files
gulp.task("sass", function() {
	gulp.src("app/scss/**/*.scss")
			.pipe(sass({
				includePaths: bourbon,
				includePaths: neat,
				includePaths: refills
			}))
			.pipe(gulp.dest("dist/css"))
});

// Compile jade template to html
gulp.task('templates', function() {
    return gulp.src('./app/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'))
});

// Live reload anytime a file changes
gulp.task("watch", ["sass", "templates"], function() {
	gulp.watch("app/scss/**/*.scss", ["sass"]);
	gulp.watch('app/*.jade',['templates']);

});

//default gulp command
gulp.task('default', ['webserver', 'compile'], function () {
});

// Gulp Compile
gulp.task('compile', ['javascript', 'templates', 'sass' ,'images', 'fonts'], function () {
});

gulp.task('webserver', function() {
	connect.server({
		root: 'dist',
		port: process.env.PORT || 5000,
		livereload: true
	});
});
