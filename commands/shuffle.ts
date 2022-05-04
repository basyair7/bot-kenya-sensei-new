const { MessageEmbed } = require("discord.js");
const {addReport} = require("../model/dbReport");

exports.run = async (client, message, args) => {
  try {
    const channel = message.member.voice.channel;
    if (!channel){
      
      return message.channel.send(
        "KAMU HARUS JOIN CHANNEL DULU NAK!"
      ).then(message => message.delete({timeout: 10000}));
    }
    const queue = message.client.queue.get(message.guild.id);
    if (!queue){
      
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Master Shuffle Controller Error",
            "https://img.icons8.com/color/2x/activity.gif"
          )
          .setDescription("** :x: There are no songs in queue to shuffle**")
          .setColor("RED")
      ).then(message => message.delete({timeout: 10000}));}
    let songs = queue.queue;
      for (let i = songs.length - 1; i > 1; i--) {
        let j = 1 + Math.floor(Math.random() * i);
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.queue = songs;
    message.client.queue.set(message.guild.id, queue);
    
    message.channel
      .send(
        new MessageEmbed()
          .setAuthor(
            "Master Shuffle Controller",
            "https://img.icons8.com/color/2x/activity.gif"
          )
          .setDescription("** :white_check_mark: Shuffled the queue**")
          .setColor("BLUE")
      ).then(message => message.delete({timeout: 10000}))
      .catch(console.error);
  } catch (e) {
    console.log(e);
    addReport(`Bot-Error`, `shuffle.ts Error: ${e}`);
  }
};
