module.exports = {
    html        : false,
    fonts       : true,
    static      : false,
    svgSprite   : false,
    ghPages     : false,
  
    images      : true,
    stylesheets : true,
  
    javascripts: {
      entry: {
        // files paths are relative to
        // javascripts.dest in path-config.json
        app: ["./app.js"],
        vendor: ["./vendor.js"]
      },
      provide: {
        $: "jquery",
        jQuery: "jquery"
      },
      babel: {
        presets: [["es2015", { "modules": false }], 'stage-1', "react"]
      },
      loaders: [
        {
          test: /\.scss$/,
          loader: 'style!css!sass'
        },
        {
          test: /\.css$/,
          use: [
            'to-string-loader',
            'css-loader'
          ]
       }
      ]
    },
  
    browserSync: {
      server: {
        // should match `dest` in
        // path-config.json
        baseDir: 'public'
      }
    },

    html: {
      alternateTask: function(gulp, PATH_CONFIG, TASK_CONFIG) {
        const browserSync    = require('browser-sync')
        const gulpif         = require('gulp-if')
        const htmlmin        = require('gulp-htmlmin')
        const path           = require('path')

        const exclude = '!' + path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, '**/{' + TASK_CONFIG.html.excludeFolders.join(',') + '}/**')
        const paths = {
          src: [path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, '**/*.{' + TASK_CONFIG.html.extensions + '}'), exclude],
          dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest),
        }

        return function() {
          gulp.src(paths.src)
          .pipe(gulpif(global.production, htmlmin(TASK_CONFIG.html.htmlmin)))
          .pipe(gulp.dest(paths.dest))
          .pipe(browserSync.stream())    }
      }
    },
    production: {
      rev:true
    },

    additionalTasks: {
      initialize(gulp, PATH_CONFIG, TASK_CONFIG) {

        this.development.prebuild = (this.development.prebuild != undefined && this.development.prebuild.length > 0) ? this.development.prebuild : undefined;
        this.development.postbuild = (this.development.postbuild.length != undefined && this.development.postbuild.length > 0) ? this.development.postbuild : undefined;

        this.production.prebuild = (this.production.prebuild != undefined && this.production.prebuild.length > 0) ? this.production.prebuild : undefined;
        this.production.postbuild = (this.production.postbuild.length != undefined && this.production.postbuild.length > 0) ? this.production.postbuild : undefined;

        require('../gulpfile/tasks/modernizr');
        require('../gulpfile/tasks/watchScss');

      },
      development: {
        prebuild: ['modernizr'],
        postbuild: ['watchScss']
      },
      production: {
        prebuild: [],
        postbuild: []
      }
    },
    
    imgsForSprite: {
      folderName: 'imgSprite'
    },
  }