var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');

gulp.task('default', ['styles', 'copy-img', 'script', 'copy-html', 'browser-sync'], function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch("images/*", ['copy-img']);
	gulp.watch("js/*", ['script']);
	gulp.watch("./*.html", ['copy-html', browserSync.reload]);
});

gulp.task('styles', function() {
	gulp.src('sass/**/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('copy-html', function() {
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-img', function() {
	gulp.src('./images/*')
		.pipe(gulp.dest('dist/images'));
})

gulp.task('script', function() {
	gulp.src('./js/*')
		.pipe(babel({
			presets: ['env']
			}))
		.pipe(gulp.dest('dist/js'));
})

gulp.task('browser-sync', function() {
	browserSync.init({
		server: "./dist"
	});
});