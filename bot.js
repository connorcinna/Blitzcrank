const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const schedule = require('node-schedule');
const { channel } = require("diagnostics_channel");
const util = require('util');
const main_channel = bot.channels.cache.get('98955796129288192');

var log_file = fs.createWriteStream("./error.txt", {flags : 'w'});
var log_stdout = process.stdout;
console.log = function(err) {
    log_file.write(util.format(err) + '\n');
    log_stdout.write(util.format(err) + '\n');
}

bot.commands = new Discord.Collection();

fs.readdir("./Commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
        console.log("No commands found")
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`)
        bot.commands.set(props.help.name, props);
    });


});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("amogus", {type: "PLAYING"});

});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if (cmd.charAt(0) != config.prefix) return;
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(config.prefix.length));
    if(commandfile) commandfile.run(bot, message, args);
});

const friday = schedule.scheduleJob("00 11 * * 5", fridaybabyfuck);

function fridaybabyfuck() {
    console.log('fridaybabyfuck reached');
    main_channel.send("its friday baby, fuck");
    main_channel.send("https://www.youtube.com/watch?v=WUyJ6N6FD9Q");
}
bot.login(config.token);