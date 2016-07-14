// Grab packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    cleanCSS = require('gulp-clean-css');

// Create build css task
gulp.task('build-css', function() {

    gutil.log('Generate css files ...');
    
    var onError = function(err) {
        notify.onError({
            title:    'Gulp',
            subtitle: 'Failure!',
            message:  'Error: <%= error.message %>',
            sound:    'Beep'
        })(err);
        this.emit('end');
    };

    gulp.src('Resources/Private/Assets/Styles/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest('Resources/Public/Styles'))
        .pipe(rename('main.min.css'))
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('Resources/Public/Styles'))
        .pipe(notify({
            'title': 'Gulp',
            'message': 'CSS files were generated'
        }));

});

// Create build js task
gulp.task('build-js', function() {

    gutil.log('Generate js files ...');
    
    var onError = function(err) {
        notify.onError({
            title:    'Gulp',
            subtitle: 'Failure!',
            message:  'Error: <%= error.message %>',
            sound:    'Beep'
        })(err);
        this.emit('end');
    };
    
    // Website js files
    gulp.src([
            'Resources/Private/Assets/JavaScript/**',
            '!' + 'Resources/Private/Assets/JavaScript/backend.js'
        ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('Resources/Public/JavaScript'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('Resources/Public/JavaScript'));

    // Backend js files
    gulp.src([
            'Resources/Private/Assets/JavaScript/backend.js'
        ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('backend.js'))
        .pipe(gulp.dest('Resources/Public/JavaScript'))
        .pipe(rename('backend.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('Resources/Public/JavaScript'));

});

// Create default task
gulp.task('default', function() {
    
    gulp.src('Resources/Private/Assets/Styles/**/*.scss', {read: false})
        .pipe(watch('Resources/Private/Assets/Styles/**/*.scss', function() {
            gulp.start('build-css');
        }));

    gulp.src('Resources/Private/Assets/JavaScript/**/*.js', {read: false})
        .pipe(watch('Resources/Private/Assets/JavaScript/**/*.js', function() {
            gulp.start('build-js');
        }))
        .pipe(notify({
            'title': 'Gulp',
            'message': 'JavaScript files were generated'
        }));

});