const fetch = require('node-fetch');

module.exports =  processMD = (arrayLinks) => {
  return arrayLinks.map(async (link) => {
      try {
				const response = await fetch(link.href);
				
				const status = {
					status:`${response.status} ${response.statusText}`
				}
				return Object.assign(link, status);		
				
      } catch (error) {				
				const status = {
					status:`Fail`
				}
				return Object.assign(link, status);
      }
  });
}