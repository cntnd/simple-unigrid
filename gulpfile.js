var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minify      = require('gulp-minifier'),
    zip         = require('gulp-zip'),
    inject      = require('gulp-inject'),
    browserSync = require('browser-sync'),
    del         = require('del');

// BrowserSync Reload
function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('watch', function (done) {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        notify: false});

    gulp.watch("./src/**/*.scss", gulp.series('sass'));
    gulp.watch("./app/*.html", reload);
    done();
});

gulp.task('zip', function() {
    return gulp.src(['dist/**/*.css'])
        .pipe(zip('simple-unigrid.zip'))
        .pipe(gulp.dest('app/'));
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src('src/simple-unigrid.scss')
        .pipe(sass())
        .pipe(minify({
          minify: true,
          minifyCSS: true,
          getKeptComment: function (content, filePath) {
              var m = content.match(/\/\*![\s\S]*?\*\//img);
              return m && m.join('\n') + '\n' || '';
          }
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(gulp.dest("app/"))
        .pipe(browserSync.reload({stream:true}));

});

gulp.task('clean', function () {
    return del(['dist/**/*']);
});

gulp.task('default', gulp.series('sass','watch'));

gulp.task('dist', gulp.series('clean','sass','zip'));