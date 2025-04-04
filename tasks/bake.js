import * as journalize from 'journalize';
import browserSync from 'browser-sync';
import fs from 'fs-extra';
import gulp from 'gulp';
import gulpData from 'gulp-data';
import isValidGlob from 'is-valid-glob';
import nunjucksRender from 'gulp-nunjucks-render';
import rename from 'gulp-rename';

// eslint-disable-next-line no-sync
const config = fs.readJsonSync('./project.config.json');

function bake(resolve) {
  const dataDir = 'src/_data/';

  // modularize manageEnv from nunjucks.js
  function manageEnv(env) {
    // loop over config vars to add to nunjucks global env
    // which can be added to project.config.json
    for (const k in config) {
      // eslint-disable-next-line no-prototype-builtins
      if (config.hasOwnProperty(k)) {
        env.addGlobal(k, config[k]);
      }
    }

    // loop over the directory of files
    fs.readdir(dataDir, (err, files) => {
      // handle errors
      if (err) {
        console.error('Could not list the directory.', err);
        // eslint-disable-next-line no-process-exit, no-undef
        process.exit(1);
      }

      // for each file
      files.forEach((file) => {
        // if it's a .json file
        if (file.endsWith('json')) {
          // make the key the file name
          const key = file.split('.json')[0];

          // and the value the file contents
          // eslint-disable-next-line no-sync
          const fileContents = fs.readFileSync(dataDir + file);
          const value = JSON.parse(fileContents);

          // and add to our global environment
          env.addGlobal(key, value);
        }
      });
    });

    // set up journalize
    // eslint-disable-next-line guard-for-in
    for (const key in journalize) {
      const func = journalize[key];
      if (typeof func === 'function') {
        env.addFilter(key, func);
      }
    }
  }

  if (!config.to_bake) {
    resolve();
    return;
  }

  config.to_bake.forEach((bake) => {
    if (!bake.template) {
      throw new Error('bake.template is undefined. Add a nunjucks template.');
    }
    if (!bake.slug) {
      throw new Error(
        'bake.slug is undefined. Specify a key that will be used as the slug for the page.'
      );
    }
    if (bake.path === null) {
      throw new Error(
        'bake.path is undefined. Specify a path where your pages will be baked.'
      );
    }

    // and the value the file contents
    // eslint-disable-next-line no-sync
    const fileContents = fs.readFileSync(`${dataDir}${bake.data}.json`);
    let data = JSON.parse(fileContents);

    if (typeof data === 'object') {
      data = data[bake.array];
    }
    if (!data) {
      throw new Error(
        `data[${bake.array}] is undefined. Specify the valid array.`
      );
    }

    data.forEach((d) => {
      if (!d[bake.slug]) {
        throw new Error(
          `d[${bake.slug}] is undefined. Specify a key that will be used as the slug for the page.`
        );
      }

      if (!isValidGlob(`docs/${bake.path}/${d[bake.slug]}.html`)) {
        throw new Error(
          `docs/${bake.path}/${d[bake.slug]}.html is not a valid glob.`
        );
      }

      gulp
        .src(`src/_templates/${bake.template}.njk`)
        .pipe(gulpData(d))
        .pipe(
          nunjucksRender({
            path: 'src',
            manageEnv
          })
        )
        .pipe(
          rename({
            basename: d[bake.slug],
            extname: '.html'
          })
        )
        .pipe(gulp.dest(`docs/${bake.path}`))
        .pipe(browserSync.stream());
    });
  });

  resolve();
}

gulp.task('bake', bake);

export default bake;
