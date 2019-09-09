const fs = require('fs');

module.exports = (file) => {
	
	return new Promise( (resolve, reject ) => {
		fs.readFile(file,'utf-8',(error, data) => {
			
			if (error) {
				return reject(error)
			}
			resolve({data, file})
		})
	});
}