const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
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

bot.login(config.token);