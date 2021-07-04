const discord = require("discord.js");
const fetch = require("node-fetch");
module.exports.run = async (bot, message, args) => {
        var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCDvi2YxuEsz5uxR1e1h6gq2iF9Ly_WPZU&cx=71446e05228ee4314&q=" + args + "&searchType=image&fileType=jpg&alt=json";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.error.code === 429) {
                    var curr = new Date();
                    var curr_arr = [];
                    curr_arr[0] = curr.getHours();
                    curr_arr[1] = curr.getMinutes();
                    curr_arr[2] = curr.getSeconds();
                    var time_tar = [];
                    time_tar[0] = 2;
                    time_tar[1] = 60;
                    time_tar[2] = 60;
                    var time_diff = time_tar.map(function(item,index) {
                        return item - curr_arr[index];
                    })
                    var time_string = time_diff[0] + ":" + time_diff[1] + ":" + time_diff[2];
                    message.channel.send("search quota reached for the day, new searches available in " + time_string);
                }
                console.log(data);
                if (data.searchInformation.totalResults != 0) {
                    try {
                        message.channel.send(data.items[1].link);
                    } catch (error) {
                        message.channel.send("shut the fuck up weeb");
                    } 
                }
                else  {
                    message.channel.send({files: ["./Commands/no search results lol.png"]});
                }
        });
}
module.exports.help = {
    name: "gsearch"
}