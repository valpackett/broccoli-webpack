'use strict'

var RSVP = require('rsvp')
var path = require('path')
var webpack = require('webpack')
var CachingWriter = require('broccoli-caching-writer')

var WebpackWriter = CachingWriter.extend({
	enforceSingleInputTree: true,
	init: function(inputTrees, options) {
		this._super(inputTrees, {})
		this.options = options || {}
	},
	updateCache: function(srcDir, destDir) {
		this.options.context = path.resolve(srcDir)
		this.options.output = this.options.output || {}
		this.options.output.path = destDir
		var compiler = webpack(this.options)
		return new RSVP.Promise(function(resolve, reject) {
			compiler.run(function(err, stats) {
				var jsonStats = stats.toJson()
				if (jsonStats.errors.length > 0) jsonStats.errors.forEach(console.error)
				if (jsonStats.warnings.length > 0) jsonStats.warnings.forEach(console.warn)
				if (err || jsonStats.errors.length > 0) {
					reject(err)
				} else {
					resolve(destDir)
				}
			})
		})
	}
})

module.exports = function(t, o) { return new WebpackWriter(t, o) }
