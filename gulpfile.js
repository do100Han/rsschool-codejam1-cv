'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    size = require('gulp-size'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    validator = require('gulp-html');

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    browserSync.watch('src', browserSync.reload)
});

gulp.task('pug', function () {
    return gulp.src('src/pug/index.html')
        .pipe(gulp.dest('src/'));
});

gulp.task('css', function () {
    return gulp.src(['src/css/style.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(autoprefixer(
            {
                browsers: ['last 6 versions']
            }
        ))
        .on("error", notify.onError({
          title: "style"
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(csso())
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css/'));
});

// gulp.task('pug', function () {
//     return gulp.src(['src/pug/index.pug'])
//         .pipe(pug)({
//             pretty:true})
//         .pipe(plumber())
//         .pipe(gulp.dest('src'));
// });

gulp.task('watch', function () {
    gulp.watch('src/css/**/*.styl',gulp.series('css'))
    gulp.watch('src/pug/index.pug', gulp.series('pug'))
});

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'css'),
    gulp.parallel('watch', 'serve')
));

