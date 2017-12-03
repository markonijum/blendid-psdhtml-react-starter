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
      }
    },
  
    browserSync: {
      server: {
        // should match `dest` in
        // path-config.json
        baseDir: 'public'
      }
    },
    
    stylesheets: {
      sass: {
        includePaths:[
          "./node_modules",
          "./node_modules/bootstrap-sass/assets/stylesheets",
          "./node_modules/bulma",
          "./node_modules/foundation-sites/scss"

        ]
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
    
    imgsForSprite: {
      folderName: 'imgSprite'
    },
  }