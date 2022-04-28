const ms = require("pretty-ms")
const { MessageEmbed } = require("discord.js")
let DateTimeBot = require("../model/DateTimeBot.js");

exports.run = async(client, message, args) => {
  const uptime = ms(client.uptime, {verbose:true})
  const embed = new MessageEmbed()
  .addField("Date", DateTimeBot)
  .addField("Bot Uptime", uptime)
  .setColor("RANDOM")
  
  message.channel.send(embed).then(message => message.delete({timeout: 10000}));
}
