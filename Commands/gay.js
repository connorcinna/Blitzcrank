const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Armin is gay");
}

module.exports.help = {
    name: "armin"
}