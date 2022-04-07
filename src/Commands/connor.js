const discord = require("discord.js");
const words = require("../words.json");;
module.exports.run = async (bot, message, args) => {
    var adj_size = process.env.length;
    var num = Math.floor(Math.random() * adj_size);

    var adjective = words.adjective[num];
    return message.channel.send("Connor is " + adjective);
}
module.exports.name = "connor";
