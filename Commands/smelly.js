const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Armin is smelly");
}

module.exports.help = {
    name: "armin"
}
