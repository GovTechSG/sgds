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
        strip_code: {
            options: {
                blocks: [
                    {
                        start_block: "<!-- Begin Jekyll SEO tag v2.5.0 -->",
                        end_block: "<!-- End Jekyll SEO tag -->"
                    }
                ]
            },
            your_target: {
                src: '_site/templates/quickstart/index.html'
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: true,
                    preventAttributesEscaping: true

                },
                files: {                                   // Dictionary of files
                    '_site/templates/quickstart/index.html': '_site/templates/quickstart/index.html'
                }
            }
        },
        copy: {

            css: {
                expand: true,
                cwd: '_site/assets/css',
                src: 'sgds.css',
                dest: path + '/css'
            },
            js: {
                expand: true,
                cwd: path + '/js',
                src: ['sgds.js','sgds-sidenav.js'],
                dest: 'assets/js'
            },
            zip:{
                expand: true,
                cwd: '',
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
                src: ['js/*', 'css/*', 'fonts/*'],
                dest: 'sgds'
            }
        }
    });

    // grunt.registerTask('sgds', ['clean:build','cssmin','copy:sass', 'copy:fonts','copy:js','compress:main','copy:zip','clean:zip']);
    // grunt.registerTask('sgds-clean', ['clean:build']);
    grunt.registerTask('sgds', ['cssmin','compress','copy:zip','clean:zip']);

};
