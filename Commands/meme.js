const discord = require("discord.js");




module.exports.run = async (bot, message, args) => {
    number = 325;
    imageNumber = Math.floor (Math.random() * number) + 1;
    return message.channel.send({ files: ["./gaybot/Commands/images/1 (" + imageNumber + ").jpg"]});
}

module.exports.help = {
    name: "epic"
}