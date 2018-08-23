module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var path = 'sgds-govtech';

    grunt.initConfig({
        clean: {
            build: {
                src: ['sgds-govtech/{css,fonts,js}', 'sgds-govtech/sass/**/*','!sgds-govtech/sass/sgds.scss']
            },
            zip:{
                src:['sgds-govtech.zip']
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
            css: {
                expand: true,
                cwd: 'assets/css',
                src: '**',
                dest: path + '/css'
            },
            js: {
                expand: true,
                cwd: 'assets/js',
                src: 'sgds.js',
                dest: path + '/js'
            },
            zip:{
                expand:true,
                cwd:'',
                src:'sgds-govtech.zip',
                dest: 'assets/downloads/'
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'sgds-govtech.zip'
                },
                expand: true,
                cwd: 'sgds-govtech',
                src: ['js/*', 'css/*'],
                dest: 'sgds'
            }
        }
    });
    grunt.registerTask('sgds', ['clean:build','cssmin','copy:sass', 'copy:fonts','copy:js','compress:main','copy:zip','clean:zip']);
    grunt.registerTask('sgds-clean', ['clean:build']);
};