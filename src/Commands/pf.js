const cheerio = require("cheerio")
const request = require("request")


module.exports.run = async (bot, message, args) => {

	var search_url = "https://2e.aonprd.com/Search.aspx?q=" + args
	request(search_url, (error, response, html) => {
		if(!error && response.statusCode == 200) {
			const $ = cheerio.load(html);
			// var first_element = $('.row gap-small align-center nowrap').find('a').each(function(index, element) {
			// 	console.log(index)
			// 	console.log($(element).text());
			// });
			var first_element = $('div[class="row gap-small align-center nowrap"]').attr('href')
			console.log(first_element)
		}
	});


}

module.exports.name = "pf"