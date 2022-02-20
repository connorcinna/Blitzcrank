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
        let keystone = $('div.perk.keystone.perk-active').html();
        let perk1 = $('div.perk.perk-active').html();
        console.log(keystone);
        console.log(perk1);
        const runes_primary = [];
        const runes_secondary = [];
    }
    catch (error) {
        throw error;
    }
};
module.exports.name = "ugg";
