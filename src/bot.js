const {Client, Intents, Collection } = require("discord.js");
var config;
if (!(process.env.client_token)) {
    console.log('in development');
    config = require('./config.json');
}
else {console.log('in production')}
const prefix = process.env.prefix || config.prefix;
const token = process.env.client_token || config.client_token;  //prefer the production token if possible
const main_channel_id = process.env.main_channel_id || config.main_channel_id;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const schedule = require('node-schedule');
var main_channel;

client.commands = new Collection();
client.login(token);

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
client.on("ready", async () => { //gets triggered
    console.log(`${client.user.username} is online!`)
    client.user.setActivity("Jerma985", {type: "WATCHING"});
    main_channel = client.channels.cache.get(main_channel_id);
    const friday = schedule.scheduleJob("00 10 * * 5", err => {
        fridaybabyfuck();
        if (err) {
            console.log(err);
        }
    });

});

client.on("messageCreate", async message => { //doesn't get triggered
    if(message.channel.type === "dm") {
        return;
    } 
    let messageArray = message.content.split(" ");
    //if message sent in the channel is a twitter link
    if (messageArray[0].contains("https://twitter.com/")) { 
        vxtwitter(messageArray[0]);
    }
    let cmd = messageArray[0];
    if (cmd.charAt(0) != prefix) {
        return;
    } 
    let args = messageArray.slice(1);
    console.log("args: " + args);
    let command_file = client.commands.get(cmd.slice(prefix.length));
    if(command_file) command_file.run(client, message, args);
});
function fridaybabyfuck() {
    console.log('fridaybabyfuck reached');
    main_channel.send("its friday baby, fuck");
    main_channel.send("https://www.youtube.com/watch?v=WUyJ6N6FD9Q");
}
function vxtwitter(message) {
    console.log("twitter link posted");
//    if (link is a video) {
//        let messageArray = message.split("https://twitter.com/");
//    }
}
