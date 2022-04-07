const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var adj_size = process.env.length;
    var num = Math.floor(Math.random() * adj_size);
    var adjective = process.env.adjective[num];
    return message.channel.send("Ethan is " + adjective);
}
module.exports.name = "ethan";
