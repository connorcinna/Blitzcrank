import { Message } from "discord.js";
const words = require("../words.json");
const nouns: string[] = words.noun;
const verbs: string[] = words.verb;
const adjectives: string[] = words.adjective;
function name_generator() {

    var num_adjectives: number = Object.keys(words.adjective).length;
    var num_nouns: number = Object.keys(words.noun).length;
    var num_verbs: number = Object.keys(words.verb).length;

    var random_adjective: number = Math.floor(Math.random() * num_adjectives);
    var random_noun: number = Math.floor(Math.random() * num_nouns);
    var random_verb: number = Math.floor(Math.random() * num_verbs);

    var n_noun: string = nouns[random_noun];
    var n_verb: string = verbs[random_verb];
    var n_adjective: string = adjectives[random_adjective];

    var num_eos: number = 0;

    var random_num: number = Math.random();
    var eos_chars = trailing_numbers(num_eos);
    //format: noun + verb + "er" + numbers until end of 16 characters
    console.log(n_noun);
    console.log(n_verb);
    console.log(n_adjective);
    if (random_num < 0.50) {
        num_eos = remaining_chars(n_noun + n_verb);
        eos_chars = trailing_numbers(num_eos);
        if (n_verb.charAt(n_verb.length-1) == 'e') {
            return (n_noun + n_verb + "r" + eos_chars).substring(0, 15);
        }
        else return (n_noun + n_verb + "er" + eos_chars).substring(0, 15);
    
    }
    //format: adjective + noun + numbers until end of 16 characters
    else {
        num_eos = remaining_chars(n_adjective + n_noun);
        eos_chars = trailing_numbers(num_eos);
        return (n_adjective + n_noun + eos_chars).substring(0, 15);
    }
}

//calculate number of characters left until 16
function remaining_chars(input: string) {
    if (input.length + 2 >= 16) {
        return (0);
    }
    return (16 - input.length); 
}

//returns a string of numbers as long as the remaining characters until 16
function trailing_numbers(num_eos: number) {
    var eos_chars: string = "";
    for (let i = 0; i < num_eos; ++i) {
        var random_num: number = Math.floor(Math.random() * 10);
        eos_chars += random_num.toString();
    }    
    return eos_chars;
}
module.exports.run = async (message: Message) => {
    var ret = name_generator();
    message.channel.send(ret);
}

module.exports.name = "name";
