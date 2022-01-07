const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "KAMU HARUS JOIN CHANNEL DULU NAK!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: There are no songs playing in this server")
        .setColor("RED")
    ).then(message => message.delete({timeout: 10000}));

  queue.connection.dispatcher.end();
  queue.queue = [];
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Stopped the music :white_check_mark: **")
      .setColor("BLUE")
  ).then(message => message.delete({timeout: 10000}));
};
