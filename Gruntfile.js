module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        clean: {
            build: {
                src: ['sgds-govtech/**']
            }
        },
        copy: {
            sass: {
                expand: true,
                cwd: '_sass',
                src: '**',
                dest: 'sgds-govtech/sass'
            },
            fonts: {
                expand: true,
                cwd: 'assets/fonts',
                src: '**',
                dest: 'sgds-govtech/fonts'
            },
            js: {
                expand: true,
                cwd: 'assets/js',
                src: 'sgds.js',
                dest: 'sgds-govtech/js'
            }
        }
    });
    grunt.registerTask('sgds', ['clean:build','copy:sass', 'copy:fonts','copy:js']);
    grunt.registerTask('sgds-clean', ['clean:build']);
};