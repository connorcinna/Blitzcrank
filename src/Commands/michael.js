const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var num_adjectives = Object.keys(process.env.adjective).length;
    var num = Math.floor(Math.random() * num_adjectives);
    var adjective = process.env.adjective[num];
    return message.channel.send("Michael is " + adjective);
}
module.exports.name = "michael";
