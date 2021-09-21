const discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    var apikey = "1HUD01D3IKPT";
    var limit = 1;
    var search_term = args;
    var url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" + apikey + "&limit=" + limit;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.id != 0) {
                try {
                    message.channel.send(data.results[0].itemurl);
                } catch (error) {
                    message.channel.send({files: ["./Commands/no search results lol.png"]});
                }
            }
            console.log(data);
    });
}
module.exports.help = {
    name: "gif"
}