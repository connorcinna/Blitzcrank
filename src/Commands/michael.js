const discord = require("discord.js");
const config = require("../config.json");
module.exports.run = async (bot, message, args) => {
    var num_adjectives = Object.keys(config.adjective).length;
    var num = Math.floor(Math.random() * num_adjectives);
    var adjective = config.adjective[num];
    return message.channel.send("Michael is " + adjective);
}
module.exports.name = "michael";
