const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const schedule = require('node-schedule');
const util = require('util');
//const main_channel_id = config.main_channel_id;
const main_channel_id = process.env.main_channel_id;
var main_channel;
var log_file = fs.createWriteStream("src/output.log", {flags : 'w'});
var log_stdout = process.stdout;
console.log = function(err) {
    log_file.write(util.format(err) + '\n');
    log_stdout.write(util.format(err) + '\n');
}
client.commands = new Discord.Collection();

fs.readdir("src/Commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
        console.log("No commands found")
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./Commands/${f}`)
        console.log(`${f} loaded!`)
        client.commands.set(props.name, props);
    });
});

client.on("ready", async () => {
    console.log(`${client.user.username} is online!`)
    client.user.setActivity("amogus", {type: "PLAYING"});
    main_channel = client.channels.get(main_channel_id);
    const friday = schedule.scheduleJob("00 10 * * 5", err => {
        fridaybabyfuck();
        if (err) {
            console.log(err);
        }
    });

//    console.log(client.commands);
});

client.on("message", async message => {
    if(message.channel.type === "dm") {
        return;
    } 
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if (cmd.charAt(0) != process.env.prefix) {
        return;
    } 
    let args = messageArray.slice(1);
    console.log("args: " + args);
    let command_file = client.commands.get(cmd.slice(process.env.prefix.length));
    //console.log("command being run: " + command_file);
    if(command_file) command_file.run(client, message, args);
});
function fridaybabyfuck() {
    console.log('fridaybabyfuck reached');
    main_channel.send("its friday baby, fuck");
    main_channel.send("https://www.youtube.com/watch?v=WUyJ6N6FD9Q");
}

console.log(process.env.client_token);
client.login(process.env.client_token);
