"use strict";

var gulp = require("gulp"),
		browserSync = require("browser-sync"),
		sass = require("gulp-sass"),
		bourbon = require("node-bourbon").includePaths,
		neat = require("node-neat").includePaths,
		refills = require("node-refills").includePaths,
		jade = require('gulp-jade');


// Compiles all gulp tasks
gulp.task("default", ["sass"]);

// Live reload anytime a file changes
gulp.task("watch", ["browserSync", "sass"], function() {
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	gulp.watch("dist/*.html").on("change", browserSync.reload);
	gulp.watch('src/*.jade',['templates']);
});

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
	gulp.src("src/scss/**/*.scss")
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
    return gulp.src('./src/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}));
});


gulp.task('default', ['templates'], function () {
    browserSync({server: './dist'});
    gulp.watch('./src/*.jade', ['templates']);
});
