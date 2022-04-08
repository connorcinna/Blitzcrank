const discord = require("discord.js");
const words = require("../words.json");
module.exports.run = async (bot, message, args) => {
    var adj_size = words.adjective.length;
    var num = Math.floor(Math.random() * adj_size);
    var adjective = words.adjective[num];
    return message.channel.send("Ethan is " + adjective);
}
module.exports.name = "ethan";
