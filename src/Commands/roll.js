module.exports.run = async (bot, message, args) => {
    let ceiling = args[0] //should be a number
    let roll = Math.floor(Math.random() * ceiling) + 1
    console.log(roll)
    return message.channel.send(roll.toString())
}
module.exports.name = "roll";