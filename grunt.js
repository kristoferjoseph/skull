module.exports = function(grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '// <%= pkg.name %> <%= pkg.version %>\n// Build Date: <%= grunt.template.today("yyyy-mm-dd") %>\n\n// (c) 2012 Kristofer Joseph.\n// Skull may be freely distributed under the MIT license.\n// For all details and documentation:\n// http://www.skulljs.com'
        },
        concat: {
            dist: {
                src: ['<banner>', 'src/skull.js', 'src/observer/*.js', 'src/memento/*.js', 'src/command/*.js'],
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
        }
    });
};