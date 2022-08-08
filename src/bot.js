const {Client, Intents, Collection } = require("discord.js");
const {TwitterApi} = require('twitter-api-v2')

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
const twitter = process.env.twitter || config.twitter;
console.log(twitter);
const twitter_client = new TwitterApi({
    appKey: twitter.api_key,
    appSecret: twitter.api_key_secret,
    accessToken: twitter.access_token_key,
    accessSecret: twitter.access_token_secret,
});
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
    if (messageArray[0].includes("https://twitter.com/")) { 
        vxtwitter(messageArray[0], message);
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
    main_channel.send("its friday baby, fuck");
    main_channel.send("https://www.youtube.com/watch?v=WUyJ6N6FD9Q");
}
function vxtwitter(twitter_link, message) {
    let twitter_link_copy = twitter_link; //keep a copy of original link
    twitter_linkArray = twitter_link.split("/");
    twitter_link = twitter_linkArray[twitter_linkArray.length-1]; // just the last part of the url
    if (twitter_link.includes('?')) { //some links have '?' in them, idk why
        twitter_link = twitter_link.substring(0, twitter_link.indexOf('?'));
    }
    twitter_client.v2.singleTweet(twitter_link, {
        expansions: ['attachments.media_keys'],
        'media.fields': [
            'type'
        ],
    }).then((val) => {
        val = val.includes.media[0].type;
        if (val == 'video') {
            var vx_output = ['https://vx', twitter_link_copy.slice(8)].join('');
            message.channel.send("posted by " + message.author.username + '\n' + vx_output);
            message.delete();
        }
    }).catch((err) => {
        console.log(err);
    })
}
