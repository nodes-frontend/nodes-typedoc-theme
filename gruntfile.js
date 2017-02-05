module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            themeDefault: {
                options: {
                    mangle: false
                },
                files: {
                    'bin/default/assets/js/main.js': [
                        // 'src/default/assets/js/lib/jquery-2.1.1.min.js',
                        // 'src/default/assets/js/lib/underscore-1.6.0.min.js',
                        // 'src/default/assets/js/lib/backbone-1.1.2.min.js',
                        // 'src/default/assets/js/lib/lunr.min.js',
                        'src/default/assets/js/main.js'
                    ]
                }
            }
        },
        sass: {
            options: {
                style: 'compact',
                unixNewlines: true
            },
            themeDefault: {
                files: [{
                    expand: true,
                    cwd: 'src/default/assets/css',
                    src: '**/*.scss',
                    dest: 'bin/default/assets/css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                cascade: false
            },
            themeDefault: {
                expand: true,
                src: 'bin/**/*.css',
                dest: './'
            }
        },
        copy: {
            plugin: {
              files: [{
                expand: true,
                cwd: 'src',
                src: ['*.js'],
                dest: 'bin'
              }]
            },
            themeDefault: {
                files: [{
                    expand: true,
                    cwd: 'src/default',
                    src: ['**/*.hbs', '**/*.png'],
                    dest: 'bin/default'
                }]
            }
        },
        watch: {
            js: {
                files: ['src/default/assets/js/src/**/*.ts'],
                tasks: ['js']
            },
            css: {
                files: ['src/default/assets/css/**/*'],
                tasks: ['css']
            },
            default: {
                files: ['src/default/**/*.hbs'],
                tasks: ['copy']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('css', ['sass', 'autoprefixer']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('default', ['copy', 'css', 'js']);
};
