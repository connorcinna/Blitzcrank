const words = require("../words.json");
import { Message } from "discord.js";
module.exports.run = async (message: Message) => {
    var adj_size = words.adjective.length;
    var num = Math.floor(Math.random() * adj_size);
    var adjective = words.adjective[num];
    return message.channel.send("Ian is " + adjective);
}
module.exports.name = "ian";