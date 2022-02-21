const discord = require("discord.js");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
module.exports.run = async (bot, message, args) => {
    try { 
        var url;
        if (args[0] == null) {
            return message.channel.send("You have to provide a champion name");
        }
        if (args[0].toUpperCase() == "TAHM" && args[1] != null && args[1].toUpperCase() == "KENCH")  {
            args[0] = "tahmkench";
            args[1] = "";
            if (args[2] != null) {
                args[1] = args[2];
                args[2] = "";
            }
        }
        else if (args[0].toUpperCase() == "RENATA" && args[1] != null && args[1].toUpperCase() == "GLASC")  {
            args[0] = "renata";
            args[1] = "";
            if (args[2] != null) {
                args[1] = args[2];
                args[2] = "";
            }
        }
        if (args[1] != null && args[1] != "mid") {
            url = "https://u.gg/lol/champions/" + args[0] + "/build?role=" + args[1];
        }
        else if (args[1] != null && args[1] == "mid") {
            url = "https://u.gg/lol/champions/" + args[0] + "/build?role=middle";
        }
        else url = "https://u.gg/lol/champions/" + args[0] + "/build";
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const runes_primary = [];
        const runes_secondary = [];
        const skill_path = [];
        let skills = $("div[class='skill-priority-path']");
        $(skills).find("div[class='skill-label bottom-center']").each((i, element) =>  {
            var skill = $(element).text();
            skill_path.push(skill);
        });
        let keystone = $("div[class='perk keystone perk-active']").find('img').attr('src');
        runes_primary.push(keystone);
        const primary_tree = $("div[class='rune-tree_v2 primary-tree']");
        $(primary_tree).find("div[class='perk perk-active']").each((i, element) => { 
            if (i > 2) return false; //returning false is how Cheerio wants the .each loop to terminate
            var perk = $(element).find('img').attr('src');
            runes_primary.push(perk);
        });

        const secondary_tree = $("div[class='secondary-tree']");
        $(secondary_tree).find("div[class='perk perk-active']").each((i, element) => { 
            if (i > 1) return false;
            var perk = $(element).find('img').attr('src');
            runes_secondary.push(perk);
        });
        var skill_path_string = skill_path.join(' => ');
        message.channel.send(skill_path_string, {
            files: [
                runes_primary[0],
                runes_primary[1],
                runes_primary[2],
                runes_primary[3],
                runes_secondary[0],
                runes_secondary[1],
            ]
        });
    }
    catch (error) {
        throw error;
    }
};
module.exports.name = "ugg";
