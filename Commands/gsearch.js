const discord = require("discord.js");
const fetch = require("node-fetch");
module.exports.run = async (bot, message, args) => {
    var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCDvi2YxuEsz5uxR1e1h6gq2iF9Ly_WPZU&cx=71446e05228ee4314&q=" + args + "&searchType=image&fileType=jpg&alt=json";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.searchInformation.totalResults == 0) {
                message.channel.send({files: ["./Commands/no search results lol.png"]});
            }
            else message.channel.send(message.channel.send(data.items[1].link));
        });
}
module.exports.help = {
    name: "gsearch"
}