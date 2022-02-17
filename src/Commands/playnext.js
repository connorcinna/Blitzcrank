const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    return message.channel.send("http://store.steampowered.com/explore/random/");
}
module.exports.help = {
    name: "playnext"
}