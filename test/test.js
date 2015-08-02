'use strict'

var test = require('tape')
var fs = require('fs')
var path = require('path')
var broccoli = require('broccoli')
var webpackify = require('../')

test('broccoli-webpack', function(t) {
	t.plan(1)
	var builder = new broccoli.Builder(webpackify('test/tree', {
		entry: './one',
		output: {filename: 'bundle.js'}
	}))
	builder.build().then(function(results) {
		t.ok(fs.existsSync(path.join(results.directory, 'bundle.js')), 'bundling works')
		builder.cleanup()
	}).catch(t.end)
})
