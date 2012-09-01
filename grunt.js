module.exports = function(grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '// <%= pkg.name %> <%= pkg.version %>\n// Build Date: <%= grunt.template.today("yyyy-mm-dd") %>\n\n// (c) 2012 Kristofer Joseph.\n// Skull may be freely distributed under the MIT license.\n// For all details and documentation:\n// http://www.skulljs.com'
        },
        concat: {
            dist: {
                src: ['<banner>', '<file_strip_banner:src/skull.js>', '<file_strip_banner:src/observer/eventmap.js>', '<file_strip_banner:src/memento/caretaker.js>', '<file_strip_banner:src/memento/originator.js>', '<file_strip_banner:src/memento/memento.js>', '<file_strip_banner:src/command/command.js>', '<file_strip_banner:src/command/commandmap.js>'],
                dest: 'bin/skull.js'
            }
        },
        min: {
            dist: {
                src: ['<banner>', 'bin/skull.js'],
                dest: 'bin/skull.min.js'
            }
        },
        qunit: {
            all: ['test/*.html']
        },
        lint: {
            all: ['src/**/*.js','test/**/*.js']
        },
        watch: {
            files: '<config:lint.all>',
            tasks: 'qunit'
        },
        docco: {
            app: {
                src: ['bin/skull.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-docco');
    grunt.registerTask('default', ['lint', 'qunit', 'concat', 'min', 'docco']);
};