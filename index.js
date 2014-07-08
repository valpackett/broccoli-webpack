'use strict';
var RSVP = require('rsvp');
var webpack = require('webpack');
var CachingWriter = require('broccoli-caching-writer');

function WebpackWriter(inputTree, options) {
	if (!(this instanceof WebpackWriter)) return new WebpackWriter(inputTree, options);
	this.inputTree = inputTree;
	this.options = options;
}
WebpackWriter.prototype = Object.create(CachingWriter.prototype);
WebpackWriter.prototype.constructor = WebpackWriter;
WebpackWriter.prototype.updateCache = function(srcDir, destDir) {
	this.options['context'] = srcDir;
	this.options['output'] = this.options['output'] || {};
	this.options['output']['path'] = destDir;
	var compiler = webpack(this.options);
	return new RSVP.Promise(function(resolve, reject) {
		compiler.run(function(err, stats) {
			var jsonStats = stats.toJson();
			if (jsonStats.errors.length > 0) console.log(jsonStats.errors);
			if (jsonStats.warnings.length > 0) console.log(jsonStats.warnings);
			if (err || jsonStats.errors.length > 0) {
				reject(err);
			} else {
				resolve(destDir);
			}
		});
	});
}

module.exports = WebpackWriter;
