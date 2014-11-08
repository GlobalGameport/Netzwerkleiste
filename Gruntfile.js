module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      dist: 'dist'
    },
    less: {
      dist: {
        files: {
          '<%= config.dist %>/leiste.css': ['less/style.less']
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.css': ['dist/<%= pkg.name %>-<%= pkg.version %>.css']
        }
      }
    },
    concat: {
      js: {
        src: ['dist/leiste.js', 'lib/coin-slider/coin-slider.js', 'lib/postscribe/dist/postscribe.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      css: {
        src: ['dist/leiste.css', 'lib/coin-slider/coin-slider-styles.css'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.css'
      }

    },
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    'string-replace': {
      version: {
        files: {
          'dist/leiste.js': ['src/leiste.js']
        },
        options: {
          replacements: [{
            pattern: /{{ VERSION }}/g,
            replacement: '<%= pkg.version %>'
          }]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('css', ['less', 'concat:css', 'cssmin']);
  grunt.registerTask('js', ['jshint', 'string-replace', 'concat:js', 'uglify']);

  // Default task(s).
  grunt.registerTask('default', ['css', 'js']);
};
