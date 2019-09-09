const marked = require('marked');

module.exports = (markdown,file) => {	
	const links = [];
  const renderer = new marked.Renderer();

	renderer.link = (href, title, text) => {		
		links.push({
			href,
			text,
			file,
		});
	};
  renderer.image = function(href, title, text) {
		href = href.replace(/ =\d*%?x\d*%?$/, '');
		links.push({
			href,
			text,
			file,
		});
  };

	marked(markdown, {renderer});
  return links;
};