'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let pump = require('pump');

const paths = {
    srcSASS: 'assets/styles/sass/**/*.scss',
    srcJS: 'assets/js/**/*.js',
    srcCSS:'assets/styles/css/',
};

// Set the browser that you want to support
const BROWSERS = [
    'chrome >= 40',
    'ff >= 30',
    'ie >= 08',
    'ie_mob >= 09',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4'
];

function callback(error){
    if(error)
        console.log(error);
}

gulp.task('sass', () => {
    pump([gulp.src(paths.srcSASS), sass().on('error', sass.logError),
        autoprefixer({ browsers: BROWSERS, cascade: false, grid: true}), 
        , cleanCSS(), gulp.dest(paths.srcCSS)], callback);
});
gulp.task('compress', () => {
    pump([gulp.src(paths.srcJS), uglify(), rename('app.min.js'),gulp.dest('assets/js/minified/')], callback);
})

gulp.task('default', () => { 
    gulp.watch(paths.srcSASS,['sass']);
});