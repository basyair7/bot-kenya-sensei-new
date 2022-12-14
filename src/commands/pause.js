const { MessageEmbed } = require("discord.js");
const model = require("../model");

exports.run = async (client, message) => {
  try {
    const channel = message.member.voice.channel;
    if (!channel) {

      return message.channel.send(
        "KAMU HARUS JOIN CHANNEL DULU NAK!"
      ).then(message => message.delete({ timeout: 10000 }));
    }
    let queue = message.client.queue.get(message.guild.id);
    if (!queue) {

      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: There are no songs playing in this server")
          .setColor("RED")
      ).then(message => message.delete({ timeout: 10000 }));
    }
    if (queue.playing == false) {

      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: The song is already paused")
          .setColor("RED")
      ).then(message => message.delete({ timeout: 10000 }));
    }
    queue.connection.dispatcher.pause();
    message.react("⏸");
    queue.playing = false;

    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Paused the music :white_check_mark: **")
        .setColor("BLUE")
    ).then(message => message.delete({ timeout: 10000 }));
  } catch (e) {
    console.log(e);
    model.addReport(`Bot-Error`, `pause Error: ${e}`);
  }
};
