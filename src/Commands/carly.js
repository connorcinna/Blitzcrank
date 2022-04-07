const discord = require("discord.js");
const config = require("../config.json");
module.exports.run = async (bot, message, args) => {
    var adj_size = config.length;
    var num = Math.floor(Math.random() * adj_size);

    var adjective = config.adjective[num];
    return message.channel.send("Carly is " + adjective);
}
module.exports.name = "carly";
