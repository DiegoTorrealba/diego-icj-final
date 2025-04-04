import cache from 'gulp-cache';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

function images() {
  return gulp
    .src('./src/img/**/*')
    .pipe(
      cache(
        imagemin([
          // jpeg compression
          imageminMozjpeg({
            quality: 50
          }),
          // png compression
          imageminPngquant({
            speed: 1,
            quality: 98
          })
        ])
      )
    )
    .pipe(gulp.dest('./docs/img'));
}

gulp.task('images', images);

export default images;
