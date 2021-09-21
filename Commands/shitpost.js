const discord = require("discord.js");
const config = require("../config.json");
const jimp = require("jimp");
const nouns = config.nouns;
const verbs = config.verbs;
const adjectives = config.adjectives;
function sentence_generator() {

    var num_adjectives = Object.keys(config.adjective).length;
    var num_nouns = Object.keys(config.noun).length;
    var num_verbs = Object.keys(config.verb).length;

    var random_adjective = Math.floor(Math.random() * num_adjectives);
    var random_noun_s = Math.floor(Math.random() * num_nouns);
    var random_noun_o = Math.floor(Math.random() * num_nouns);
    var random_verb = Math.floor(Math.random() * num_verbs);


    var noun_s = nouns[random_noun_s];
    var verb = verbs[random_verb];
    var adjective = adjectives[random_adjective];
    var noun_o = config.noun[random_noun_o];
    var random_num = Math.random();
    if (random_num < 0.25) {
        return (noun_s + ' ' + verb + ' the' + adjective + ' ' + noun_o);
    }
    else if (random_num < 0.50) {
        return ('why does '  + noun_s + ' ' + verb + ' ' + adjective + ' ' + noun_o + '?');
    }
    else if (random_num < 0.75) {
        return ('we ' + verb + ' ' + adjective + ' ' + noun_o);
    }
    else 
        return (noun_s + ' ' + verb + ' ' + adjective + ' ' + noun_o);
}

    }

}
module.exports.run = async (bot, message, args) => {
    var file_name = "";
    var image_caption = "";
    var loaded_image;

    jimp.read(file_name)
        .then(function (image) {
            loaded_image = image;
            return jimp.loadFont(jimp.FONT_SANS_16_BLACK);
        }) 
        .then(function (font) {
            loaded_image.print(font, 10, 10, image_caption)
                        .write(file_name);
        })
        .catch(function (err) {
            console.error(err);
        });
}
module.exports.help = {
    name: "shitpost"
}