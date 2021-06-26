const discord = require("discord.js");
const config = require("../config.json");
module.exports.run = async (bot, message, args) => {
    var num = Math.floor(Math.random() * 1346);
    var adjective = config.adjective[num];
    return message.channel.send("Armin is " + adjective);
}
module.exports.help = {
    name: "armin"
}
