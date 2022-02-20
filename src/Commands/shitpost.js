const config = require("../config.json");
const jimp = require("jimp");
const fs = require("fs");
const nouns = config.noun;
const verbs = config.verb;
const adjectives = config.adjective;
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

module.exports.run = async (bot, message, args) => {

    var file_count = fs.readdirSync("./Commands/templates/").length;
    var image_number = Math.floor(Math.random() * file_count) + 1;
    var file_name = "./Commands/templates/1 (" + image_number + ").jpg";
    var file_name_copy = file_name;
    file_name_copy = file_name_copy.substr(0, file_name_copy.length-5) + ")-COPY.jpg";
    fs.copyFile(file_name, file_name_copy, function (error) {
        if (error) console.error(error);
    });
    var image_caption = sentence_generator();
    var loaded_image;

    await jimp.read(file_name_copy, (err) => {
            if (err) console.error(err);
        })
        .then(function (image) {
            loaded_image = image;
            return jimp.loadFont(jimp.FONT_SANS_16_BLACK);
        }) 
        .then(function (font) {
            loaded_image.print(font, 10, 10, image_caption)
                        .write(file_name_copy);
        })
        .catch(function (err) {
            console.error(err);
        });
    message.channel.send({files: file_name_copy});
    fs.unlink(file_name_copy, (err) => {
        if (err) console.error(err);
    });
}
module.exports.name = "shitpost";
