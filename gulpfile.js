const gulp = require('gulp');
const sass = require('gulp-sass');
const inject = require('gulp-inject');
const minify = require("gulp-babel-minify");



gulp.task('default', ['dev', 'minify']);

gulp.task('dev', ['sass', 'inject'])

gulp.task('sass', function () {
  return gulp.src('./sass/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('inject', ['sass'], function () {
  var target = gulp.src('./js/leiste2.js');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./build/css/*.css']);
  
  return target.pipe(inject(sources, {
    starttag: '<!-- inject:css -->', 
    removeTags: true ,
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }
  ))
    .pipe(gulp.dest('./build'));
});

gulp.task("minify", ['inject'], () =>
  gulp.src("./build/*.js")
    .pipe(minify({
      mangle: {
        keepClassName: true
      },
      deadcode: true
    }))
    .pipe(gulp.dest("./dist"))
);