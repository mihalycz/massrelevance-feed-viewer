module.exports = function (grunt) {

    grunt.initConfig({
        wrap: {
            // обертка приложения в модуль
            app: {
                src: ['build/app.js'],
                dest: 'build/app-module.js',
                options: {
                    wrapper: ['var MassRevFeedViewerModule = (function () {\n', 'return MassRevFeedViewer;\n})();']
                }
            }
        },
        concat: {
            // конкатенация частей приложения
            app: {
                src: [
                    'src/models/feed.model.js',
                    'src/api-services/feeds.api-service.js',
                    'src/api-services/feeds.handler.js',
                    'src/data-services/feeds.data-service.js',
                    'src/ui-components/feeds.ui-component.js',
                    'src/main.js'
                ],
                dest: 'build/app.js'
            },
            // конкатенация третьестроннних библиотек с приложением
            app_and_libs: {
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/es6-promise/dist/es6-promise.js',
                    'build/app-es5.js'
                ],
                dest: 'dist/mr-feed-viewer.js'
            }
        },
        // компиляция в es5-код
        "babel": {
            dist: {
                files: {
                    'build/app-es5.js': "build/app-module.js"
                }
            }
        },
        // минифицирование кода
        uglify: {
            app: {
                files: {
                    'dist/mr-feed-viewer.min.js': ['dist/mr-feed-viewer.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks('grunt-wrap');

    grunt.registerTask('default', ['concat:app', 'wrap:app', 'babel', 'concat:app_and_libs', 'uglify']);
};