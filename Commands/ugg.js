const discord = require("discord.js");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
module.exports.run = async (bot, message, args) => {
    try { 
        var url;
        if (args[1] != null) {
            url = "https://u.gg/lol/champions/" + args[0] + "/build?role=" + args[1];
        }
        else url = "https://u.gg/lol/champions/" + args[0] + "/build";
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const runes_primary = [];
        const runes_secondary = [];

        /*
        $(".perk keystone perk-active").each((_idx, el) => {
            runes_primary.push($(el).attr('src'));
            console.log("reached");
        });
        console.log(runes_primary);
        */
       var keystone = $("div",)
    }
    catch (error) {
        throw error;
    }
};
module.exports.help = {
    name: "ugg"
}