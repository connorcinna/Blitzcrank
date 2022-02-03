const config = require("../config.json");
const nouns = config.noun;
const verbs = config.verb;
const adjectives = config.adjective;
function name_generator() {

    var num_adjectives = Object.keys(config.adjective).length;
    var num_nouns = Object.keys(config.noun).length;
    var num_verbs = Object.keys(config.verb).length;

    var random_adjective = Math.floor(Math.random() * num_adjectives);
    var random_noun = Math.floor(Math.random() * num_nouns);
    var random_verb = Math.floor(Math.random() * num_verbs);

    var n_noun = nouns[random_noun];
    var n_verb = verbs[random_verb];
    var n_adjective = adjectives[random_adjective];

    var num_eos;

    var random_num = Math.random();
    var eos_chars = trailing_numbers(num_eos);
    //format: noun + verb + "er" + numbers until end of 16 characters
    console.log(n_noun);
    console.log(n_verb);
    console.log(n_adjective);
    if (random_num < 0.50) {
        num_eos = remaining_chars(n_noun + n_verb);
        eos_chars = trailing_numbers(num_eos);
        return (n_noun + n_verb + "er" + eos_chars);
    
    }
    //format: adjective + noun + numbers until end of 16 characters
    else {
        num_eos = remaining_chars(n_adjective + n_noun);
        eos_chars = trailing_numbers(num_eos);
        return (n_adjective + n_noun + eos_chars);
    }
}


function remaining_chars(input) {
    if (input.length + 2 > 16) {
        return (0);
    }
    return (16 - input.length); 
}

function trailing_numbers(num_eos) {
    var eos_chars = "";
    for (let i = 0; i < num_eos; ++i) {
        var random_num = Math.floor(Math.random() * 10);
        eos_chars += random_num.toString();
    }    
    return eos_chars;
}
module.exports.run = async (bot, message, args) => {
    var ret = name_generator();
    message.channel.send(ret);
}

module.exports.name = "name";