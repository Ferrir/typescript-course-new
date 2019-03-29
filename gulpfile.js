var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', () => {
   return tsProject
      .src()
      .pipe(tsProject())
      .js.pipe(gulp.dest('dist'))
});

gulp.task('clean', () => {
   return gulp
       .src('dist')
       .pipe(clean());
});

gulp.task('copy-opts', () => {
   return gulp
      .src('tests/unit/config/mocha.opts')
      .pipe(gulp.dest('dist/tests/integration/config'))
      .pipe(gulp.dest('dist/tests/unit/config'));
});

gulp.task('copy-migration-cfg', () => {
   return gulp
      .src('server/config/config.json')
      .pipe(gulp.dest('dist/server/config'));
});

gulp.task('build', () => {
   return gulp
      .src('server/migrations/*')
      .pipe(gulp.dest('dist/server/migrations'));
});


gulp.task('default', gulp.series('clean', 'compile', 'copy-opts', 'copy-migration-cfg', 'build'));