const {src, dest} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const image = require('gulp-imagemin');
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
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(concat('main.css'))
    .pipe(dest('./dist/css/'));
};

const scripts = () => {
  return src(
    ['./src/js/**/*.js', './src/js/main.js'], {
      allowEmpty: true,
    })
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest('./dist/js'));
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

const htmlMinify = () => {
  return src('src/pug/*.pug')
    .pipe(pug())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'));
}

module.exports = {
  clean,
  svgSprites,
  styles,
  scripts,
  resources,
  images,
  fonts,
  htmlMinify,
}
