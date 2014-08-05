# broccoli-webpack [![npm version](https://img.shields.io/npm/v/broccoli-webpack.svg?style=flat)](https://www.npmjs.org/package/broccoli-webpack) [![npm downloads](https://img.shields.io/npm/dm/broccoli-webpack.svg?style=flat)](https://www.npmjs.org/package/broccoli-webpack) [![WTFPL](https://img.shields.io/badge/license-WTFPL-brightgreen.svg?style=flat)](https://www.tldrlegal.com/l/wtfpl)

A [Broccoli] plugin for [webpack].

[Broccoli]: https://github.com/joliss/broccoli
[webpack]: https://github.com/webpack/webpack

## Installation

```bash
$ npm install --save-dev broccoli-webpack
```

## Usage

```js
var webpackify = require('broccoli-webpack');
var js_source = 'src';
var js_bundler = webpackify(inl, {
	entry: './main',
	output: {filename: 'app.js'},
	externals: [{'react': 'React', 'jquery': '$'}],
	devtool: 'source-map',
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	}
});
```

Basically, just pass a tree and a normal [webpack config].
`context` and `output.path` will be set automatically.
For everything else, you're on your own :-)

[webpack config]: http://webpack.github.io/docs/configuration.html

## License

Copyright © 2014 [myfreeweb](https://github.com/myfreeweb)
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
