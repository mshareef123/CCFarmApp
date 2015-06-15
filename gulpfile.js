var gulp = require('gulp'),
    cfg = require('./config.json'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    jshintreporter = require('jshint-stylish'),
    complexity = require('gulp-complexity'),
    size = require('gulp-size'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    header = require('gulp-header'),
    minifycss = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence');

function concatJs(path, resultFileName) {
    return function () {
        gulp.src(path)
            .pipe(concat(resultFileName))
            .pipe(replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'))
            .pipe(header("'use strict';\n"))
            .pipe(size())//.pipe(uglify())
            .pipe(gulp.dest(cfg.path.dist));
    };
}
function concatCss(path, resultFileName) {
    return function () {
        gulp.src(path)
            .pipe(minifycss())
            .pipe(concat(resultFileName))
            .pipe(size())
            .pipe(gulp.dest(cfg.path.dist));
    };
}

gulp.task('hint', function () {
    gulp.src(cfg.path.foodbankfarm.js)
        .pipe(jshint(cfg.jshintRules))
        .pipe(jshint.reporter(jshintreporter))
        .pipe(jshint.reporter('gulp-jshint-file-reporter', { filename: cfg.path.report.jshint }))
        .pipe(complexity(cfg.complexity));
        //.pipe(jshint.reporter('fail'));
});

gulp.task('foodbankfarm-js-concat', concatJs(cfg.path.foodbankfarm.js, 'foodbankfarm.js'));
gulp.task('vendor-js-concat', concatJs(cfg.path.vendor.js, 'vendor.js'));
gulp.task('foodbankfarm-css-concat', concatCss(cfg.path.foodbankfarm.css, 'foodbankfarm.css'));
gulp.task('vendor-css-concat', concatCss(cfg.path.vendor.css, 'vendor.css'));

gulp.task('copy', function () {
    // copy htmls, fonts, imgs & favicon to dist folder
    // it is expected views & directives have unique names, so they would not conflict in dist folder.
    gulp.src(cfg.path.foodbankfarm.views).pipe(rename({ dirname: '' })).pipe(gulp.dest(cfg.path.dist + '/views'));
    gulp.src(cfg.path.foodbankfarm.directives).pipe(rename({ dirname: '' })).pipe(gulp.dest(cfg.path.dist + '/directives'));
    gulp.src(cfg.path.vendor.fonts).pipe(gulp.dest(cfg.path.dist + '/fonts'));
    gulp.src(cfg.path.foodbankfarm.images).pipe(gulp.dest(cfg.path.dist + '/images'));
    gulp.src(cfg.path.foodbankfarm.favicon).pipe(gulp.dest(cfg.path.dist));
});

gulp.task('clean', function (cb) {
    del([
      cfg.path.dist + '/**/*',
      cfg.path.report.root + '/**/*'
    ], cb);
});

gulp.task('bundle', ['copy', 'foodbankfarm-js-concat', 'vendor-js-concat', 'foodbankfarm-css-concat', 'vendor-css-concat']);

// TODO: turn on this line after upgrading to gulp 4: sequential tasks should be available with v4.
//gulp.task('build', ['clean', 'hint', 'bundle']);

// HACK: should be removed when gulp upgraded to v4.
gulp.task('build', function(callback) {
    runSequence('clean',
                'hint',
                'bundle',
                callback);
});

gulp.task('watch', function () {
    var watchPath = [
        cfg.path.root + '/**/*.{js,css,html}',
        '!' + cfg.path.dist + '/**/*.*'
    ];
    gulp.watch(watchPath, ['build']);
});

gulp.task('default', ['build', 'watch']);