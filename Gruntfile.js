/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
              '* GGP Netzwerkleiste v<%= pkg.version %> by @valkum and vandit\n' +
              '*/\n',
    clean: {
      dist: ['dist']
    },
    jshint: {
      files: ['gruntfile.js', 'js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
      },
    },
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['js/*.js', 'lib/**/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    recess: {
      dist: {
        options: {
          compress: true
        },
        files: {
          'dist/network.css' : ['less/style.less', 'lib/**/*.css'],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-recess');


// JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'dist']);

};