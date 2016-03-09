'use strict';

module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['public/javascripts/magazine/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.targetPath %>.js'
      }
    }
  });

  grunt.registerTask('build', [
    'concat'
  ]);
};
