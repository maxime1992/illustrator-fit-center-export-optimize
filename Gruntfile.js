(function () {
	'use strict';

	module.exports = function (grunt) {
		require('time-grunt')(grunt);

		// project configuration
		grunt.initConfig({

			svgmin: {
				dist: {
					files: [{
						expand: true,
						cwd: 'dist/svg',
						src: '*.svg',
						dest: 'dist/sgv_min'
					}]
				}
			}

		});

		// load plugins
		require('load-grunt-tasks')(grunt);

		// default task(s).
		grunt.registerTask('default', ['svgmin']);
	};
})();
