module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var path = 'sgds-govtech';

    grunt.initConfig({
        clean: {
            build: {
                src: [path + '/{css,fonts,js,sass}']
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '_site/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'sgds-govtech/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            sass: {
                expand: true,
                cwd: '_sass',
                src: ['**', '!custom.scss'],
                dest: path + '/sass'
            },
            fonts: {
                expand: true,
                cwd: 'assets/fonts',
                src: '**',
                dest: path + '/fonts'
            },
            js: {
                expand: true,
                cwd: 'assets/js',
                src: 'sgds.js',
                dest: path + '/js'
            }
        }
    });
    grunt.registerTask('sgds', ['clean:build','cssmin','copy:sass', 'copy:fonts','copy:js']);
    grunt.registerTask('sgds-clean', ['clean:build']);
};