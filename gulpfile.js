var gulp = require("gulp");
var ts = require("gulp-typescript");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var coveralls = require('gulp-coveralls');

var fs = require("fs");

var Server = require('karma').Server;
var isTravis = process.env.TRAVIS || false;
var pathToKarmaConf = __dirname.replace('/gulp', '');

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

gulp.task('unit-test', function(done){
      console.log(isTravis)
    new Server({
      configFile: require('path').resolve('karma.config.js'),
      singleRun: true
    }, done).start();
});


gulp.task('coveralls', function () {
gulp.src('coverage/**/lcov.info')
  .pipe(coveralls());
});

gulp.task('default', ['ts-compile', 'sass','minifyjs','minifycss','unit-test']);
