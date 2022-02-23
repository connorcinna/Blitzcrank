const discord = require("discord.js");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const canvas = require("canvas"); 
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
        else if (args[1] != null && args[1] == "supp") {
            url = "https://u.gg/lol/champions/" + args[0] + "/build?role=support";
        }
        else url = "https://u.gg/lol/champions/" + args[0] + "/build";

        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const runes_primary = [];
        const runes_secondary = [];
        const skill_path = [];
        const items = [];
        const item_canvas = canvas.createCanvas(300, 40);
        const context = item_canvas.getContext('2d');
        var skill_attachment;
        function skill_fill(skill_path) {
            let skills = $("div[class='skill-priority-path']");
            $(skills).find("div[class='champion-skill-with-label']").each((i, element) =>  {
                if (i>2) return false; 
                var skill = $(element).find('img').attr('src');
                console.log(skill);
                skill_path.push(skill);
            });
        }
        function draw_skill_path(skill_path, skill_attachment) {
            var img_0 = new Image()
            var img_1 = new Image()
            var img_2 = new Image()

            let skill_0 = canvas.loadImage(skill_path[0]);
            context.drawImage(skill_0, 0, 0, 36, item_canvas.height);
            let skill_1 = canvas.loadImage(skill_path[1]);
            context.drawImage(skill_1, 72, 0, 108, item_canvas.height);
            let skill_2 = canvas.loadImage(skill_path[2]);
            context.drawImage(skill_2, 108, 0, 140, item_canvas.height);
            skill_attachment = new MessageAttachment(item_canvas.toBuffer())
        }
        function runes_fill(runes_primary, runes_secondary) {
            let keystone = $("div[class='perk keystone perk-active']").find('img').attr('src');
            runes_primary.push(keystone);
            let primary_tree = $("div[class='rune-tree_v2 primary-tree']");
            $(primary_tree).find("div[class='perk perk-active']").each((i, element) => { 
                if (i > 2) return false; //returning false is how Cheerio wants the .each loop to terminate
                var perk = $(element).find('img').attr('src');
                runes_primary.push(perk);
            });

            let secondary_tree = $("div[class='secondary-tree']");
            $(secondary_tree).find("div[class='perk perk-active']").each((i, element) => { 
                if (i > 1) return false;
                var perk = $(element).find('img').attr('src');
                runes_secondary.push(perk);
            });
        }
        function items_fill(items) {
            let item_path = $("div[class='content-section content-section_no-padding recommended-build_items media-query media-query_DESKTOP_MEDIUM__DESKTOP_LARGE']");
            $(item_path).find("div[class='item-img']").each((i, element) => {
                let element_string = $(element).html();
                let result_start = element_string.indexOf('(')+1;
                let result_end = element_string.indexOf(')');
                let result = element_string.substring(result_start, result_end);
                console.log(result);
                items.push(result);
            });    
        }
        //var skill_path_string = skill_path.join(' => ');

        skill_fill(skill_path);
        draw_skill_path(skill_path, skill_attachment);
        runes_fill(runes_primary, runes_secondary);
        items_fill(items);
        console.log(items);

        message.channel.send({
            files: [
                skill_attachment,
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
        console.log(error);
    }
};
module.exports.name = "ugg";
