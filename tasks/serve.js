import browserSync from 'browser-sync';
import gulp from 'gulp';

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function serve() {
  // eslint-disable-next-line no-unused-expressions
  browserSync({
    notify: false,
    server: 'docs',
    port: 3000
  });
  gulp.watch(
    ['src/**/*.html', 'src/**/*.njk', 'src/**/*.json', 'src/_data/**/*.json'],
    gulp.series('nunjucks', 'bake', browserSyncReload)
  );
  gulp.watch(
    ['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/**/*.scss'],
    gulp.series('styles', browserSyncReload)
  );
  gulp.watch(
    ['src/js/**/*.js'],
    gulp.series('lint', 'scripts', browserSyncReload)
  );
  gulp.watch(['src/img/**/*'], gulp.series('images', browserSyncReload));
}

gulp.task('serve', serve);

export default serve;
