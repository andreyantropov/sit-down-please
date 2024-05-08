const { series, parallel } = require('gulp');
const buildTasks = require('./gulp-tasks/gulpfile.build.js');
const devTasks = require('./gulp-tasks/gulpfile.dev.js');

const build = series(buildTasks.clean, parallel(buildTasks.scripts, buildTasks.styles, buildTasks.resources, buildTasks.images, buildTasks.svgSprites, buildTasks.fonts, buildTasks.htmlMinify));
exports.build = build;

const dev = series(devTasks.clean, parallel(devTasks.scripts, devTasks.styles, devTasks.resources, devTasks.images, devTasks.svgSprites, devTasks.fonts, devTasks.html), devTasks.devServer);
exports.dev = dev;