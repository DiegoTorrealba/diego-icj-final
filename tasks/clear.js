import cache from 'gulp-cache';
import gulp from 'gulp';

function clear() {
  return cache.clearAll();
}

gulp.task('clear', clear);

export default clear;
