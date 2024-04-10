const {src, dest, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');
const image = require('gulp-image');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');

const clean = () => {
  return del(['dist/*']);
}

const svgSprites = () => {
  return src('./src/img/svg/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest('./dist/img'));
}

const styles = () => {
  return src(['./src/css/base/normalize.css', './src/css/**/*.css', './src/css/main.scss'], { base: './src/css' })
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(
    ['./src/js/**/*.js', './src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
}

const resources = () => {
  return src('./src/resources/**/*')
    .pipe(dest('./dist'));
}

const images = () => {
  return src([
    './src/img/*.jpg',
    './src/img/*.png',
    './src/img/*.jpeg',
    './src/img/*.webp',
    './src/img/**/*.jpg',
    './src/img/**/*.png',
    './src/img/**/*.jpeg',
    './src/img/**/*.webp'
    ])
    .pipe(image())
    .pipe(dest('./dist/img'));
};

const fonts = () => {
  return src(['./src/fonts/*.woff2', './src/fonts/*.woff'])
    .pipe(dest('./dist/fonts'));
}

const devServer = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
  });

  watch('./src/*.pug', html);
  watch('./src/css/**/*.scss', styles);
  watch('./src/css/**/*.css', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/resources/', resources);
  watch('./src/img/*.{jpg,jpeg,png,webp}', images);
  watch('./src/img/**/*.{jpg,jpeg,png,webp}', images);
  watch('./src/img/svg/*.svg', svgSprites);
  watch('./src/fonts/*.**', fonts);
}

const html = () => {
  return src('src/*.pug')
    .pipe(pug())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

module.exports = {
  clean,
  svgSprites,
  styles,
  scripts,
  resources,
  images,
  fonts,
  html,
  devServer,
}
