const { MessageEmbed } = require("discord.js");
const model = require("../model");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  try{
  
    if (!channel){
      return message.channel.send(
        "KAMU HARUS JOIN CHANNEL DULU NAK!"
      ).then(message => message.delete({timeout: 10000}));
    }

    let queue = message.client.queue.get(message.guild.id);

    if (!args[0]){
      
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Master Volume Controller",
            "https://img.icons8.com/color/2x/high-volume--v2.gif"
          )
          .setColor("BLUE")
          .setDescription("**Current volume is " + queue.volume + " **")
      ).then(message => message.delete({timeout: 10000}));}

    if (args[0] > 100){
      
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Master Volume Error",
            "https://img.icons8.com/color/2x/high-volume--v2.gif"
          )
          .setColor("RED")
          .setDescription("**Volume cannot exceed 100 :x: **")
      ).then(message => message.delete({timeout: 10000}));}

    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    queue.volume = args[0];
    
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Music Volume Controller",
          "https://img.icons8.com/color/2x/high-volume--v2.gif"
        )
        .setColor("BLUE")
        .setDescription("**Volume set to " + args[0] + " :white_check_mark: **")
    ).then(message => message.delete({timeout: 10000}));
  } catch(e) {
       console.log(e);
       model.addReport(`Bot-Error`, `volume Error: ${e}`);
  }
};
