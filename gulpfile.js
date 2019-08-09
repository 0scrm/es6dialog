
const {
  src,
  dest,
  series,
  parallel
} = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
var babel = require("gulp-babel");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const del = require("del");


const files = {
  scssPath: "src/*.scss",
  jsPath: "src/*.js"
}

function clean() {
  return del("build/**/*");
}

function styles() {
  return src(files.scssPath)
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build"));
}

function scripts() {
  return src(files.jsPath)
    .pipe(concat("es6dialog.js"))
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest("build"));
}

exports.default = series(
  parallel(clean, styles, scripts)
);
