var gulp = require("gulp");
var ts = require("gulp-typescript");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var fs = require("fs");

var paths = {
    npm: 'node_modules/',
    tsSource: 'src/ts/*.ts',
    tsOutput: "dist/js/powerfull-rating.js",
    tsOutputMin: "powerfull-rating.min.js",
    scssSource: "src/sass/*.scss",
    scssOutput: "dist/css"
};
var tsCompilerConfig = ts.createProject('tsconfig.json');

gulp.task("ts-compile", function () {
    var tsResult = gulp.src(paths.tsSource)
        .pipe(tsCompilerConfig());
    return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task('sass', function () {
  return gulp.src(paths.scssSource)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.scssOutput));
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch(paths.tsSource, ['scripts']);
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.scssOutput, ['sass']);
});

gulp.task('minifyjs', function() {
  return gulp.src('dist/js/*.js')
    .pipe(concat('powerfull-rating.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js')); // write all.min.js to the dist/js file
});

gulp.task('minifycss', function(){
   gulp.src('dist/css/*.css')
   .pipe(concat('powerfull-rating.min.css'))
   .pipe(minify())
   .pipe(gulp.dest('dist/css/'));
});


gulp.task('default', ['ts-compile', 'sass','minifyjs','minifycss']);
