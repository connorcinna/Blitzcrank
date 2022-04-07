const discord = require("discord.js");
const words = require("../words.json");;
module.exports.run = async (bot, message, args) => {
    var num_adjectives = Object.keys(words.adjective).length;
    var num = Math.floor(Math.random() * num_adjectives);
    var adjective = words.adjective[num];
    return message.channel.send("Michael is " + adjective);
}
module.exports.name = "michael";
