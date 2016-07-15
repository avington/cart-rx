const gulp = require('gulp');
const debug = require('gulp-debug');
const ts = require('gulp-typescript');
const inject = require('gulp-inject');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass');

gulp.task('scss', function() {
    gulp.src('./src/sass/main.scss')
        .pipe(debug())
        .pipe(scss())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('tsc', function () {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./src/app/'));

});

gulp.task('inject', function () {
    const jsSrc = [].concat(
        './src/app/**/*.module.js',
        './src/app/**/*.js'
    )

    const page = gulp.src('./src/index.html').pipe(debug());
    const js = gulp.src(jsSrc).pipe(debug());

    page
        .pipe(inject(js))
        .pipe(gulp.dest('./src/'));
});

gulp.task('ts-reload', ['tsc'], () => {
    browserSync.reload()
});


gulp.task('dev', ['tsc', 'inject'], () => {
    browserSync.init({
    server: {
        baseDir: './',
        index: 'src/index.html'
    }
});

gulp.watch('./src/app/**/*.ts', ['ts-reload']);

gulp.watch('./src/**/*.scss', ['scss']);

});

