module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configure tasks
    pkg: grunt.file.readJSON('bower.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %>.js v<%= pkg.version %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' */\n',

    jshint: {
      all: [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js'
      ]
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },

      dist: {
        src: ['src/**/*.js'],
        dest: '<%= pkg.name %>.js'
      }
    },

    ngAnnotate: {
      dist: {
        files: [{
          src: '<%= pkg.name %>.js',
          dest: '<%= pkg.name %>.min.js'
        }]
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },

      dist: {
        src: '<%= pkg.name %>.min.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },

    clean: {
      dist: [
        '<%= pkg.name %>.js',
        '<%= pkg.name %>.min.js'
      ]
    },

    watch: {
      dist: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commitFiles: ['-a'],
        pushTo: 'upstream master',
        push: true,
        createTag: true
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '0.0.0.0',
          keepalive: true
        }
      }
    }
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'concat',
    'ngAnnotate',
    'uglify'
  ]);

  grunt.registerTask('release', function(bumpLevel) {
    grunt.task.run([
      'bump-only:' + (bumpLevel || 'patch'),
      'build',
      'bump-commit'
    ]);
  });
};
