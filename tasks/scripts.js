import babel from 'gulp-babel';
import concat from 'gulp-concat';
import gulp from 'gulp';
import newer from 'gulp-newer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

function scripts() {
  return gulp
    .src(['./src/js/main.js'])
    .pipe(newer('./docs/js'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs/js'));
}

gulp.task('scripts', scripts);

export default scripts;
