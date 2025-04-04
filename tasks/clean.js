import { deleteSync } from 'del';
import gulp from 'gulp';

function clean(resolve) {
  deleteSync(['docs/*']);
  resolve();
}

gulp.task('clean', clean);

export default clean;
