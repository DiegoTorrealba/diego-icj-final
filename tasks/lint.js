import browserSync from 'browser-sync';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';

function lint() {
  return gulp
    .src(['src/js/**/*.js', '!node_modules/**'])
    .pipe(eslint({ configFile: '.eslintrc.json', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(!browserSync.active, eslint.failAfterError()));
}

gulp.task('lint', lint);

export default lint;
