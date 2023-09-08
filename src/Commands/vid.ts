const fetch = require("node-fetch");
require('dotenv').config();

const yt_key = process.env.YT_KEY;
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
