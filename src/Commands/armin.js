const discord = require("discord.js");
const words = require("../words.json");

module.exports.run = async (bot, message, args) => {
    console.log('running armin');
    var adj_size = words.adjective.length;
    var num = Math.floor(Math.random() * adj_size);
    var adjective = words.adjective[num];
    return message.channel.send("Armin is " + adjective);
}

module.exports.name = "armin";