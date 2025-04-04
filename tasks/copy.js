import gulp from 'gulp';

function copy() {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map'
    ])
    .pipe(gulp.dest('./docs/js'));
}

gulp.task('copy', copy);

export default copy;
