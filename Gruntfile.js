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
            css: {
                expand: true,
                cwd: '_site/assets/css',
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
                cwd: '',
                src:'sgds-govtech.zip',
                dest: 'assets/downloads/'
            }
        },
        zip: {
            'copy-to-downloads': {
                cwd: path + "/",
                src: [path + '/**/*'],
                dest: 'assets/downloads/sgds-govtech.zip'
            }
        }
    });
    // grunt.registerTask('sgds', ['clean:build','cssmin','copy:sass', 'copy:fonts','copy:js','compress:main','copy:zip','clean:zip']);
    // grunt.registerTask('sgds-clean', ['clean:build']);
    grunt.registerTask('copy-download', ['copy:css','zip']);
};