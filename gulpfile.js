var gulp       = require('gulp');
var minify     = require('gulp-minify');
var browserify = require('browserify');
var tsify      = require('tsify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

gulp.task('ts-compile', () => {

    return browserify()
        .add('./src/main.ts')
        .plugin(tsify)
        .bundle()
        .on('error', function(error) {
            console.error(error);
        })
        .pipe(source('blueberry.js'))
        .pipe(buffer())
        // .pipe(minify({
        //     ext: {
        //         min: '.min.js'
        //     },
        //     mangle: false,
        //     compress: false
        // }))
        .pipe(gulp.dest('build/'))

});

gulp.task('default', ['ts-compile'], function () {
    gulp.watch('**/*.ts', ['ts-compile']);
});