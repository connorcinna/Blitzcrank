const fetch = require("node-fetch");
var config;
if (!(process.env.client_token)) {
    config = require('../config.json');
}
const yt_key = process.env.yt_key || config.yt_key; 
module.exports.run = async (bot, message, args) => {
    var url = "https://youtube.googleapis.com/youtube/v3/search?q="+args+"&safeSearch=safeSearchSettingUnspecified&videoEmbeddable=videoEmbeddableUnspecified&key="+yt_key;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var num = 0;
            while (!data.items[num].id.videoId) {
                num++;
            }
            message.channel.send("https://www.youtube.com/watch?v="+data.items[num].id.videoId);
        });
}
module.exports.name = "vid";
