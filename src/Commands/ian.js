const discord = require("discord.js");
const words = require("../words.json");
module.exports.run = async (bot, message, args) => {
    var num_adjectives = words.adjective.length;
    var num = Math.floor(Math.random() * num_adjectives);
    var adjective = words.adjective[num];
    return message.channel.send("Ian is " + adjective);
}
module.exports.name = "ian";
