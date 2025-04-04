import bake from './tasks/bake.js';
import clean from './tasks/clean.js';
import clear from './tasks/clear.js';
import copy from './tasks/copy.js';
import fetch from './tasks/fetch.js';
import format from './tasks/format.js';
import gulp from 'gulp';
import images from './tasks/images.js';
import lint from './tasks/lint.js';
import nunjucks from './tasks/nunjucks.js';
import runSequence from 'gulp4-run-sequence';
import scripts from './tasks/scripts.js';
import serve from './tasks/serve.js';
import styles from './tasks/styles.js';

// default tasks
gulp.task('default', (done) => {
  runSequence(
    [clean, styles, copy, gulp.parallel(scripts, images), nunjucks, bake],
    lint,
    format,
    done
  );
});

// run default tasks and then serve locally
gulp.task('dev', gulp.series('default', serve));

// Allow them to be called individually
gulp.task(clear);
gulp.task(fetch);
gulp.task(format);
