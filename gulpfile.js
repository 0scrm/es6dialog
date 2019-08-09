const {
  src,
  dest,
  series,
  parallel
} = require("gulp")
const sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  babel = require("gulp-babel"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  del = require("del")


const files = {
  scssPath: "src/*.scss",
  jsPath: "src/*.js"
}

function clean() {
  return del("build/**/*")
}

function styles() {
  return src(files.scssPath)
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build"))
}

function scripts() {
  return src(files.jsPath)
    .pipe(concat("es6dialog.js"))
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest("build"))
}

exports.default = series(
  parallel(clean, styles, scripts)
)
