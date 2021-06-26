const discord = require("discord.js");


const fs = require('fs');
var file_count = 0;
var image_number = 0;
file_count = fs.readdirSync("./Commands/images/").length;

module.exports.run = async (bot, message, args) => {
    image_number = Math.floor (Math.random() * file_count) + 1; 
    console.log(image_number);
    return message.channel.send({ files: ["./Commands/images/1 (" + image_number + ").jpg"]});
}

module.exports.help = {
    name: "epic"
}