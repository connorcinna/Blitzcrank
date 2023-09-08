//const discord = require("discord.js");
//const fetch = require("node-fetch");
import {Message} from 'discord.js'
require('dotenv').config();
const apikey: string = process.env.TENOR_KEY ?? "";

module.exports.run = async (message: Message, args: string[]) => {
    var limit = 1;
    var search_term = args;
    var url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" + apikey + "&limit=" + limit;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            try {
                if (data.results.id != 0)    
                    message.channel.send(data.results[0].itemurl);
            } catch (error) {
                message.channel.send({files: ["./Commands/no search results lol.png"]});
            }
            console.log(data);
    });
}
module.exports.name = "gif"