#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
const mdLinks = require('./index');
const {_:path, ...options} = argv;

mdLinks(path[0], options)
	.then(result => {
		console.log(result);
		
	})
