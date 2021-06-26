const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    return message.channel.send("http://store.steampowered.com/explore/random/\nShibuya Scramble is NOT the game the link takes you to, it's just the first listing on steam");
}
module.exports.help = {
    name: "playnext"
}