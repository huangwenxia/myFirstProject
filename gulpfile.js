var gulp = require('gulp');
var $ = require('gulp-load-plugins')();//必须实例化
var open = require('open');

var app={
    srcPath:'src/',
    devPath:'build/',
    prdPath:'dist/'
};

gulp.task('lib',function () {//转移bower安装的js库文件到新的目录
   gulp.src('bower_components/**/*.js')
       .pipe(gulp.dest(app.devPath+'vendor'))
       .pipe(gulp.dest(app.prdPath+'vendor'))
       .pipe($.connect.reload());//只支持高级浏览器，比如IE8不支持
});

gulp.task('html',function () {
    gulp.src(app.srcPath+'**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});

gulp.task('json',function () {
    gulp.src(app.srcPath+'data/**/*.json')
        .pipe(gulp.dest(app.devPath+'data'))
        .pipe(gulp.dest(app.prdPath+'data'))
        .pipe($.connect.reload());
});

gulp.task('less',function () {
    gulp.src(app.srcPath+'style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(app.devPath+'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath+'css'))
        .pipe($.connect.reload());
});

gulp.task('js',function () {
    gulp.src(app.srcPath+'script/**/*.js')
        .pipe($.concat('index.js'))//合并成index.js一个文件
        .pipe(gulp.dest(app.devPath+'js'))
        .pipe($.uglify())//压缩js
        .pipe(gulp.dest(app.prdPath+'js'))
        .pipe($.connect.reload());
});

gulp.task('image',function () {
    gulp.src(app.srcPath+'image/**/*')
        .pipe(gulp.dest(app.devPath+'image'))
        .pipe($.imagemin())//压缩image
        .pipe(gulp.dest(app.prdPath+'image'))
});

gulp.task('clean',function () {
    gulp.src([app.devPath,app.prdPath])
        .pipe($.clean())//重新构建时候先删除之前的以免冲突
});

// gulp.task('build',['image','js','less','lib','html','json']);
gulp.task('build',['image','js','less','html','json']);//去掉lib任务


// //监听文件的变动自动构建
// gulp.watch('bower_components/**/*',['lib']);
// gulp.watch(app.srcPath+'**/*.html',['html']);
// gulp.watch(app.srcPath+'data/**/*.json',['json']);
// gulp.watch(app.srcPath+'style/**/*.less',['less']);
// gulp.watch(app.srcPath+'style/**/*.js',['js']);
// gulp.watch(app.srcPath+'image/**/*',['image']);

//开发完一段代码之后，看实际效果，我们首先是不是要build构建一下，然后再启动一个服务器到服务器里面去查看。这样的操作也可以自动化执行。
gulp.task('serve',['build'],function () {
    $.connect.server({
        root:[app.devPath],
        livereload:true,//只针对高级浏览器，ie不支持，这个属性自动刷新浏览器，每当写完之后不需要手动刷新，非常智能方便
        port:1234
    });
    open('http://localhost:1234');

    //监听文件的变动自动构建
    gulp.watch('bower_components/**/*',['lib']);
    gulp.watch(app.srcPath+'**/*.html',['html']);
    gulp.watch(app.srcPath+'data/**/*.json',['json']);
    gulp.watch(app.srcPath+'style/**/*.less',['less']);
    gulp.watch(app.srcPath+'style/**/*.js',['js']);
    gulp.watch(app.srcPath+'image/**/*',['image']);
});

gulp.task('default',['serve']);
