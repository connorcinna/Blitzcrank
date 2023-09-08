const words: string[] = require("../words.json");
import { Message } from "discord.js";
module.exports.run = async (message: Message) => { //may need to re-add args argument
    var adj_size = words.adjective.length;
    var num = Math.floor(Math.random() * adj_size);
    var adjective = words.adjective[num];
    return message.channel.send("Armin is " + adjective);
}

module.exports.name = "armin";