module.exports.run = async (bot, message, args) => {
    let ceiling = 0
    if (args.length == 0) {
       ceiling = 10
    }
    ceiling = args[0] //should be a number
    let roll = Math.floor(Math.random() * ceiling) + 1
    console.log(roll)
    return message.channel.send(roll.toString())
}
module.exports.name = "roll";