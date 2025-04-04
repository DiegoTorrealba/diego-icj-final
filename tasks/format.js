import gulp from 'gulp';
import prettier from 'gulp-plugin-prettier';

function format() {
  return gulp
    .src([
      './src/js/*.js',
      './docs/*.html',
      './docs/*/*.html',
      './src/js/*.js',
      './src/_data/*.json'
    ])
    .pipe(
      prettier.format({
        config: '.prettierrc.json'
      })
    )
    .pipe(gulp.dest((file) => file.base));
}

gulp.task('format', format);

export default format;
