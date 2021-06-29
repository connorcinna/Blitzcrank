const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    return message.channel.send("list of commands:\n!epic: posts a random meme from an archive!ytsearch: searches youtube for [args]\n!gsearch: searches google for [arg] and returns the first image associated with it\n!playnext: returns a random game from steam that you should buy\n!name: sends a message with the users name and a random adjective to describe them. currently works on armin, brendon, carly, connor, ethan, and michael.");
}
module.exports.help = {
    name: "help"
}