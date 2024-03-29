const ms = require("pretty-ms");
const { MessageEmbed } = require("discord.js");
const model = require("../model");
const clock = require("../utils");

exports.run = async(client, message, args) => {
  try {
    const uptime = ms(client.uptime, {verbose:true})
    const embed = new MessageEmbed()
    .addField("Date", clock.DateTimeBot())
    .addField("Bot Uptime", uptime)
    .setColor("RANDOM")
    
    message.channel.send(embed).then(message => message.delete({timeout: 10000}));
  } catch (e) {
    console.log(e);
    model.addReport(`Bot-Error`, `uptime Error: ${e}`);
  }
}