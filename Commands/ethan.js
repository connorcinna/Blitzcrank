const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Ethan is gay");
}

module.exports.help = {
    name: "ethan"
}