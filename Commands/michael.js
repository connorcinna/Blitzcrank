const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Michael is gay");
}

module.exports.help = {
    name: "michael"
}