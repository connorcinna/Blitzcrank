const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var num_adjectives = Object.keys(words.adjective).length;
    var num = Math.floor(Math.random() * num_adjectives);
    var adjective = words.adjective[num];
    return message.channel.send("Ian is " + adjective);
}
module.exports.name = "ian";
