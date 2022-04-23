const axios = require("axios");
const cheerio = require("cheerio");
const canvas = require("canvas"); 
const webp = require("webp-converter")
require("canvas-webp")
webp.grant_permission();
if (process.env.client_token) {
    module.exports.run = async (bot, message, args) => {
        message.channel.send("disabled because u.gg changed their image formats");
    }
}
else {
module.exports.run = async (bot, message, args) => {
    try { 
        var url;
        if (!args[0]) {
            return message.channel.send("You have to provide a champion name");
        }
        if (args[0].toUpperCase() == "TAHM" && args[1] && args[1].toUpperCase() == "KENCH")  {
            args[0] = "tahmkench";
            args[1] = "";
            if (args[2]) {
                args[1] = args[2];
                args[2] = "";
            }
        }
        else if (args[0].toUpperCase() == "RENATA" && args[1] && args[1].toUpperCase() == "GLASC")  {
            args[0] = "renata";
            args[1] = "";
            if (args[2]) {
                args[1] = args[2];
                args[2] = "";
            }
        }
        else if (args[0].toUpperCase() == "AURELION" && args[1] && args[1].toUpperCase() == "SOL")  {
            args[0] = "aurelionsol";
            args[1] = "";
            if (args[2]) {
                args[1] = args[2];
                args[2] = "";
            }
        }
        else if (args[0].toUpperCase() == "AURELION" && !args[1]) {
            args[0] = "aurelionsol";
        }
        if (args[1] && args[1] != "mid") {
            url = "https://u.gg/lol/champions/" + args[0] + "/build?role=" + args[1];
        }
        else if (args[1]  && args[1] == "mid") {
            url = "https://u.gg/lol/champions/" + args[0] + "/build?role=middle";
        }
        else if (args[1]  && args[1] == "supp") {
            url = "https://u.gg/lol/champions/" + args[0] + "/build?role=support";
        }
        else url = "https://u.gg/lol/champions/" + args[0] + "/build";

        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const runes_primary = [];
        const runes_secondary = [];
        const skill_path = [];
        const shards = [];
        const items = [];

        async function skill_fill(skill_path) {
            let skills = $("div[class='skill-priority-path']");
            $(skills).find("div[class='champion-skill-with-label']").each((i, element) =>  {
                if (i>2) return false; 

                var skill = $(element).find('img').attr('src');
                skill_path.push(skill);
            });
//            skill_path = skill_path.filter(s => s.split(".").pop() === ".webp");
//            skill_path.forEach((skill, index) => {
//                skill_path[index] = webp.dwebp(skill+".webp", skill+".jpg", "-o", logging = "-v");
//            });
        }

        async function runes_fill(runes_primary, runes_secondary) {
            let keystone = $("div[class='perk keystone perk-active']").find('img').attr('src');
            runes_primary.push(keystone);
            let primary_tree = $("div[class='rune-tree_v2 primary-tree']");
            $(primary_tree).find("div[class='perk perk-active']").each((i, element) => { 
                if (i > 2) return false; 
                var perk = $(element).find('img').attr('src');
                runes_primary.push(perk);
            });
//            runes_primary = runes_primary.filter(s => s.split(".").pop() === ".webp");
//            runes_primary.forEach((rune, index) => {
//                console.log(rune)
//                runes_primary[index] = webp.dwebp(rune+".webp", rune+".jpg", "-o", logging = "-v");
//            });
            let secondary_tree = $("div[class='secondary-tree']");
            $(secondary_tree).find("div[class='perk perk-active']").each((i, element) => { 
                if (i > 1) return false;
                var perk = $(element).find('img').attr('src');
                runes_secondary.push(perk);
            });
//            runes_secondary = runes_secondary.filter(s => s.split(".").pop() === ".webp");
//            runes_secondary.forEach((rune, index) => {
//                console.log(rune);
//                runes_secondary[index] = webp.dwebp(rune+".webp", rune+".jpg", "-o", logging = "-v");
//            });

        }

        async function items_fill(items) {
            let item_path = $("div[class='content-section content-section_no-padding recommended-build_items media-query media-query_DESKTOP_MEDIUM__DESKTOP_LARGE']");
            $(item_path).find("div[class='item-img']").each((i, element) => {
                let element_string = $(element).html();
                let result_start = element_string.indexOf('(')+1;
                let result_end = element_string.indexOf(')');
                let result = element_string.substring(result_start, result_end);
                items.push(result);
            });    
//            items = items.filter(s => s.split(".").pop() === ".webp");
//            items.forEach((item, index) => {
//                console.log(item);
//                items[index] = webp.dwebp(item+".webp", item+".jpg", "-o", logging = "-v");
//            });
        }
        async function shards_fill(shards) {
            let shard_tree = $("div[class='rune-tree_v2 stat-shards-container_v2']");
            $(shard_tree).find("div[class='shard shard-active']").each((i, element) => {
                if (i > 2) return false;
                var shard = $(element).find('img').attr('src');
                shards.push(shard);
            });
//            shards = shards.filter(s => s.split(".").pop() === ".webp");
//            shards.forEach((shard, index) => {
//                console.log(shard);
//                shards[index] = webp.dwebp(shard+".webp", shard+".jpg", "-o", logging = "-v");
//                console.log(shards[index]);
//            });
        }
        async function draw_image() {
            const image_canvas = canvas.createCanvas(360, 550);
            const context = image_canvas.getContext('2d');
            //runes
            let keystone = await canvas.loadImage(runes_primary[0]);
            let p_rune0 = await canvas.loadImage(runes_primary[1]);
            let p_rune1 = await canvas.loadImage(runes_primary[2]);
            let p_rune2 = await canvas.loadImage(runes_primary[3]);
            let s_rune0 = await canvas.loadImage(runes_secondary[0]);
            let s_rune1 = await canvas.loadImage(runes_secondary[1]);
            context.drawImage(keystone, 0, 0, 64, 64);
            context.drawImage(p_rune0, 0, 96, 64, 64);
            context.drawImage(p_rune1, 0, 192, 64, 64);
            context.drawImage(p_rune2, 0, 288, 64, 64);
            context.drawImage(s_rune0, 128, 0, 64, 64);           
            context.drawImage(s_rune1, 128, 96, 64, 64);           

            //skill order
            let right_arrow = await canvas.loadImage('./resources/right.jpg');
            let skill_0 = await canvas.loadImage(skill_path[0]);
            let skill_1 = await canvas.loadImage(skill_path[1]);
            let skill_2 = await canvas.loadImage(skill_path[2]);
            context.drawImage(skill_0, 0, 448, 72, 72);
            context.drawImage(right_arrow, 72, 448, 72, 72);
            context.drawImage(skill_1, 144, 448, 72, 72);
            context.drawImage(right_arrow, 216 , 448, 72, 72);
            context.drawImage(skill_2, 288, 448, 72, 72);

            //stat shards
            let shard_0 = await canvas.loadImage(shards[0]);
            let shard_1 = await canvas.loadImage(shards[1]);
            let shard_2 = await canvas.loadImage(shards[2]);
            //shard 0
            if (shards[0].includes('Force')) {
                context.drawImage(shard_0, 94, 200, 32, 32);
            }
            else if (shards[0].includes('Speed')) {
                context.drawImage(shard_0, 144, 200, 32, 32);
            }
            else { 
                context.drawImage(shard_0, 194, 200, 32, 32);
            }
            //shard 1
            if (shards[1].includes('Force')) {
                context.drawImage(shard_1, 94, 248, 32, 32);
            }
            else if (shards[1].includes('Armor')) {
                context.drawImage(shard_1, 144, 248, 32, 32);
            }
            else { 
                context.drawImage(shard_1, 194, 248, 32, 32);
            }
            //shard 2
            if (shards[2].includes('Health')) {
                context.drawImage(shard_2, 94, 306, 32, 32);
            }
            else if (shards[2].includes('Armor')) {
                context.drawImage(shard_2, 144, 306, 32, 32);
            }
            else { 
                context.drawImage(shard_2, 194, 306, 32, 32);
            }

            return image_canvas.toBuffer();

        }


        (async () => await skill_fill(skill_path));
        (async () => await runes_fill(runes_primary, runes_secondary));
        (async () => await items_fill(items));
        (async () => await shards_fill(shards));
        const image_buffer = await draw_image();
        message.channel.send({
            files: [
                image_buffer
            ]
        });
    }
    catch (error) {
        console.log(error);
    }
};
}

module.exports.name = "ugg";
