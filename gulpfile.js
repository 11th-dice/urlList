var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('mocha', function() {
  return gulp.src(['test/models/*.js'], { read: false })
    .pipe(mocha({ reporter: 'list'}))
    .on('error', gutil.log);
});

gulp.task('watch-mocha',function () {
	gulp.watch(['models/*.js','test/models/*.js'],['mocha']);
});