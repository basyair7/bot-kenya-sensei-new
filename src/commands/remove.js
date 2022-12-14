const { MessageEmbed } = require("discord.js");
const model = require("../model");

exports.run = async (client, message, args) => {
  try {
    const channel = message.member.voice.channel;
    if (!channel){
      
      return message.channel.send(
        "KAMU HARUS JOIN CHANNEL DULU NAK!"
      ).then(message => message.delete({timeout: 10000}));}
    if (!args[0]){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: No song number provided")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    if (isNaN(args[0])){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: **Args must be number [Example: -remove 2]**")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    let queue = message.client.queue.get(message.guild.id);
    if (args[0] == 1){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription(
            ":x: **Can't remove currently playing song, use command skip**"
          )
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    if (queue.queue.length == 1){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription(
            ":x: **Can't remove when only one song is playing, Use command stop**"
          )
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    if (args[0] > queue.queue.length){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: **The queue doesn't have that much songs**")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    if (!queue){
      
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: **There are no songs playing in this server**")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}

    var name = queue.queue[args[0] - 1].name;
    queue.queue.splice(args[0] - 1);
    
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          "**Removed" + " " + name + " " + "from queue :white_check_mark: **"
        )
        .setTimestamp()
        .setColor("BLUE")
    ).then(message => message.delete({timeout: 10000}));
  } catch (e) {
    console.log(e);
    model.addReport(`Bot-Error`, `remove Error: ${e}`);
  }
};
