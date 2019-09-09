const traverse = require('./lib/traverse');
const readFile = require('./lib/readFile');
const mdLinksExtractor = require('./lib/mdLinkExtractor');
const getStatusLink = require('./lib/processMD');

module.exports = async (path = './', { validate= null, stats= null}) => {
	// ...
	const collectionPathsMD = await traverse(path)
	const collectionPromiseFile = await collectionPathsMD.map(readFile);
	const collectionStringMD = await Promise.all(collectionPromiseFile)
	const links = collectionStringMD.reduce((memo,item) => {
		return [...memo, ...mdLinksExtractor(item.data,item.file)]
	},[])

	if (validate && stats) {
		const stats = await Promise.all(getStatusLink(links));
		
		const status = {
			total : stats.length,
			unique: stats.length,
			broken: 0
		}
		stats.forEach((item) => {
			if (item.status === 'Fail') {
				status.broken++
			}
		})
		
		return `Total: ${status.total}\nUnique: ${status.unique}\nBroken: ${status.broken}`;

	} else if (options.validate) {

		return Promise.all(getStatusLink(links));
		
	} else if (options.stats) {
		const status = {
			total : links.length,
			unique: links.length,
		}
		return `Total: ${status.total}\nUnique: ${status.unique}`;
		
	} else {
		return links;
	}
};
