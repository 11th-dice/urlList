'strong mode';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';



let lintPath = ['./*.js', './src/**/*.js'];
let testPath = ['./test/**/*.js'];
let jadePath = ['./src/views/**.jade'];
let staticPath = ['./src/public/**/**.*', './src/config/*.*'];
let babelPath = ['./bin/**','./src/**/*.js'];
const mc = './node_modules/materialize-css/dist';
const jq = './node_modules/jQuery/dist';
const npmJs = [`${mc}/js/materialize.min.js`, `${jq}/jquery.min.js`];
const npmCss = [`${mc}/css/materialize.min.css`];

let watchPath = [...testPath, ...jadePath, ...staticPath, ...babelPath ];

gulp.task('lint', () => {
  return gulp.src(lintPath)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('mocha', () => {
  return gulp.src(testPath)
    .pipe(mocha({ reporter: 'nyan'}));
})

gulp.task('build', ['build:jade', 'build:babel', 'build:statics', 'build:npm-js', 'build:npm-css']);

gulp.task('build:jade', () => {
  return gulp.src(jadePath, {base: 'src'})
    .pipe(gulp.dest('dest'));
});

gulp.task('build:statics', () => {
  return gulp.src(staticPath, {base: 'src'})
    .pipe(gulp.dest('dest'));
});
gulp.task('build:npm-js', () => {
  return gulp.src(npmJs)
    .pipe(gulp.dest('dest/public/js'));
});
gulp.task('build:npm-css', () => {
  return gulp.src(npmCss)
    .pipe(gulp.dest('dest/public/css'));
});


gulp.task('build:babel', () => {
  return gulp.src(babelPath)
    .pipe(babel())
    .pipe(gulp.dest('dest'));
});


gulp.task('watch', () => {
  gulp.watch(watchPath, ['mocha','build']);
});
