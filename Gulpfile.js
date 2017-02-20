"use strict";

var gulp = require("gulp"),
		browserSync = require("browser-sync"),
		sass = require("gulp-sass"),
		bourbon = require("node-bourbon").includePaths,
		neat = require("node-neat").includePaths,
		refills = require("node-refills").includePaths,
		jade = require('gulp-jade'),
		images = require('gulp-image');


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

// Live reload anytime a file changes
gulp.task("watch", ["browserSync", "sass", "images", "templates"], function() {
	gulp.watch("app/scss/**/*.scss", ["sass"]);
	gulp.watch("dist/*.html").on("change", browserSync.reload);
	gulp.watch('app/*.jade',['templates']);
	gulp.watch('app/images/*',['images']);
});

//default task that's not used?
// gulp.task('default', ['templates', 'images'], function () {
//     browserSync({server: './dist'});
//     gulp.watch('./app/*.jade', ['templates']);
// });

// Spin up a server
gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "dist"
		}
	})
});

// Compile SASS files
gulp.task("sass", function() {
	gulp.src("app/scss/**/*.scss")
			.pipe(sass({
				includePaths: bourbon,
				includePaths: neat,
				includePaths: refills
			}))
			.pipe(gulp.dest("dist/css"))
			.pipe(browserSync.reload({
				stream: true
			}))
});

// Compile jade template to html
gulp.task('templates', function() {
    return gulp.src('./app/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'))
        // .pipe(reload({stream: true}));
});
