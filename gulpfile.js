var gulp = require('gulp');
 var sass = require('gulp-sass');
 var watch = require('gulp-watch');
 var concat = require('gulp-concat');
 var autoprefixer = require('gulp-autoprefixer');
 var browserSync = require('browser-sync');
 var uglify = require('gulp-uglify');
 var imagemin = require('gulp-imagemin');
 var minifycss = require('gulp-minify-css');
 var sourcemaps = require('gulp-sourcemaps');
 


var markup = './markup';
var dist = './dist';

var markupPaths = {
    html: [markup + '/**/*.html'],
    js: [markup + '/assets/js/**/*.js'],
    scss: [markup + '/assets/scss/**/*.scss'],
    fonts: [markup + '/assets/fonts/**/*.*'],
    image:[markup + '/assets/images/**/*.+(png|jpg|svg)']
}

'use strict';
gulp.task('html', function() {
    return gulp.src(markupPaths.html)
        .pipe(gulp.dest('./dist'))
         .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('js', function() {
    return gulp.src(markupPaths.js)
        .pipe(uglify())
        .pipe(concat('assets.js'))
        .pipe(gulp.dest('./dist/assets/js'))
         .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('sass', function () {
  return gulp.src(markupPaths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('fonts', function() {
    return gulp.src(markupPaths.fonts)
    .pipe(gulp.dest('./dist/assets/fonts'))
});
gulp.task('images',  function () {
    return gulp.src(markupPaths.image)
        .pipe(imagemin({
            multipass: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('./dist/assets/images'))
});
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './dist'
      },
        port: 3004,
        open: true,
        browser: 'default',
        startPath: '/index.html'

    });
});
gulp.task('watch', function() {
    watch(markupPaths.html, function() {
        gulp.start('html');
    });
    watch(markupPaths.scss, function() {
        gulp.start('sass');
    });
    watch(markupPaths.js, function() {
        gulp.start('js');
    });
    watch(markupPaths.js, function() {
        gulp.start('images');
    });
});


gulp.task('default', ['html','sass','js' ,'fonts','images', 'browser-sync', 'watch']);

