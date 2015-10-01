//Gruntfile
module.exports = function ( grunt ) {

    //Initializing the configuration object
    grunt.initConfig( {

        // Task configuration
        concat: {
            js_vendors: {
                src: [
                    './bower_components/jquery/dist/jquery.min.js',
                    './bower_components/bootstrap/dist/js/bootstrap.min.js',
                    './bower_components/angular/angular.min.js',
                    './bower_components//angular-route/angular-route.min.js'
                ],
                dest: './js/vendors.js'
            },
            js_all: {
                src: [
                    './js/vendors.js',
                    './js/app/app.js',
                    './js/app/services.js',
                    './js/app/controllers.js'
                ],
                dest: './js/compiled.js'
            },
            css_all: {
                src: [
                    './bower_components/bootstrap/dist/css/bootstrap.min.css',
                    './bower_components/font-awesome/css/font-awesome.min.css',
                    './bower_components/angular-responsive-slider-directive/src/style/style.css',
                    './css/custom.css'
                ],
                dest: './css/compiled.css'
            }
        },
        uglify: {
            js_all: {
                files: {
                    './js/compiled.min.js': './js/compiled.js'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    './css/compiled.min.css': [
                        './bower_components/bootstrap/dist/css/bootstrap.min.css',
                        './bower_components/font-awesome/css/font-awesome.min.css',
                        './bower_components/angular-responsive-slider-directive/src/style/style.css',
                        './css/custom.css'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [ './bower_components/font-awesome/fonts/**' ],
                        dest: './fonts/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        watch: {
            js_css: {
                files: [
                    //watched files
                    './js/app/app.js',
                    './js/app/services.js',
                    './js/app/controllers.js',
                    './css/custom.css'
                ],
                tasks: [ 'concat', 'uglify', 'cssmin', 'copy' ]
            }
        }
    } );

    // // Plugin loading
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );

    // Default task.
    grunt.registerTask( 'default', [ 'watch' ] );

};