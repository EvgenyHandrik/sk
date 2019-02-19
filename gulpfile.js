var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');
var del = require('del');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var groupCssMediaQueries = require('gulp-group-css-media-queries');
var browserSync = require('browser-sync').create();
var remember = require('gulp-remember');
var cached = require('gulp-cached');
var changed = require('gulp-changed');
var path = require('path');

gulp.task('sass:main', function() {
	return gulp.src([
		'src/style/main/**/*.scss',
		'!src/style/main/**/helpers/**/*.scss',
		'!src/style/main/**/partial/*.scss'
	], {
		since: gulp.lastRun('sass:main')
	})
		.pipe(remember('sassMainMemory'))
		.pipe(sass().on('error', notify.onError(function(err) {
			return {
				title: 'sass',
				message: err.message
			}
		})))
		.pipe(cached('sassMainCache'))
		.pipe(rename({dirname: ""}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9'],
			cascade: false
		}))
		.pipe(groupCssMediaQueries().on('error', notify.onError(function(err) {
			return {
				title: 'media quiery',
				message: err.message
			}
		})))
		.pipe(changed('build/css', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build/css/'));
});

gulp.task('css:vendor', function() {
	return gulp.src('src/style/vendor/**/*.*', {since: gulp.lastRun('css:vendor')})
		.pipe(changed('build/css/vendor', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build/css/vendor'));
});

gulp.task('style', gulp.parallel(
	'sass:main', 'css:vendor'
));

gulp.task('js:main', function() {
	return gulp.src('src/js/main/**/*.js',
			{since: gulp.lastRun('js:main')})
		.pipe(changed('build/js', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build/js'));
});

gulp.task('js:vendor', function() {
	return gulp.src('src/js/vendor/**/*.js',
			{since: gulp.lastRun('js:vendor')})
		.pipe(changed('build/js/vendor', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build/js/vendor'));
});

gulp.task('js', gulp.parallel(
	'js:main', 'js:vendor'
));

gulp.task('html:pages', function() {
	return gulp.src('src/template/page/*.html',
			{since: gulp.lastRun('html:pages')})
		.pipe(rigger().on('error', notify.onError(function(err) {
			return {
				title: 'rigger',
				message: err.message
			}
		})))
		.pipe(changed('build', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build'));
});

gulp.task('html:partials', function() {
	return gulp.src('src/template/page/*.html')
		.on('error', notify.onError(function(err) {
			return {
				title: 'rigger src',
				message: err.message
			}
		}))
		.pipe(rigger().on('error', notify.onError(function(err) {
			return {
				title: 'rigger',
				message: err.message
			}
		})))
		.pipe(changed('build', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build/'));
});

gulp.task('image', function() {
	return gulp.src('src/images/**/*.*', {since: gulp.lastRun('image')})
		.pipe(changed('build/images', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build/images'))
});

gulp.task('font', function() {
	return gulp.src('src/fonts/**/*.*')
		.pipe(changed('build/fonts', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build/fonts'));
});

gulp.task('other:html-files', function() {
	return gulp.src('src/other/**/*.*')
		.pipe(changed('build', {hasChanged: changed.compareContents}))
		.pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
	return del('build/');
});

gulp.task('build', gulp.parallel(
	'style', 'js', 'html:pages', 'image', 'font', 'other:html-files'
));

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: 'build',
			index: 'index.html'
		},
		reloadDebounce: 2000
	});

	browserSync.watch('build/**/*.*')
		.on('change', browserSync.reload);
});

gulp.task('watch', function() {
	gulp.watch([
		'src/style/helpers/**/*.scss',
		'src/style/main/**/*.scss'
	], gulp.series('sass:main'))
		.on('unlink', function(filepath) {
			if (/partial|helpers/.test(filepath)) return;
			remember.forget('sassMainMemory', path.resolve(filepath));
			delete cached.caches.sassMainCache[path.resolve(filepath)];
		});
	gulp.watch('src/style/vendor/*.css', gulp.series('css:vendor'));
	gulp.watch('src/js/main/**/*.js', gulp.series('js:main'));
	gulp.watch('src/js/vendor/**/*.js', gulp.series('js:vendor'));
	gulp.watch('src/template/page/*.html', gulp.series('html:pages'));
	gulp.watch([
			'src/template/**/*.html',
			'!src/template/page/*.html'
		], gulp.series('html:partials'));
	gulp.watch('src/images/**/*.*', gulp.series('image'));
	gulp.watch('src/fonts/**/*.*', gulp.series('font'));
	gulp.watch('src/other/**/*.*', gulp.series('other:html-files'));
});

gulp.task('default', gulp.parallel('watch'));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));