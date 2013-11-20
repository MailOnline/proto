'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		mochaTest: {
			build: {
				options: {
		        	reporter: 'spec'
		        },
		        src: ['test/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('test', 'mochaTest');
	grunt.registerTask('default', ['test']);
};
