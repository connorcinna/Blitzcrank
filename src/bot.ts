import {Intents, Collection, AnyChannel, TextChannel, DMChannel, Message} from 'discord.js'
import {BlitzClient as Client} from './client'
import util from 'util'
import TwitterApi from 'twitter-api-v2'
import fs from 'fs'
import schedule from 'node-schedule'
import { ChannelTypes } from 'discord.js/typings/enums'
import { ApplicationCommandModule } from './@types'

require('dotenv').config();
const token: string = process.env.CLIENT_TOKEN ?? "";
const prefix: string = process.env.PREFIX ?? "";
const main_channel_id: string = process.env.MAIN_CHANNEL_ID ?? "";



const client: Client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

//const main_channel = client.channels.cache.get(main_channel_id);
const main_channel: TextChannel = <unknown> client.channels.fetch(main_channel_id) as TextChannel;

client.commands = new Collection();
client.login(token);

fs.readdir("src/Commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile: string[] = files.filter(f => f.split(".").pop() === "js");
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
    console.log(`${client.user!.username ?? "Blitzcrank"} is online!`)
    client.user!.setActivity("Jerma985", {type: "WATCHING"});
    //main_channel = client.channels.cache.get(main_channel_id);
    schedule.scheduleJob("00 10 * * 5", err => {
        fridaybabyfuck();
        if (err) {
            console.log(err);
        }
    });

});

client.on("messageCreate", async message => { 
    if(message.channel.type === "DM") {
        return;
    } 
    let message_array: string[] = message.content.split(" ");
    //if message sent in the channel is a twitter link
    if (message_array[0].includes("https://twitter.com/")) { 
        vxtwitter(message_array[0], message);
    }
    let cmd: string = message_array[0];
    if (cmd.charAt(0) != prefix) {
        return;
    } 
    let args = message_array.slice(1);
    console.log("args: " + args);
    let command_file: ApplicationCommandModule = client.commands.get(cmd.slice(prefix.length))!;
    if(command_file) command_file.run(message, args);
});
function fridaybabyfuck() {
    main_channel.send("its friday baby, fuck");
    main_channel.send("https://www.youtube.com/watch?v=WUyJ6N6FD9Q");
}
async function vxtwitter(twitter_link: String, message: Message) {
    const twitter_client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN ?? "");

    let twitter_link_array = twitter_link.split('/');
    let tweet_id = twitter_link_array[twitter_link_array.length-1];
    let q_index = -1;
    if ((q_index = tweet_id.indexOf('?')) != -1) {
        tweet_id = tweet_id.substring(0, q_index);
    }
    await twitter_client.v2.singleTweet(tweet_id, {
        expansions: ['attachments.media_keys', 'referenced_tweets.id'],
        'media.fields': ['type'],
        //'tweet.fields' : ['id']
    }).then((val) => {
        console.log('val: ' + util.inspect(val, {showHidden: false, depth: null, colors: true}));
        let val_type: string;
        if (!val.includes || !val.includes.media) {
            console.log('invalid tweet');
            return;
        }
        val_type = val.includes.media[0].type;
        if (val_type == 'video') {
            var vx_output = ['https://vx', twitter_link.slice(8)].join('');
            message.channel.send("posted by " + message.author.username + '\n' + vx_output);
            message.delete();
        }
        }).catch((err) => {
            console.log(err);
        })
}