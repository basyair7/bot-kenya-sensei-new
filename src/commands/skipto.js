const { MessageEmbed } = require("discord.js");
const model = require("../model");

exports.run = async (client, message, args) => {
  try {
    const channel = message.member.voice.channel;
    if (!channel){
      
      return message.channel.send(
        "KAMU HARUS JOIN CHANNEL DULU NAK!"
      ).then(message => message.delete({timeout: 10000}));
    }
    let queue = message.client.queue.get(message.guild.id);
    if (!queue){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: There are no songs playing in this server")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    if (!args[0]){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription("**You must specify the number to skip** :x:")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    if (isNaN(args[0])){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription("**Value must be a number** :x:")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    queue.playing = !false;

    if (queue.loop) {
      for (let i = 0; i < parseInt(args[0]) - (1 + 1); i++) {
        var delta = queue.queue.shift();
        queue.queue.push(delta);
      }
    } else {
      queue.queue = queue.queue.slice(parseInt(args[0]) - (1 + 1));
    }

    try {
      queue.connection.dispatcher.end();
    } catch (e) {
      console.log(e);
      model.addReport(`Bot-Error`, `skipto Error: ${e}`);
      message.client.queue.delete(message.guild.id);
      queue.vc.leave();
    }
    
    
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          "**Skipped the music to" +
            " `" +
            args[0] +
            "` " +
            ":white_check_mark:**"
        )
        .setColor("BLUE")
    ).then(message => message.delete({timeout: 10000}));
  } catch (e) {
    console.log(e);
    model.addReport(`Bot-Error`, `skipto Error: ${e}`);
  }
};
