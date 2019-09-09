const fs = require('fs');
const path = require('path');


const promisify = (fn, ...args) => {	
	return new Promise((resolve, reject) =>
		fn.apply(null,
			args.concat((err, results) => err ? reject(err) : resolve(results))
			)
	);
}

const stat = file => {
	return promisify(fs.stat.bind(fs), file)
};

const readdir = dir => {
	return promisify(fs.readdir.bind(fs), dir)
};

const flatten = arr => (
	arr.reduce((memo, item) => {
		return Array.isArray(item)
			? [...memo, ...(flatten(item))]
			: [...memo, item]
	},[])
	.filter(item => {		
		return path.extname(item) == '.md'}
	)
	.map(item => path.resolve(item))
)
  

const traverse = (file) => {
	
	return stat(file).then(stats => {
		if (!stats.isDirectory()) {
			return [file]
		} else {
			return readdir(file)
			.then(children => {
				return Promise.all(children.map(child => { 
					return traverse(path.join(file, child))
				}))
			})
			.then(results => {
				return flatten(results)
			})
		}
	});
}


module.exports = traverse;