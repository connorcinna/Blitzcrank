import { Message } from "discord.js"
const cheerio = require("cheerio")
const request = require("request")


module.exports.run = async (message: Message, args: string[]) => {
//	let Error = function(): void {
//		console.log('Error running pf')
//	}
	var search_url = "https://2e.aonprd.com/Search.aspx?q=" + args
	request(search_url, (error: Error, response: any, html: any) => {
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