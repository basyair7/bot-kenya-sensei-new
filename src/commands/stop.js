const { MessageEmbed } = require("discord.js");
const { addReport } = require("../model");

exports.run = async (client, message) => {
  try{
    const channel = message.member.voice.channel;
    if (!channel){
      message.delete({timeout: 1000});
      return message.channel.send(
        "KAMU HARUS JOIN CHANNEL DULU NAK!"
      ).then(message => message.delete({timeout: 10000}));
    }
    let queue = message.client.queue.get(message.guild.id);
    if (!queue){
      message.delete({timeout: 1000});
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: There are no songs playing in this server")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}

    queue.connection.dispatcher.end();
    queue.queue = [];
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Stopped the music :white_check_mark: **")
        .setColor("BLUE")
    ).then(message => message.delete({timeout: 10000}));
  } catch(e){
      console.log(e);
      addReport(`Bot-Error`, `stop.ts Error: ${e}`);
  }
};
